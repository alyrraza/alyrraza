"use client";

import dynamic from "next/dynamic";
import { CustomCursor } from "./CustomCursor";

const IntroLoader = dynamic(
  () => import("./IntroLoader").then((mod) => mod.IntroLoader),
  { ssr: false }
);

export function ClientEffects() {
  return (
    <>
      <IntroLoader />
      <CustomCursor />
    </>
  );
}
