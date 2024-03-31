import React, { Children } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className=" h-screen w-full bg-slate-500 ">{children}</div>;
}
