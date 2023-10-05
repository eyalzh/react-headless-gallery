# React Headless Gallery

Headless, zero-dependencies, gallery/carousel component.

## Features

- Infinite sliding (circular gallery)
- Sliding animation (configurable)
- Auto sliding (configurable)
- Gallery indicators
- Allows for lazy loading of gallery items
- Freely style and position all elements of the component
- Built with accessibility in mind (see accessibility below)

## Example

<img src="https://s3.eu-west-1.amazonaws.com/simple.kanban/gallery1.jpg" width="400" />

(show a gif with sliding, or a link to a demo on github.io)

## Code Example

The following code example uses tailwind to style the gallery, as shown in the image above:

```jsx
function MyGallery() {
  const items = [
    {
      id: 1,
      content: (
        <img alt="Item 1" src="..." />
      ),
    },
    {
      id: 2,
      content: (
        <img alt="Item 2" loading="lazy" src="..." />
      ),
    },
    {
      id: 3,
      content: (
        <img alt="Item 3" loading="lazy" src="..." />
      ),
    },
  ] as const;

  return (
    <div className="w-full h-full bg-white p-32">
      <Gallery className="flex flex-col items-center gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Gallery.Prev className="cursor-pointer text-gray-800">
            <LeftSVG />
          </Gallery.Prev>
          <Gallery.Items className="w-[640px]">
            {items.map((item) => (
              <Gallery.Item key={item.id}>
                {item.content}
              </Gallery.Item>
            ))}
          </Gallery.Items>
          <Gallery.Next className="cursor-pointer text-gray-800">
            <RightSVG />
          </Gallery.Next>
        </div>
        <div className="flex flex-row gap-2">
          {[...Array(items.length)].map((_, i) => (
            <Gallery.Indicator
              key={i}
              galleryItemIndex={i}
              className={(isCurrent) =>
                `text-sm cursor-pointer ${isCurrent ? "text-gray-800" : "text-gray-300"}`
              }
            >
              ⬤
            </Gallery.Indicator>
          ))}
        </div>
      </Gallery>
    </div>
  );
}
```


## Accessibility

The gallery's controls (next, prev, and indicators) are buttons with ARIA labels that can be changed. They are defined as controlling the gallery container with the aria-controls attribute. Please note that all items in the gallery will have the aria-hidden attribute, except for the item that is currently being shown. Items in the gallery should not include focusable elements.

## API

## Note on infinite sliding

To implement infinite sliding, the first and last gallery elements are cloned - each will appear twice in the DOM. If that causes undesirable side effects, please disable infinite sliding.

## See also
(link to chatbox)
