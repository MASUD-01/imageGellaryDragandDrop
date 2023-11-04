/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import "./Test.css";
const pictures = [
  "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg",
  "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg",
  "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg",
  "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg",
  "https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg",
];

function Test() {
  const [items, setItems] = useState(
    pictures.map((picture, index) => ({
      src: picture,
      id: index,
    }))
  );

  const onChange = (_: any, sourceIndex: number, targetIndex: number) => {
    // if (sourceIndex < items.length && targetIndex < items.length) {
    //   if (
    //     alert(
    //       `Do you want to replace Image ${items[targetIndex].id} for image ${items[sourceIndex].id} ?`
    //     )
    //   ) {
    setItems(swap(items, sourceIndex, targetIndex));
    //   }
    // }
  };

  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="itemss"
        boxesPerRow={3}
        rowHeight={200}
        className="grid"
      >
        {items.map((item) => (
          <GridItem key={item.id} className="grid-item">
            <div
              className="img-container"
              style={{
                backgroundImage: `url(${item.src})`,
              }}
            >
              <span className="img-label">{item.id}</span>
            </div>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
}

export default Test;
