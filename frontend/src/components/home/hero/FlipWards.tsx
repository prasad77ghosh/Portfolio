import { FlipWords } from "@/components/ui/flip-words";
import React, { memo } from "react";

export const FlipTexts = memo(({strArr}:{strArr:string[]}) => {
  return (
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mx-auto font-medium text-neutral-600 dark:text-neutral-400">
        <FlipWords words={strArr} />
      </div>
  );
});

FlipTexts.displayName = "FlipTexts";
