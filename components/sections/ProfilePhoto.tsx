"use client";

import { useState } from "react";
import Image from "next/image";
import { profile } from "@/content/profile";

export function ProfilePhoto() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative aspect-[4/5] w-72 max-w-full overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-[0_0_40px_var(--accent-glow)]">
      {errored ? (
        <div className="flex h-full w-full items-center justify-center font-mono text-5xl text-accent">
          {profile.monogram}
        </div>
      ) : (
        <Image
          src={profile.photo}
          alt={`Photo of ${profile.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
