import React, { useMemo, useState } from "react";
import { Column, Id, Task } from "./types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import KanbanTaskCard from "./KanbanTaskCard";
import AddIcon from "../icons/AddIcon";
import MoreCircle from "../icons/MoreCircle";

type KanbanColumnContainerProps = {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
};

const KanbanColumnContainer: React.FC<KanbanColumnContainerProps> = (
  props: KanbanColumnContainerProps
) => {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

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
    disabled: editMode,
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
        className="bg-white w-80 h-[720px] rounded-lg flex flex-col opacity-50 border border-primary-300"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white w-80 h-[720px] rounded-lg flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="flex items-center justify-between"
      >
        {/* edit header */}
        {/* <div className="text-2xl cursor-grab font-bold flex items-center">
          <p>{column.id}</p>
          {editMode ? (
            <input
              className="bg-slate-500 text-white w-full"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          ) : (
            <p>{column.title}</p>
          )}
        </div>
        <button onClick={() => deleteColumn(column.id)}>Delete</button> */}

        {/* Header Column */}
        <div className="w-full flex items-center justify-between px-4 py-4 cursor-grab">
          <div className="flex items-center gap-2">
            <p className="text-base text-primary-400">OPEN</p>
            <p className="text-xs w-5 h-5 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center">
              3
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => createTask(column.id)}>
              <AddIcon />
            </button>

            <MoreCircle />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-1 border border-gray-300 h-full">
        <SortableContext items={tasksIds}>
          {tasks?.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
export default KanbanColumnContainer;
