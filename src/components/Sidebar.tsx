"use client"
import { useState } from "react";
import Image from "next/image";

type SideBarItemProps = {
  index: number;
  selected: boolean;
  onClick: (index: number) => void;
};

const SideBarItem: React.FC<SideBarItemProps> = ({ index, selected, onClick }) => (
  <div
    className={`p-3 rounded-md cursor-pointer ${selected ? "bg-gray-700" : ""}`}
    onClick={() => onClick(index)}
  >
    <Image src="/icons/bell.svg" width={20} height={20} alt="Bell icon" />
  </div>
);

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const topItems = Array.from({ length: 4 });
  const bottomItems = Array.from({ length: 4 });

  return (
    <div className="w-full px-3 py-8 bg-primary-800 h-full flex flex-col items-center justify-between gap-6">
      <div className="h-full flex flex-col items-center justify-between">
        <div className="flex flex-col gap-2">
          {topItems.map((_, index) => (
            <SideBarItem
              key={index}
              index={index}
              selected={selectedIndex === index}
              onClick={handleItemClick}
            />
          ))}
        </div>
        <div>
          {bottomItems.map((_, index) => (
            <SideBarItem
              key={index}
              index={index + 4} // Alt gruptaki item'lar için farklı index değerleri
              selected={selectedIndex === index + 4}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </div>
      <Image
        src="/images/avatar.svg"
        width={48}
        height={48}
        alt="Picture of the author"
      />
    </div>
  );
}
