import br from "./haslit/element";
import React from "react";

export const App = () => {
    const [state, setState] = React.useState(false);
    const toggle = br.toggle({
      label: "Toggle Exampleee",
      onClick: () => setState(!state),
    });
  
    const elements = [
      toggle,
      state && br.write({ body: String(state) }),
      br.write({ body: "Hai" }),
      br.button({ label: "Button" })
    ];
  
    return elements;
  };