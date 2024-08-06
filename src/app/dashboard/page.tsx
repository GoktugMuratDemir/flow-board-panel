import SideNav from "@/components/SideNav";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-3">
        <SideNav />
      </div>
      <div className="col-span-9">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
