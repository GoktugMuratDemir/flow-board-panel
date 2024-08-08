"use client";

import { useMemo, useState } from "react";
import { Column, Id } from "./types";
import KanbanColumnContainer from "./KanbanColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const deleteColumn = (id: Id) => {
    const newColumns = columns.filter((col) => col.id !== id);
    setColumns(newColumns);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log("drag start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px sonra sürüklemeye başlar
      },
    })
  );

  console.log(columns);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-9">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="m-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <div key={col.id} className="rounded-lg">
                  <KanbanColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createNewColumn()}
            className="bg-red-500 min-w-80 h-20 p-3 rounded-lg"
          >
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
