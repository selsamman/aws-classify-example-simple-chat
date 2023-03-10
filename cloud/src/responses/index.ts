// The stock Lambda functions for HTTPS and WSS

export {responseHandler, webSocketConnect, webSocketDisconnect} from "aws-classify-server"

import {ChatServerResponse} from "./ChatServerResponse";


import {classifyServerless} from "aws-classify-server";
classifyServerless.registerResponse(ChatServerResponse);

