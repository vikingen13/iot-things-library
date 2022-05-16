from constructs import Construct
from aws_cdk import (
    Duration,
    Stack,
    aws_iam as iam,
    aws_amplify_alpha as amplify,
    SecretValue,
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
                patterns=["master/*","feature/*", "test/*"]),
            auto_branch_deletion=True
        )

        myMaster = myAmplifyApp.add_branch("master") # `id` will be used as repo branch name
