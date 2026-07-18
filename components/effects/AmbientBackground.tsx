"use client";

import dynamic from "next/dynamic";
import { use3DEnabled } from "@/lib/use3DEnabled";

const AmbientScene = dynamic(
  () => import("./AmbientScene").then((mod) => mod.AmbientScene),
  { ssr: false }
);

export function AmbientBackground() {
  const enabled = use3DEnabled();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {enabled ? (
        <AmbientScene />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, var(--accent-glow), transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
