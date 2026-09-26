# Web chat client

This is the Vite and React client for the `aws-classify` chat example.

Run `npm install` and `npm start` to serve it at <http://localhost:3000>. The Vite server forwards `/api` requests to the CloudFront URL in `../cloud/output.json`, which is created by `npm run deploy:dev` in `../cloud`. Set `AWSPROXY` to an alternate HTTPS endpoint if needed.

For the local backend, run `npm run offline` from `../cloud`, then `npm run dev:offline` here. This mode forwards `/api` to Serverless Offline on port 4000. Alternatively, `npm run dev` from `../cloud` starts the whole local stack.

Run `npm run build` to type-check and create the production site in `dist/`.
