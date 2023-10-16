import { forwardRef, useContext } from "react";
import { GalleryBaseProps, GalleryContext } from "./gallery";
import React from "react";

export interface GalleryNavigationProps extends GalleryBaseProps {
  "aria-label"?: string;
}

export const Next = forwardRef(function Next(
  props: GalleryNavigationProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const context = useContext(GalleryContext);

  const onClick = () => {
    context?.navigate(1, true);
  };
  return (
    <button
      className={props.className}
      style={props.style}
      ref={ref}
      onClick={onClick}
      aria-label={props["aria-label"] ?? "Next Item"}
      aria-controls={context?.galleryId}
    >
      {props.children}
    </button>
  );
});

export const Prev = forwardRef(function Prev(
  props: GalleryNavigationProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const context = useContext(GalleryContext);
  const onClick = () => {
    context?.navigate(-1, true);
  };
  return (
    <button
      className={props.className}
      style={props.style}
      ref={ref}
      onClick={onClick}
      aria-label={props["aria-label"] ?? "Previous Item"}
      aria-controls={context?.galleryId}
    >
      {props.children}
    </button>
  );
});
