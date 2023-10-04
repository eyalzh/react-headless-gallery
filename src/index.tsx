import { GalleryContainer } from "./gallery";
import { Indicator, Indicators } from "./indicators";
import { Next, Prev } from "./navigation";
import { Item, Items } from "./items";

export const Gallery = Object.assign(GalleryContainer, {
  Indicators,
  Indicator,
  Items,
  Item,
  Prev,
  Next,
});
