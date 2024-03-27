//server-dev.js
import fs from "fs";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { createServer } from "vite";
import { App } from "../app";
import React from "react";

const app = express();

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: "custom",
});

app.use(vite.middlewares);

app.use("*", async (req, res) => {
  const url = req.originalUrl;

  try {
    const reactElement = React.createElement(App);
    const app = ReactDOMServer.renderToString(reactElement);


    const template = await vite.transformIndexHtml(
      url,
      `<html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Simple React SSR Vite Express</title>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.8.0/dist/full.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-200">
        <div id='root'><!--outlet--></div>
        <script type='module' src='/haslit/client.tsx'></script>
      </body>
    </html>`
    );

    const html = template.replace(`<!--outlet-->`, app);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.listen(4173, () => {
  console.log("http://localhost:4173.");
});
