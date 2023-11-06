import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Photo } from "./Photo";

interface SortablePhotoProps {
  key: string;
  url: string;
  index: number;
  selected: string[];
}

export const SortableItem: React.FC<SortablePhotoProps> = (props) => {
  const sortable = useSortable({ id: props.url });
  const { attributes, listeners, setNodeRef, transform, transition } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Photo
      ref={setNodeRef}
      style={style}
      currentItemUrl={props.selected}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};
