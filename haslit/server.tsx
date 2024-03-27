import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "../app";


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  const reactElement = React.createElement(App);
  const html = ReactDOMServer.renderToString(reactElement);

  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Dynamic React Elements</title>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.8.0/dist/full.min.css" rel="stylesheet" type="text/css" />
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="/client.js" defer></script>
    </body>
  </html>
`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
