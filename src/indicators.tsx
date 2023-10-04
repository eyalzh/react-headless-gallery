import { forwardRef } from "react";
import { GalleryProps } from "./gallery";
import React from "react";
import { GalleryItemId } from "./items";

export interface GalleryIndicatorProps extends GalleryProps {
  itemId: GalleryItemId;
}

export const Indicators = forwardRef(function Indicators(
  props: GalleryProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div className={props.className} style={props.style} ref={ref}>
      <h1>Indicators 3</h1>
    </div>
  );
});

export const Indicator = forwardRef(function Indicator(
  props: GalleryIndicatorProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button className={props.className} style={props.style} ref={ref}>
      <h1>Indicator</h1>
    </button>
  );
});
