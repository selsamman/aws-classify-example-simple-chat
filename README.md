# Sample Chat Application for aws-classify

## aws-classify
aws-classify is a library for calling AWS lambda functions from a browser or 
react-native app where the lambda functions are implemented as Typescript class members.  You create a request and corresponding response class. When you call the request class member function aws-classify takes care of the magic of invoking the corresponding response class member as a Lambda function. 

The reverse is also true in that class members implemented in the browser can be called from within a Lambda server. The latter uses Web Sockets in the AWS gateway. aws-classify also provides for a static website from which everything can be executed to comply with same-origin policy.  

* Complex data with classes and cyclic structures can be passed and returned
* Exceptions are passed back to the caller of the request method
* back-end session data is simply a matter of defining fields in the response class
* Configuration and deployment via a simple serverless.yml file

These AWS resources are automatically configured and deployment is fully automated:
* AWS Lambda
* Web Sockets in the AWS Gateway
* Dynamo DB for managing sessions
* S3 for a static website
* Cloudfront with a custom domain name as a CDN

All of these resources are configured by the Serverless Framework and deployed by running a script.  You only need to login to AWS in order to create credentials for the Serverless Framework and to register your domain name and create an SSL certificate for it.  

## Sample Chat Application

The easiest way to learn about aws-classify is to start with a simple app 
stack for a chat app that demonstrate all of the key features of aws-classify. It lets you instantly send messages to another user you select from a list. The list is kept up-to-date by monitoring the sessions that aws-classify using DynamoDB streams and sending the updated list to any client that is connected.
To get started fort and pull this project. Here are the steps needed to deploy it to AWS.

* Run NPM install on each of the three sub-project folders

  * cloud which contains the AWS side of the project

  * web which contains a React Native (CRA) project

  * mobile which has an Expo project (not yet implemented)

* Create an AWS and access key and make them available to the Serverless 
Framework script. This [guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials) shows you how.
* From the cloud folder: npm run deploy:dev
From the web folder: npm start

At this point the app will come up on localhost:3000 and it will 
automatically proxy the requests to the AWS gateway.