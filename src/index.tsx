import React from "react";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container); // 'container!' assertion is unnecessary since the 'if' check ensures it is not null

  root.render(
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
} else {
  console.error("Failed to find the root element. Make sure there is an element with id 'root' in your HTML.");
}
