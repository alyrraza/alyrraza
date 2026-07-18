"use client";

import { useState } from "react";
import Image from "next/image";
import { Film, ImageOff } from "lucide-react";
import { ProjectMedia } from "@/types";
import { cn } from "@/lib/utils";

function DemoVideo({
  src,
  caption,
  fit,
}: {
  src: string;
  caption?: string;
  fit: "cover" | "contain";
}) {
  return (
    <video
      src={src}
      controls
      playsInline
      preload="metadata"
      aria-label={caption ?? "Project demo video"}
      className={cn("h-full w-full", fit === "contain" ? "object-contain" : "object-cover")}
    />
  );
}

export function ProjectMediaBlock({
  media,
  className,
  fit = "cover",
}: {
  media?: ProjectMedia;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [imgError, setImgError] = useState(false);

  if (!media) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-bg-tertiary text-text-tertiary",
          className
        )}
      >
        <ImageOff size={28} aria-hidden />
        <span className="sr-only">No media available</span>
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className={cn("relative overflow-hidden bg-bg-tertiary", className)}>
        <DemoVideo src={media.src} caption={media.caption} fit={fit} />
      </div>
    );
  }

  if (imgError) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-bg-tertiary text-text-tertiary",
          className
        )}
      >
        <Film size={28} aria-hidden />
        <span className="text-xs">Media unavailable</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-bg-tertiary", className)}>
      <Image
        src={media.src}
        alt={media.caption ?? "Project screenshot placeholder"}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={fit === "contain" ? "object-contain" : "object-cover"}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
