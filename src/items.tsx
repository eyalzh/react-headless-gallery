import {
  CSSProperties,
  ReactElement,
  cloneElement,
  forwardRef,
  useEffect,
  useMemo,
} from "react";
import React from "react";
import { GalleryBaseProps, GalleryContext, GalleryItemsProps } from "./gallery";

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
  };

  const windowStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    transform: `translateX(-${(context?.currentItemIndex ?? 0) * 100 + 100}%)`,
    transition: context?.animationEnabled
      ? `transform ${context.transitionDurationMS}ms ${context.transitionTimingFunction}`
      : "none",
  };

  const itemChildren = useMemo(() => {
    const firstChild = React.Children.toArray(props.children)[0];
    const clonedFirst = cloneElement(firstChild as ReactElement, {
      key: "__gallery__first-child",
    });
    const lastChild = React.Children.toArray(props.children).slice(-1)[0];
    const clonedLast = cloneElement(lastChild as ReactElement, {
      key: "__gallery__last-child",
    });

    return [clonedLast, ...props.children, clonedFirst].map((child, index) => {
      return (
        <div
          style={{
            width: "100%",
            flexShrink: 0,
          }}
          key={"__wrapper__" + child.key}
          aria-hidden={index - 1 !== context?.currentItemIndex}
        >
          {child}
        </div>
      );
    });
  }, [props.children, context?.currentItemIndex]);

  return (
    <div
      className={props.className}
      style={finalStyle}
      ref={ref}
      id={context?.galleryId}
      aria-label="Gallery"
    >
      <div style={windowStyle}>{itemChildren}</div>
    </div>
  );
});

export const Item = forwardRef(function Item(
  props: GalleryBaseProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div className={props.className} style={props.style} ref={ref}>
      {props.children}
    </div>
  );
});
