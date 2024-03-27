import { hydrateRoot } from "react-dom/client";
import { App } from "../app";
import React from "react";

// @ts-ignore
hydrateRoot(document.getElementById("root"), React.createElement(App));
