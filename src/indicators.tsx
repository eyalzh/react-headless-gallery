import { forwardRef, useContext, useMemo } from "react";
import { GalleryContext, GalleryProps } from "./gallery";
import React from "react";

export interface GalleryIndicatorProps extends Omit<GalleryProps, "className"> {
  galleryItemIndex: number;
  className?: string | ((isCurrent: boolean) => string);
}

export const Indicator = forwardRef(function Indicator(
  props: GalleryIndicatorProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const context = useContext(GalleryContext);

  const onClick = () => {
    context?.onChangeItemIndex(props.galleryItemIndex);
  };

  const finalClassName = useMemo<string | undefined>(() => {
    const finalClassName =
      typeof props.className === "function"
        ? props.className(context?.currentItemIndex === props.galleryItemIndex)
        : props.className;

    return finalClassName;
  }, [context?.currentItemIndex, props.className]);

  return (
    <button
      className={finalClassName}
      style={props.style}
      ref={ref}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
});
