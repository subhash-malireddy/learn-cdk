import {
  CfnOutput,
  Duration,
  Fn,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { S3 } from "aws-cdk-lib/aws-ses-actions";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

interface LearnCdkStackProps extends StackProps {
  // optional props
  createdAfterStackId?: string;
}
export class LearnCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: LearnCdkStackProps) {
    super(scope, id, props);

    // const queue = new sqs.Queue(this, 'LearnCdkQueue', {
    //   visibilityTimeout: Duration.seconds(300)
    // });

    // const topic = new sns.Topic(this, 'LearnCdkTopic');

    // topic.addSubscription(new subs.SqsSubscription(queue));
    if (props?.createdAfterStackId) {
      console.log("Creating stack after stack id: ", props.createdAfterStackId);
    }
    const shortStackId = Fn.select(2, Fn.split("/", this.stackId));
    const stackSuffix = Fn.select(4, Fn.split("-", shortStackId));
    const photosBucket = new Bucket(this, "LearnCdkPhotosBucket", {
      lifecycleRules: [
        {
          expiration: Duration.days(7),
        },
      ],
      bucketName: `satti-photos-${stackSuffix}`,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "PhotosBucketName", {
      key: "name",
      value: photosBucket.bucketName,
    });

    new CfnOutput(this, "PhotosBucketDomainName", {
      key: "domainName",
      value: photosBucket.bucketDomainName,
    });

    if (props?.createdAfterStackId) {
      new CfnOutput(this, "CreatedAfterStack", {
        key: "createdAfterStack",
        value: props.createdAfterStackId,
      });
    }
  }
}
