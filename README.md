# React Headless Gallery

Headless, zero-dependencies, gallery/carousel component.

## Features

- Infinite slider both ways (circular gallery)
- Style all elements of the component
- Built with accessibility in mind


## Example

## Code Example

```jsx
function MyGallery() {
  const items = [
    {
      id: 1,
      content: "Item 1", // any React node is allowed
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


## API

## Note on infinite sliding

To implement infinite sliding, the first and last gallery elements are cloned - each will appear twice in the DOM. If that causes undesirable side effects, please disable infinite sliding.

## See also
(link to chatbox)
