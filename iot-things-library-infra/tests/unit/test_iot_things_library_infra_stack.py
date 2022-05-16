import aws_cdk as core
import aws_cdk.assertions as assertions

from iot_things_library_infra.iot_things_library_infra_stack import IotThingsLibraryInfraStack

# example tests. To run these tests, uncomment this file along with the example
# resource in iot_things_library_infra/iot_things_library_infra_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = IotThingsLibraryInfraStack(app, "iot-things-library-infra")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
