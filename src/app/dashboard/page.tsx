import KanbanBoard from "@/components/kanban-board/KanbanBoard";
import SideNav from "@/components/SideNav";
import { Tabs, TabValue } from "@/components/Tabs";

export default function Dashboard() {
  const tabValues: TabValue[] = [
    { id: 1, title: "Boards" },
    { id: 2, title: "List" },
    { id: 3, title: "Others" },
    { id: 4, title: "Others" },
    { id: 5, title: "Others" },
    { id: 6, title: "Others" },
    { id: 7, title: "Others" },
  ];

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <SideNav />
      </div>
      <div className="col-span-9">
        <div className="w-full flex flex-col px-8 py-6 gap-6 bg-purple-200 h-[90vh]">
          <h1 className="text-2xl font-bold text-primary">Frontend Case</h1>
          <Tabs values={tabValues} />
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
