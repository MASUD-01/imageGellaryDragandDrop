import { UniqueIdentifier } from "@dnd-kit/core";
import React, { forwardRef, Ref } from "react";

interface ItemProps {
  url: UniqueIdentifier;
  index: number;
  faded?: boolean;
  style?: React.CSSProperties;
  currentItemUrl?: string[];
}

export const Item = forwardRef(
  (
    { url, index, faded, style, currentItemUrl, ...props }: ItemProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const inlineStyles: React.CSSProperties = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      border: currentItemUrl?.includes(String(url)) ? "2px solid red" : "none",
      gridRowStart: index === 0 ? "span 2" : "auto",
      gridColumnStart: index === 0 ? "span 2" : "auto",

      ...style,
    };

    return (
      <div className="relative" ref={ref} style={inlineStyles} {...props}>
        <img
          className="object-cover w-full h-full bg-center hover:opacity-60 transition-all duration-500 border rounded"
          src={String(url)}
          alt=""
        />

        {currentItemUrl?.includes(String(url)) && (
          <div className="absolute z-50  rounded p-0.5 top-1 left-1">✅</div>
        )}
      </div>
    );
  }
);
