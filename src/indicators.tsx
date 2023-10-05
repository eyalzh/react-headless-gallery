import { forwardRef, useContext } from "react";
import {
  GalleryBaseProps,
  GalleryContext,
  getOptimisticItemIndex,
} from "./gallery";
import React from "react";

export interface GalleryIndicatorProps
  extends Omit<GalleryBaseProps, "className"> {
  galleryItemIndex: number;
  className?: string | ((isCurrent: boolean) => string);
  "aria-label"?: string | ((itemNumber: number, isCurrent: boolean) => string);
}

export const Indicator = forwardRef(function Indicator(
  props: GalleryIndicatorProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const context = useContext(GalleryContext);

  const onClick = () => {
    context?.onChangeItemIndex(props.galleryItemIndex);
  };

  const optimisticItemIndex = getOptimisticItemIndex(
    context?.currentItemIndex ?? 0,
    context?.numberOfItems ?? 0
  );

  const finalClassName =
    typeof props.className === "function"
      ? props.className(optimisticItemIndex === props.galleryItemIndex)
      : props.className;

  const finalAriaLabel =
    typeof props["aria-label"] === "function"
      ? props["aria-label"](
          props.galleryItemIndex + 1,
          optimisticItemIndex === props.galleryItemIndex
        )
      : props["aria-label"];

  return (
    <button
      className={finalClassName}
      style={props.style}
      ref={ref}
      onClick={onClick}
      aria-label={
        finalAriaLabel ?? `Go to item number ${props.galleryItemIndex + 1}`
      }
      aria-controls={context?.galleryId}
    >
      {props.children}
    </button>
  );
});
