from constructs import Construct
from aws_cdk import (
    Stack,
    aws_backup as backup,
    CfnOutput
)


class IotThingsLibraryBackupStack(Stack):

   def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        #first we create the vault
        myVault = backup.BackupVault(self, "iotThingsLibraryVault")

        # then the plan
        myPlan = backup.BackupPlan(self, "iotThingsLibraryBackupPlan",backup_vault=myVault)

        # we select the ressources in the plan with tags
        myPlan.add_selection("iotThingsLibrarySelection",
            resources=[
                backup.BackupResource.from_tag("backup:Project", "iotthingslibrary")  # All resources that are tagged backup:Project=iotthingslibrary in the region/account
            ]
        )

        #we add the rules
        myPlan.add_rule(backup.BackupPlanRule.daily())
        
        myPlan.add_rule(backup.BackupPlanRule.monthly1_year())
