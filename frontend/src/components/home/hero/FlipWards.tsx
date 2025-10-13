import { FlipWords } from "@/components/ui/flip-words";
import React from "react";

export function FlipTexts({strArr}:{strArr:string[]}) {
  return (
      <div className="text-2xl mx-auto font-medium text-neutral-600 dark:text-neutral-400">
        <FlipWords words={strArr} />
      </div>
  );
}
