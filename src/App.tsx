import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { imageList } from "./imageList";
import Header from "./Header";
import { SortableItem } from "./SortableItem";
import { Photo } from "./Photo";

const App = () => {
  const [items, setItems] = useState(imageList);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  console.log(selected);

  const handleDeleteClick = () => {
    setItems((prevItems) => prevItems.filter((url) => !selected.includes(url)));
    setSelected([]);
  };

  const clearSelect = () => {
    setSelected([]);
  };

  return (
    <div className="container mx-auto">
      <Header
        total={selected.length}
        handleDeleteClick={handleDeleteClick}
        clearSelect={clearSelect}
      />
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(5, 1fr)`,
              gridGap: 10,
              padding: 10,
            }}
          >
            {items.map((url, index) => (
              <SortableItem
                key={url}
                url={url}
                index={index}
                selected={selected}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activeId ? (
            <Photo url={activeId} index={items.indexOf(String(activeId))} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(String(active.id));
        const newIndex = items.indexOf(String(over?.id));

        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      // Check if the photo is already selected
      const isSelected = selected.includes(String(active.id));

      if (isSelected) {
        setSelected((prevSelected) =>
          prevSelected.filter((id) => id !== active.id)
        );
      } else {
        setSelected((prevSelected) => [...prevSelected, String(active.id)]);
      }
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
};

export default App;
