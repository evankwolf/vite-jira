import React from "react"
import type { ReactNode } from "react"
import { AuthProvider } from "./auth-context"


export const AppProviders = ({ children }: {children: ReactNode}) => (<AuthProvider>
  {children}
</AuthProvider>)