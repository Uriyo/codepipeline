# My Chat App

Welcome to my chat application!

## Features

- Real-time messaging
- Name customization
- User-friendly interface

## Getting Started

To get started with this chat app, follow these steps:

1. Clone the repository.
2. Open the `index.html` file in a web browser.

## Deployment with AWS CodePipeline and Elastic Beanstalk

Follow these steps to deploy this chat app to AWS Elastic Beanstalk using AWS CodePipeline:

1. **Create an AWS Elastic Beanstalk Application:**

   - Go to the AWS Elastic Beanstalk console.
   - Click "Create New Application."
   - Choose the "Application name" and write a description (optional).
      ![Screenshot 2023-10-29 094436](https://github.com/Uriyo/codepipeline/assets/87664057/fe91fd38-3bcf-4079-b20e-f4e1a5cd6f1c)

   - Now create the environment for the application.
      ![2](https://github.com/Uriyo/codepipeline/assets/87664057/426e37a7-f1fd-459c-a1b7-33d9ee9b9529)
   - Select "web server environment" in the environment tier.
   - Provide the application name(node).
   
   - Choose the platform "Node.js".
      ![3](https://github.com/Uriyo/codepipeline/assets/87664057/be8d9a28-ccfb-4337-b56f-bb3a04c9836e)

   - Now in Configure service acess select "Use existing role".
     ![4](https://github.com/Uriyo/codepipeline/assets/87664057/c5a9a27a-f09e-411f-93b3-2905145b7863)
   - select "aws-beanstalk-role"
   - Create this role before in hand by attaching the following policies: 
      ![6](https://github.com/Uriyo/codepipeline/assets/87664057/f248918d-461f-44f2-94fd-ac1f80309f59)
   - myebspolicy looks like :
   ```json
      {
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": [
				"cloudformation:CancelUpdateStack",
				"cloudformation:CreateStack",
				"elasticloadbalancing:RegisterTargets",
				"cloudformation:GetTemplate",
				"cloudformation:DeleteStack",
				"s3:PutBucketPolicy",
				"elasticloadbalancing:DeRegisterTargets",
				"cloudformation:UpdateStack",
				"s3:ListBucket",
				"s3:GetBucketLocation",
				"s3:GetBucketPolicy"
			],
			"Resource": [
				"arn:aws:s3:::elasticbeanstalk-*",
				"arn:aws:elasticloadbalancing:*:*:targetgroup/awseb-*",
				"arn:aws:elasticloadbalancing:*:*:targetgroup/eb-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/awseb-e-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/eb-*",
				"arn:aws:sns:*:*:ElasticBeanstalkNotifications-Environment-*",
				"arn:aws:logs:*:*:log-group:/aws/elasticbeanstalk/*",
				"arn:aws:ec2:*:*:launch-template/*",
				"arn:aws:s3:::elasticbeanstalk-*/*",
				"arn:aws:autoscaling:*:*:autoScalingGroup:*:autoScalingGroupName/awseb-e-*",
				"arn:aws:autoscaling:*:*:autoScalingGroup:*:autoScalingGroupName/eb-*",
				"arn:aws:autoscaling:*:*:launchConfiguration:*:launchConfigurationName/awseb-e-*",
				"arn:aws:autoscaling:*:*:launchConfiguration:*:launchConfigurationName/eb-*",
				"arn:aws:cloudformation:*:*:stack/awseb-e-*",
				"arn:aws:cloudformation:*:*:stack/eb-*"
			]
		},
		{
			"Sid": "VisualEditor1",
			"Effect": "Allow",
			"Action": "ec2:TerminateInstances",
			"Resource": "arn:aws:ec2:*:*:instance/*",
			"Condition": {
				"StringLike": {
					"ec2:ResourceTag/aws:cloudformation:stack-id": [
						"arn:aws:cloudformation:*:*:stack/awseb-e-*",
						"arn:aws:cloudformation:*:*:stack/eb-*"
					]
				}
			}
		},
		{
			"Sid": "VisualEditor2",
			"Effect": "Allow",
			"Action": "ec2:RunInstances",
			"Resource": "*",
			"Condition": {
				"ArnLike": {
					"ec2:LaunchTemplate": "arn:aws:ec2:*:*:launch-template/*"
				}
			}
		},
		{
			"Sid": "VisualEditor3",
			"Effect": "Allow",
			"Action": "ecs:TagResource",
			"Resource": "*",
			"Condition": {
				"StringEquals": {
					"ecs:CreateAction": "RegisterTaskDefinition"
				}
			}
		},
		{
			"Sid": "VisualEditor4",
			"Effect": "Allow",
			"Action": "iam:PassRole",
			"Resource": "*",
			"Condition": {
				"StringLikeIfExists": {
					"iam:PassedToService": [
						"elasticbeanstalk.amazonaws.com",
						"ec2.amazonaws.com",
						"autoscaling.amazonaws.com",
						"elasticloadbalancing.amazonaws.com",
						"ecs.amazonaws.com",
						"cloudformation.amazonaws.com"
					]
				}
			}
		},
		{
			"Sid": "VisualEditor5",
			"Effect": "Allow",
			"Action": [
				"ec2:DisassociateAddress",
				"autoscaling:Describe*",
				"sns:ListSubscriptionsByTopic",
				"logs:DescribeLogGroups",
				"sns:GetTopicAttributes",
				"rds:DescribeDBEngineVersions",
				"ecs:Describe*",
				"cloudformation:Describe*",
				"elasticbeanstalk:*",
				"ec2:Describe*",
				"ecs:RegisterTaskDefinition",
				"rds:DescribeDBInstances",
				"elasticloadbalancing:Describe*",
				"ecs:DeRegisterTaskDefinition",
				"cloudformation:List*",
				"ec2:AssociateAddress",
				"ec2:allocateAddress",
				"ecs:List*",
				"ec2:releaseAddress"
			],
			"Resource": "*"
		},
		{
			"Sid": "VisualEditor6",
			"Effect": "Allow",
			"Action": [
				"cloudformation:CancelUpdateStack",
				"autoscaling:PutScheduledUpdateGroupAction",
				"s3:GetObjectAcl",
				"autoscaling:PutScalingPolicy",
				"s3:GetObjectVersionAcl",
				"autoscaling:UpdateAutoScalingGroup",
				"cloudformation:UpdateStack",
				"ec2:DeleteLaunchTemplateVersions",
				"s3:DeleteObject",
				"autoscaling:TerminateInstanceInAutoScalingGroup",
				"elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
				"elasticloadbalancing:RegisterInstancesWithLoadBalancer",
				"s3:PutObjectAcl",
				"autoscaling:PutNotificationConfiguration",
				"ec2:DeleteLaunchTemplate",
				"autoscaling:ResumeProcesses",
				"logs:DeleteLogGroup",
				"sns:CreateTopic",
				"autoscaling:SuspendProcesses",
				"logs:CreateLogGroup",
				"ec2:CreateLaunchTemplateVersion",
				"autoscaling:CreateLaunchConfiguration",
				"s3:PutObject",
				"s3:GetObject",
				"ec2:CreateLaunchTemplate",
				"autoscaling:AttachInstances",
				"autoscaling:DeleteLaunchConfiguration",
				"cloudformation:CreateStack",
				"autoscaling:CreateOrUpdateTags",
				"cloudformation:GetTemplate",
				"s3:PutObjectVersionAcl",
				"cloudformation:DeleteStack",
				"autoscaling:DeleteAutoScalingGroup",
				"logs:PutRetentionPolicy",
				"autoscaling:CreateAutoScalingGroup",
				"s3:GetObjectVersion",
				"autoscaling:DetachInstances",
				"autoscaling:DeleteScheduledAction"
			],
			"Resource": [
				"arn:aws:sns:*:*:ElasticBeanstalkNotifications-Environment-*",
				"arn:aws:s3:::elasticbeanstalk-*/*",
				"arn:aws:autoscaling:*:*:autoScalingGroup:*:autoScalingGroupName/awseb-e-*",
				"arn:aws:autoscaling:*:*:autoScalingGroup:*:autoScalingGroupName/eb-*",
				"arn:aws:autoscaling:*:*:launchConfiguration:*:launchConfigurationName/awseb-e-*",
				"arn:aws:autoscaling:*:*:launchConfiguration:*:launchConfigurationName/eb-*",
				"arn:aws:logs:*:*:log-group:/aws/elasticbeanstalk/*",
				"arn:aws:ec2:*:*:launch-template/*",
				"arn:aws:cloudformation:*:*:stack/awseb-e-*",
				"arn:aws:cloudformation:*:*:stack/eb-*",
				"arn:aws:elasticloadbalancing:*:*:targetgroup/awseb-*",
				"arn:aws:elasticloadbalancing:*:*:targetgroup/eb-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/awseb-e-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/eb-*"
			]
		},
		{
			"Sid": "VisualEditor7",
			"Effect": "Allow",
			"Action": [
				"elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
				"elasticloadbalancing:RegisterInstancesWithLoadBalancer"
			],
			"Resource": [
				"arn:aws:elasticloadbalancing:*:*:targetgroup/awseb-*",
				"arn:aws:elasticloadbalancing:*:*:targetgroup/eb-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/awseb-e-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/eb-*"
			]
		},
		{
			"Sid": "VisualEditor8",
			"Effect": "Allow",
			"Action": [
				"cloudformation:CancelUpdateStack",
				"cloudformation:CreateStack",
				"cloudformation:GetTemplate",
				"cloudformation:DeleteStack",
				"cloudformation:UpdateStack"
			],
			"Resource": [
				"arn:aws:sns:*:*:ElasticBeanstalkNotifications-Environment-*",
				"arn:aws:logs:*:*:log-group:/aws/elasticbeanstalk/*",
				"arn:aws:ec2:*:*:launch-template/*",
				"arn:aws:s3:::elasticbeanstalk-*/*",
				"arn:aws:cloudformation:*:*:stack/awseb-e-*",
				"arn:aws:cloudformation:*:*:stack/eb-*",
				"arn:aws:elasticloadbalancing:*:*:targetgroup/awseb-*",
				"arn:aws:elasticloadbalancing:*:*:targetgroup/eb-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/awseb-e-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/eb-*",
				"arn:aws:autoscaling:*:*:autoScalingGroup:*:autoScalingGroupName/awseb-e-*",
				"arn:aws:autoscaling:*:*:autoScalingGroup:*:autoScalingGroupName/eb-*",
				"arn:aws:autoscaling:*:*:launchConfiguration:*:launchConfigurationName/awseb-e-*",
				"arn:aws:autoscaling:*:*:launchConfiguration:*:launchConfigurationName/eb-*"
			]
		},
		{
			"Sid": "VisualEditor9",
			"Effect": "Allow",
			"Action": [
				"elasticloadbalancing:RegisterTargets",
				"elasticloadbalancing:DeRegisterTargets"
			],
			"Resource": [
				"arn:aws:elasticloadbalancing:*:*:targetgroup/awseb-*",
				"arn:aws:elasticloadbalancing:*:*:targetgroup/eb-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/awseb-e-*",
				"arn:aws:elasticloadbalancing:*:*:loadbalancer/eb-*"
			]
		},
		{
			"Sid": "VisualEditor10",
			"Effect": "Allow",
			"Action": [
				"cloudformation:CancelUpdateStack",
				"cloudformation:CreateStack",
				"cloudformation:GetTemplate",
				"cloudformation:DeleteStack",
				"cloudformation:UpdateStack"
			],
			"Resource": [
				"arn:aws:cloudformation:*:*:stack/awseb-e-*",
				"arn:aws:cloudformation:*:*:stack/eb-*"
			]
		}
	]
}
   
   


   - Attach Ec2 instance profile 
   - This role looks like
      ![5](https://github.com/Uriyo/codepipeline/assets/87664057/7a73ad98-3e81-4ea9-bb11-644dd847bff8)
   
   - Review the configurations and click submit.
      ![7](https://github.com/Uriyo/codepipeline/assets/87664057/e6432f7b-2362-414e-9e06-45fe0305a52c)
      ![8](https://github.com/Uriyo/codepipeline/assets/87664057/0f8e1313-b74f-45f3-ae65-8b1e0fa1895e)
   - Check the Health status of environment created (Ok).
      ![9](https://github.com/Uriyo/codepipeline/assets/87664057/27eb7004-ee2c-4281-a449-d765a97c6f2c)
   - Now open codepipeline and hit create pipeline
      ![10](https://github.com/Uriyo/codepipeline/assets/87664057/5acae227-2d0d-42d3-b6a1-0bdb5d5a0cbc)
   - Give name to pipeline "node".
   - Choose V2 pipeline type 
      ![11](https://github.com/Uriyo/codepipeline/assets/87664057/de7c8a74-107b-42e8-8703-203f2c4d068b)

   - CodePipeline V2: Offers more parallelism and concurrency, which can improve the speed of your CI/CD pipelines.
   - CodePipeline V1: Has limitations on parallel execution based on the number of stages.

   - Choose  Source provider (GitHub)
   - Connect the github to aws
   - Choose GitHub webhooks in detection options, This will automatically start pipeline when a change occurs.
      ![12](https://github.com/Uriyo/codepipeline/assets/87664057/a1ae13f6-a3d8-4ce3-a0cc-fb91005be401)

      ![13](https://github.com/Uriyo/codepipeline/assets/87664057/2a87a207-becd-45ea-bcac-ff1dd2823dd3)
   - Select the repository (Uriyp/codepipeline)
   - Select the branch (main)

   - Skip the build stage (optional)

   ![16](https://github.com/Uriyo/codepipeline/assets/87664057/39fb88e5-806a-438c-bdfe-1b6fc0594e31)
   - In add deploy stage choose deploy priovider "Elastic Beanstalk" and region "US west (N.California)"
   - Select the app name created earlier and environment.

   - Finally review every thing and hit create pipeline.
      ![18](https://github.com/Uriyo/codepipeline/assets/87664057/87ad8df8-0076-40dc-b406-9c78ed980ee3)

   - Check the pipeline status 
      ![19](https://github.com/Uriyo/codepipeline/assets/87664057/d236ff83-ad0a-428b-88a0-7393ca6996e9)

   - Open the domain provided by the beanstalk environment
      ![20](https://github.com/Uriyo/codepipeline/assets/87664057/7fa5ee71-ab90-4f5b-94c3-9d6cdf9cfa76)

      ![21](https://github.com/Uriyo/codepipeline/assets/87664057/86d5b05e-fd8d-4113-90db-5b3bfcc3ba26)


## Contributions

Contributions are welcome. Please! fork the repository and create a pull request with your changes.

