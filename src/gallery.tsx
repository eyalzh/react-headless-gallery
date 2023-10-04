import { createContext, forwardRef, useEffect } from "react";
import React from "react";

export interface GalleryProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface GalleryItemsProps extends GalleryProps {
  children: React.ReactElement[];
}

interface GalleryContext {
  readonly currentItemIndex: number;
  readonly numberOfItems: number;
  animationEnabled: boolean;
  onChangeItemIndex: (newItemIndex: number) => void;
  navigate: (delta: number) => void;
  onChangeNumberOfItems: (newNumberOfItems: number) => void;
}

export const GalleryContext = createContext<GalleryContext | null>(null);

export const GalleryContainer = forwardRef(function Container(
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
    navigate: (delta: number) => {
      setCurrentItemIndex((prev) => {
        return Math.max(Math.min(prev + delta, numberOfItems), -1);
      });
    },
    numberOfItems: numberOfItems,
    animationEnabled: animationEnabled,
  };

  useEffect(() => {
    if (currentItemIndex === numberOfItems) {
      console.log("setting loopnack timeout");
      const timer = setTimeout(() => {
        setAnimationEnabled(false);
        setCurrentItemIndex(0);
      }, 300);
      return () => clearTimeout(timer);
    }
    if (currentItemIndex === -1) {
      console.log("setting loopnack timeout");
      const timer = setTimeout(() => {
        setAnimationEnabled(false);
        setCurrentItemIndex(numberOfItems - 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentItemIndex, numberOfItems]);

  useEffect(() => {
    if (animationEnabled === false) {
      console.log("setting re-enable animation timeout ");
      const timer = setTimeout(() => setAnimationEnabled(true), 50);
      return () => clearTimeout(timer);
    }
  }, [animationEnabled]);

  return (
    <GalleryContext.Provider value={contextValue}>
      <div className={props.className} style={props.style} ref={ref}>
        {props.children}
      </div>
    </GalleryContext.Provider>
  );
});
