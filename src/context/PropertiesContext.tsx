"use client";

import { Property } from "@/types/property";
import React, { createContext, useContext } from "react";

interface PropertiesContextType {
  properties: Property[];
}

const PropertiesContext = createContext<PropertiesContextType>({
  properties: [],
});

export function PropertiesProvider({
  children,
  properties,
}: {
  children: React.ReactNode;
  properties: Property[];
}) {
  return (
    <PropertiesContext.Provider value={{ properties }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertiesProvider");
  }
  return context;
}
