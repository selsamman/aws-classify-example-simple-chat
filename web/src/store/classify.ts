import {ClassifyClient} from "aws-classify-client";
import {awsURL, getSession, setSession} from "../localstorage";

export const classifyClient = new ClassifyClient(getSession, setSession, awsURL);


