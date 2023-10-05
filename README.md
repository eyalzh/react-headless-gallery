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

(show a gif with sliding, or a link to a demo on github.io)

## Code Example

The following code example uses tailwind to style the gallery, as shown in the image above:

```jsx
function MyGallery() {
  const items = [
    {
      id: 1,
      content: "Item 1", // any React node is allowed (non-focusable)
    },
    {
      id: 2,
      content: "Item 2",
    },
    {
      id: 3,
      content: "Item 3",
    },
  ];

  return (
    <div className="w-full h-full bg-white">
      <Gallery className="flex flex-col items-center">
        <div className="flex flex-row">
          <Gallery.Prev className="cursor-pointer">
            <LeftSVG />
          </Gallery.Prev>
          <Gallery.Items className="w-[400px]">
            {items.map((item) => (
              <Gallery.Item
                key={item.id}
                itemId={item.id}
                className="text-center bg-red-300 h-96"
              >
                {item.content}
              </Gallery.Item>
            ))}
          </Gallery.Items>
          <Gallery.Next className="cursor-pointer">
            <RightSVG />
          </Gallery.Next>
        </div>
        <Gallery.Indicators>
          <Gallery.Indicator itemId={1}>1</Gallery.Indicator>
          <Gallery.Indicator itemId={2}>2</Gallery.Indicator>
          <Gallery.Indicator itemId={3}>3</Gallery.Indicator>
        </Gallery.Indicators>
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
