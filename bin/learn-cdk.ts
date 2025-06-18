#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LearnCdkStack } from '../lib/learn-cdk-stack';

const app = new cdk.App();
new LearnCdkStack(app, 'LearnCdkStack');
