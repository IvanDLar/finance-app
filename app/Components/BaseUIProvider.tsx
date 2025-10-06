'use client';

import { Client as Styletron } from 'styletron-engine-monolithic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import React, { useState, useEffect } from 'react';

export default function BaseUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [engine, setEngine] = useState<Styletron | null>(null);

  useEffect(() => {
    // Only create the Styletron engine on the client side
    setEngine(new Styletron());
    setMounted(true);
  }, []);

  // During SSR and initial render, just return children without BaseUI
  if (!mounted || !engine) {
    return <>{children}</>;
  }

  // Only render BaseUI components on the client after mount
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>{children}</BaseProvider>
    </StyletronProvider>
  );
}
