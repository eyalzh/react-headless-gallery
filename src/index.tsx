import {
  ReactElement,
  cloneElement,
  createContext,
  forwardRef,
  useEffect,
} from "react";
import React from "react";

export interface GalleryProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export type GalleryItemId = string | number | bigint;

export interface GalleryItemProps extends GalleryProps {
  itemId: GalleryItemId;
}

export interface GalleryItemsProps extends GalleryProps {
  children: React.ReactElement[];
}

export interface GalleryIndicatorProps extends GalleryProps {
  itemId: GalleryItemId;
}

interface GalleryContext {
  readonly currentItemIndex: number;
  readonly numberOfItems: number;
  onChangeItemIndex: (newItemIndex: number) => void;
  onChangeNumberOfItems: (newNumberOfItems: number) => void;
  animationEnabled: boolean;
  enableAnimation: () => void;
  disableAnimation: () => void;
}

const GalleryContext = createContext<GalleryContext | null>(null);

const GalleryContainer = forwardRef(function Container(
  props: GalleryProps,
  ref: React.Ref<HTMLDivElement>
) {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [numberOfItems, setNumberOfItems] = React.useState(0);
  const [animationEnabled, setAnimationEnabled] = React.useState(true);

  const contextValue = {
    currentItemIndex: currentItemIndex,
    onChangeItemIndex: (newItemIndex: number) => {
      setCurrentItemIndex(newItemIndex);
    },
    onChangeNumberOfItems: (newNumberOfItems: number) => {
      setNumberOfItems(newNumberOfItems);
    },
    enableAnimation: () => {
      setAnimationEnabled(true);
    },
    disableAnimation: () => {
      setAnimationEnabled(false);
    },
    numberOfItems: numberOfItems,
    animationEnabled: animationEnabled,
  };

  return (
    <GalleryContext.Provider value={contextValue}>
      <div className={props.className} style={props.style} ref={ref}>
        {props.children}
      </div>
    </GalleryContext.Provider>
  );
});

const Indicators = forwardRef(function Indicators(
  props: GalleryProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div className={props.className} style={props.style} ref={ref}>
      <h1>Indicators</h1>
    </div>
  );
});

const Indicator = forwardRef(function Indicator(
  props: GalleryIndicatorProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button className={props.className} style={props.style} ref={ref}>
      <h1>Indicator</h1>
    </button>
  );
});

const Items = forwardRef(function Items(
  props: GalleryItemsProps,
  ref: React.Ref<HTMLDivElement>
) {
  const context = React.useContext(GalleryContext);
  useEffect(() => {
    if (context) {
      context.onChangeNumberOfItems(React.Children.count(props.children));
    }
  }, [props.children]);

  useEffect(() => {
    if (context && context.animationEnabled === false) {
      setTimeout(() => context.enableAnimation(), 50);
    }
  }, [context?.animationEnabled]);

  const finalStyle = {
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
    <div className={props.className} style={props.style} ref={ref}>
      <div style={finalStyle}>
        {clonedLast}
        {props.children}
        {clonedFirst}
      </div>
    </div>
  );
});

const Item = forwardRef(function Item(
  props: GalleryItemProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div className={props.className} style={props.style} ref={ref}>
      {props.children}
    </div>
  );
});

const Prev = forwardRef(function Prev(
  props: GalleryProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const context = React.useContext(GalleryContext);

  const onClick = () => {
    if (context && context.numberOfItems) {
      context.onChangeItemIndex(Math.max(context.currentItemIndex - 1, 0));
    }
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

const Next = forwardRef(function Next(
  props: GalleryProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const context = React.useContext(GalleryContext);

  const onClick = () => {
    if (context && context.numberOfItems) {
      context.onChangeItemIndex(
        Math.min(context.currentItemIndex + 1, context.numberOfItems)
      );
      if (context.currentItemIndex === context.numberOfItems - 1) {
        setTimeout(() => {
          context.disableAnimation();
          context.onChangeItemIndex(0);
        }, 300);
      }
    }
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

export const Gallery = Object.assign(GalleryContainer, {
  Indicators,
  Indicator,
  Items,
  Item,
  Prev,
  Next,
});
