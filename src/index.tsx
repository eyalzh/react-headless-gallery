import { GalleryContainer } from "./gallery";
import { Indicator } from "./indicators";
import { Next, Prev } from "./navigation";
import { Item, Items } from "./items";

export const Gallery = Object.assign(GalleryContainer, {
  Indicator,
  Items,
  Item,
  Prev,
  Next,
});
