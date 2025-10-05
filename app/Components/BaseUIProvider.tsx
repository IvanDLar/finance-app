"use client";

import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import React from "react";

const engine = new Styletron();

export default function BaseUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>{children}</BaseProvider>
    </StyletronProvider>
  );
}
