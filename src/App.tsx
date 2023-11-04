/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import "./App.css";
import Images from "./api/images.json";

interface IImages {
  id: number;
  image: string;
}

function App() {
  const [items, setItems] = useState<IImages[]>(Images);
  const [selectItem, setSelectItem] = useState<number[]>([]);

  function onChange(_: string, sourceIndex: number, targetIndex: number) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }
  /* --this function is set select item and deselect item */
  const handleTrackItems = (e: any, id: number) => {
    if (e?.target.checked && !selectItem.includes(id)) {
      setSelectItem([...selectItem, id]);
    } else {
      const removeItem = selectItem.filter((item) => item != id);
      setSelectItem(removeItem);
    }
  };

  /* ---this function is remove selected item from state */
  const handleDeleteItems = () => {
    const deleteItem = items.filter((item) => !selectItem.includes(item.id));
    setItems(deleteItem);
    setSelectItem([]);
  };
  console.log(selectItem);
  return (
    <>
      <GridContextProvider onChange={onChange}>
        <div className="flex justify-center items-center  bg-[#f1f3f4]">
          <div className="w-[900px] h-[800px] bg-white p-2">
            {selectItem.length ? (
              <div className="flex justify-between ">
                <p>
                  <input
                    type="checkbox"
                    readOnly
                    checked={!!selectItem.length}
                  />{" "}
                  {selectItem.length} File{selectItem.length > 1 ? "s" : ""}{" "}
                  Selected
                </p>

                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteItems()}
                >
                  Delete file{selectItem.length > 1 ? "s" : ""}
                </button>
              </div>
            ) : (
              <></>
            )}
            <GridDropZone
              id="items"
              boxesPerRow={4}
              rowHeight={225}
              style={{
                height: "700px",
                width: "900px",
              }}
            >
              {items?.map((item: IImages) => (
                <GridItem
                  key={item.id}
                  className="border-2 rounded-md "
                  style={{ height: "200px", width: "200px" }}
                >
                  {item.id == 12 ? (
                    <div
                      className={`h-full flex justify-center items-center ${
                        item.id == 12 && "active:bg-violet-700"
                      } `}
                    >
                      <p className="text-center"> add image</p>
                    </div>
                  ) : (
                    <div className="relative group flex justify-center ">
                      <img src={item.image} alt={`image/${item.id}`} />
                      <div
                        className={`absolute top-0 hover:cursor-grab opacity-[.2] w-full h-full ${
                          selectItem.includes(item.id)
                            ? "bg-black"
                            : "group-hover:bg-black"
                        }`}
                      ></div>
                      <input
                        type="checkbox"
                        // className="w-5 h-5  absolute top-0 hidden group-hover:block z-20"
                        className={`w-5 h-5 absolute top-0 group-hover:block ${
                          !selectItem.includes(item.id) && "hidden"
                        }`}
                        onClick={(e) => handleTrackItems(e, item.id)}
                      />
                    </div>
                  )}
                </GridItem>
              ))}
            </GridDropZone>
          </div>
        </div>
      </GridContextProvider>
    </>
  );
}

export default App;
