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
stack for a chat app that demonstrate all of the key features of aws-classify. It lets you instantly send messages to another user you select from a list. Registering or reconnecting broadcasts the current session names to other connected clients.
To get started, fork and pull this project. Here are the steps needed to deploy it to AWS.

* Run `npm install` in `cloud` and `web`. Mobile is maintained separately.

  Clone `aws-classify` beside this repository; `cloud/serverless.yml` loads its shared YAML templates from that sibling checkout.

  * ***cloud*** - contains the back-end of the project deployed to AWS

  * ***web*** - contains a Vite and React project deployed to AWS CloudFront

  * ***mobile*** - contains an Expo project deployable to Play/App store or 
    Expo Go App

* Create an AWS and access key and make them available to the Serverless 
Framework script. This [guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials) shows you how.
* Sign in to Serverless Framework v4 and configure AWS credentials.
* From the cloud folder, run `npm run deploy:dev`. This builds the web client, deploys the AWS stack, uploads the website to S3, and invalidates CloudFront.
* To develop the web client against the deployed dev stack, run `npm start` from the web folder. Vite reads `cloud/output.json` to proxy `/api` requests.

## Local development

Install dependencies in both `cloud` and `web`, then run `npm run dev` from `cloud`. This starts Dynalite, creates the session table from the resolved aws-classify Serverless template, starts Serverless Offline with the HTTP and WebSocket gateways, and starts Vite at <http://127.0.0.1:3000>. It uses an in-memory local database, so the session table and sessions are recreated on each start. No AWS credentials or Java installation are needed for local requests; Serverless Framework v4 still requires its normal sign-in and configuration resolution.

Open the local site in a regular browser window and a private window to test two independent sessions. Restart `npm run dev` after backend code changes; Vite reloads frontend changes automatically.

For backend debugging, run `npm run dev:debug` and attach a Node debugger to port 9229. Serverless Offline runs the handlers in process. The app's TypeScript is transformed with source maps by the offline loader; source maps for published aws-classify code will be addressed when that package is updated.

To run the pieces separately, use `npm run offline` from `cloud` for Dynalite and Serverless Offline, and `npm run dev:offline` from `web` for Vite. `npm run offline:debug` enables the backend inspector. `npm run db:start` and `npm run db:init` expose the database setup as separate commands when needed.
