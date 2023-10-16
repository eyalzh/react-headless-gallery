import { createContext, forwardRef, useEffect, useId } from "react";
import React from "react";

export interface GalleryBaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

type EasingFunction = "ease" | "ease-in" | "ease-in-out" | "ease-out";

export interface GalleryProps extends GalleryBaseProps {
  transitionDurationMS?: number; // default: 300
  transitionTimingFunction?: EasingFunction; // default: ease-in-out
  selfLooping?: false | number; // default false (number is the interval in ms).
  stopLoopingOnInteraction?: boolean; // Stop self looping if any of the controls is interacted with (default: true)
}

export interface GalleryItemsProps extends GalleryBaseProps {
  children: React.ReactElement[];
}

interface GalleryContext {
  readonly galleryId: string;
  readonly currentItemIndex: number;
  readonly numberOfItems: number;
  readonly animationEnabled: boolean;
  readonly transitionDurationMS: number;
  readonly transitionTimingFunction: EasingFunction;
  onChangeItemIndex: (newItemIndex: number) => void;
  navigate: (delta: number, isUserInitiated: boolean) => void;
  onChangeNumberOfItems: (newNumberOfItems: number) => void;
}

export const GalleryContext = createContext<GalleryContext | null>(null);

export const GalleryContainer = forwardRef(function Container(
  props: GalleryProps,
  ref: React.Ref<HTMLDivElement>
) {
  const galleryIdSuffix = useId();
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [numberOfItems, setNumberOfItems] = React.useState(0);
  const [animationEnabled, setAnimationEnabled] = React.useState(true);
  const [interactionDetected, setInteractionDetected] = React.useState(false);

  const transitionDurationMS = props.transitionDurationMS ?? 300;
  const navigate = (delta: number, isUserInitiated: boolean) => {
    setCurrentItemIndex((prev) => {
      return Math.max(Math.min(prev + delta, numberOfItems), -1);
    });
    if (isUserInitiated) {
      setInteractionDetected(true);
    }
  };
  const contextValue = {
    galleryId: "__headless_gallery__" + galleryIdSuffix,
    currentItemIndex: currentItemIndex,
    numberOfItems: numberOfItems,
    animationEnabled: animationEnabled,
    transitionDurationMS,
    transitionTimingFunction: props.transitionTimingFunction ?? "ease-in-out",
    onChangeItemIndex: (newItemIndex: number) => {
      setCurrentItemIndex(newItemIndex);
      setInteractionDetected(true);
    },
    onChangeNumberOfItems: (newNumberOfItems: number) => {
      setNumberOfItems(newNumberOfItems);
    },
    navigate,
  } satisfies GalleryContext;

  useEffect(() => {
    const optimisticItemIndex = getOptimisticItemIndex(
      currentItemIndex,
      numberOfItems
    );
    if (currentItemIndex !== optimisticItemIndex) {
      const timer = setTimeout(() => {
        setAnimationEnabled(false);
        setCurrentItemIndex(optimisticItemIndex);
      }, transitionDurationMS);
      return () => clearTimeout(timer);
    }
  }, [currentItemIndex, numberOfItems, transitionDurationMS]);

  useEffect(() => {
    if (animationEnabled === false) {
      const timer = setTimeout(() => setAnimationEnabled(true), 50);
      return () => clearTimeout(timer);
    }
  }, [animationEnabled]);

  useEffect(() => {
    const stopSelfLooping =
      interactionDetected && props.stopLoopingOnInteraction !== false;
    if (props.selfLooping && !stopSelfLooping) {
      const timer = setInterval(() => {
        navigate(1, false);
      }, props.selfLooping);
      return () => clearInterval(timer);
    }
  }, [
    props.selfLooping,
    props.stopLoopingOnInteraction,
    numberOfItems,
    navigate,
    interactionDetected,
  ]);

  return (
    <GalleryContext.Provider value={contextValue}>
      <div className={props.className} style={props.style} ref={ref}>
        {props.children}
      </div>
    </GalleryContext.Provider>
  );
});

export function getOptimisticItemIndex(
  itemIndex: number,
  numberOfItems: number
) {
  if (itemIndex === numberOfItems) {
    return 0;
  }
  if (itemIndex === -1) {
    return numberOfItems - 1;
  }
  return itemIndex;
}
