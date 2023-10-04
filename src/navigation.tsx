import { forwardRef, useContext } from "react";
import { GalleryContext, GalleryProps } from "./gallery";
import React from "react";

export const Next = forwardRef(function Next(
  props: GalleryProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const context = useContext(GalleryContext);

  const onClick = () => {
    context?.navigate(1);
  };
  return (
    <button
      className={props.className}
      style={props.style}
      ref={ref}
      aria-label="Next Item"
      onClick={onClick}
    >
      {props.children}
    </button>
  );
});

export const Prev = forwardRef(function Prev(
  props: GalleryProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const context = useContext(GalleryContext);
  const onClick = () => {
    context?.navigate(-1);
  };
  return (
    <button
      className={props.className}
      style={props.style}
      ref={ref}
      aria-label="Previous Item"
      onClick={onClick}
    >
      {props.children}
    </button>
  );
});
