import React, { useState } from "react";
import { Id, Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DateIcon from "../icons/DateIcon";
import QuadrangleIcon from "../icons/QuadrangleIcon";
import FlagIcon from "../icons/FlagIcon";

type KanbanTaskCardProps = {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
};

const KanbanTaskCard: React.FC<KanbanTaskCardProps> = ({
  task,
  deleteTask,
  updateTask,
}) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-lg border border-gray-300 w-full h-44 opacity-50"
      ></div>
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex justify-between p-2 cursor-grab bg-white rounded-md border-2 border-gray-300"
      >
        <textarea
          className="h-24 w-full"
          value={task.content}
          autoFocus
          placeholder="Task Content Here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleEditMode();
            }
          }}
          onChange={(e) => {
            updateTask(task.id, e.target.value);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-3 p-2 cursor-grab bg-white rounded-md border-2 border-gray-300 text-xs"
      onClick={toggleEditMode}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {/* <p>{task.content}</p> */}

      <div className="flex flex-col gap-1 font-medium">
        <p className="text-orange-500">Operasyon Birimi</p>
        <p className="text-gray-800">
          Bu örnek görevdir. Örnek görevin içeriğine dair açıklama detail’da
          bulunmaktadır.
        </p>
      </div>

      <div className="flex items-center gap-0.5 text-gray-350">
        <DateIcon />
        <p>05.02.2024 - 10.02.2024</p>
      </div>

      <div className="flex items-center gap-2.5">
        <QuadrangleIcon />
        <p className="text-gray-350">Milestone Name</p>
        <FlagIcon />
      </div>

      {mouseIsOver && (
        <button className="self-end mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200" onClick={() => deleteTask(task.id)}>Delete Task</button>
      )}
    </div>
  );
};
export default KanbanTaskCard;
