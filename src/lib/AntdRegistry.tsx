"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { renderToString } from "react-dom/server";

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = React.useMemo<Entity>(() => createCache(), [createCache]);
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <StyleProvider cache={cache} ssrInline={true}>
      {children}
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
