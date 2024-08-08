"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Column, Id, Task } from "./types";
import KanbanColumnContainer from "./KanbanColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import KanbanTaskCard from "./KanbanTaskCard";
import { createPortal } from "react-dom";

const generateId = () => {
  return Math.floor(Math.random() * 10001);
};

const defaultColumns: Column[] = [
  { id: generateId(), title: "To Do" },
  { id: generateId(), title: "In Progress" },
  { id: generateId(), title: "Done" },
];

const defaultTasks: Task[] = [
  { id: generateId(), content: "Task 1", columnId: defaultColumns[0].id },
  { id: generateId(), content: "Task 2", columnId: defaultColumns[1].id },
  { id: generateId(), content: "Task 3", columnId: defaultColumns[2].id },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const isClient = typeof window !== 'undefined';

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: Id) => {
    const newColumns = columns.filter((col) => col.id !== id);
    setColumns(newColumns);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
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

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = active.data.current?.type === "Task";

    if (!isActiveTask) return;

    // in the same column
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex]?.columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // another column
    const isOverColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeTaskIndex].columnId = overId;

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px sonra sürüklemeye başlar
      },
    })
  );

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id === id) {
        return {
          ...col,
          title,
        };
      }
      return col;
    });
    setColumns(newColumns);
  };

  const createTask = (columnId: Id) => {
    const taskToAdd: Task = {
      id: generateId(),
      columnId: columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, taskToAdd]);
  };

  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          content,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  // Use a ref to only create portal in the client
// Use a ref to only create portal in the client
const portalRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (!isClient) return;
  const portalElement = document.createElement('div');
  portalRef.current = portalElement;
  document.body.appendChild(portalElement);
  return () => {
    if (portalRef.current) {
      document.body.removeChild(portalRef.current);
    }
  };
}, [isClient]);

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-2">
          <div className="flex gap-2.5">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <div key={col.id}>
                  <KanbanColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    updateTask={updateTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                    deleteTask={deleteTask}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createNewColumn()}
            className="flex items-center h-20 gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add Column
          </button>
        </div>

        {portalRef.current && createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <KanbanTaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          portalRef.current
        )}
      </DndContext>
    </div>
  );
}
