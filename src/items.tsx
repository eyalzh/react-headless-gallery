import { ReactElement, cloneElement, forwardRef, useEffect } from "react";
import React from "react";
import { GalleryContext, GalleryItemsProps, GalleryProps } from "./gallery";

export interface GalleryItemProps extends GalleryProps {
  itemId: GalleryItemId;
}

export type GalleryItemId = string | number | bigint;

export const Items = forwardRef(function Items(
  props: GalleryItemsProps,
  ref: React.Ref<HTMLDivElement>
) {
  const context = React.useContext(GalleryContext);
  useEffect(() => {
    if (context) {
      context.onChangeNumberOfItems(React.Children.count(props.children));
    }
  }, [props.children]);

  const finalStyle = {
    overflow: "hidden",
    ...props.style,
  }

  const windowStyle = {
    display: "flex",
    width: "100%",
    transform: `translateX(-${(context?.currentItemIndex ?? 0) * 100 + 100}%)`,
    transition: context?.animationEnabled
      ? "transform 0.3s ease-in-out"
      : "none",
  };

  const firstChild = React.Children.toArray(props.children)[0];
  const clonedFirst = cloneElement(firstChild as ReactElement, {
    key: "__gallery__first-child",
  });
  const lastChild = React.Children.toArray(props.children).slice(-1)[0];
  const clonedLast = cloneElement(lastChild as ReactElement, {
    key: "__gallery__last-child",
  });

  return (
    <div className={props.className} style={finalStyle} ref={ref}>
      <div style={windowStyle}>
        {clonedLast}
        {props.children}
        {clonedFirst}
      </div>
    </div>
  );
});

export const Item = forwardRef(function Item(
  props: GalleryItemProps,  
  ref: React.Ref<HTMLDivElement>
) {
  const finalStyle = {
    flexShrink: 0,
    width: "100%",
    ...props.style,
  };
  return (
    <div className={props.className} style={finalStyle} ref={ref}>
      {props.children}
    </div>
  );
});
