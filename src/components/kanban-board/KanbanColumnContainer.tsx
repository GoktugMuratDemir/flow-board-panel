import React from "react";
import { Column, Id } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type KanbanColumnContainerProps = {
  column: Column;
  deleteColumn: (id: Id) => void;
};

const KanbanColumnContainer: React.FC<KanbanColumnContainerProps> = (
  props: KanbanColumnContainerProps
) => {
  const { column, deleteColumn } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-500 w-60 h-96 rounded-md flex border-red-500 border-2 flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-500 w-60 h-96 rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between"
      >
        <div className="text-2xl cursor-grab font-bold">
          {column.id} {column.title}
        </div>
        <button onClick={() => deleteColumn(column.id)}>Delete</button>
      </div>
      <div className="flex flex-grow">content</div>
      <div>footeer</div>
    </div>
  );
};
export default KanbanColumnContainer;
