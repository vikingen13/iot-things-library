from constructs import Construct
from aws_cdk import (
    Duration,
    Stack,
    aws_iam as iam,
    aws_amplify_alpha as amplify,
    SecretValue,
    custom_resources,
    CfnOutput,
    CfnParameter
)


class IotThingsLibraryInfraStack(Stack):

   def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        myAmplifyApp = amplify.App(self, "iotThingsLibrary",
            source_code_provider= amplify.GitHubSourceCodeProvider(
            owner= 'vikingen13',
            repository= 'iot-things-library',
            oauth_token= SecretValue.secrets_manager("my-github-token")
            ),
            auto_branch_creation=amplify.AutoBranchCreation( # Automatically connect branches that match a pattern set
                patterns=["master","feature/*", "test/*"]),
            auto_branch_deletion=True
        )

        myAmplifyApp.grant_principal.add_managed_policy(iam.ManagedPolicy.from_aws_managed_policy_name('AdministratorAccess-Amplify'))

        myMaster = myAmplifyApp.add_branch("master",stage="PRODUCTION") # `id` will be used as repo branch name
        
        #
        # Triggering Amplify build and deployment right after app creation
        #
        # https://docs.aws.amazon.com/cdk/api/v2/python/aws_cdk.custom_resources/AwsCustomResource.html
        myBuildTrigger = custom_resources.AwsCustomResource(self, 'Amplify_Build_Trigger',
            policy=custom_resources.AwsCustomResourcePolicy.from_sdk_calls(
                resources=custom_resources.AwsCustomResourcePolicy.ANY_RESOURCE
            ),
            on_create=custom_resources.AwsSdkCall(
                service='Amplify',
                action='startJob',
                physical_resource_id=custom_resources.PhysicalResourceId.of('app-build-trigger'),
                parameters={
                    "appId": myAmplifyApp.app_id,
                    "branchName": myMaster.branch_name,
                    "jobType": 'RELEASE',
                    "jobReason":'Auto Start build',
                }
            )
        )

        #last we write the output
        CfnOutput(self, "AppDomain", value=myAmplifyApp.default_domain)
