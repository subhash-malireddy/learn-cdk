#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { LearnCdkStack } from "../lib/learn-cdk-stack";

const app = new cdk.App();
const stack1 = new LearnCdkStack(app, "LearnCdkStack");
new LearnCdkStack(app, "LearnCdkStack2", {
  createdAfterStackId: `${stack1.stackName}=>${stack1.stackId}`,
});
