"use client";
import Image from "next/image";
import React, { useState } from "react";

// Arayüz tanımlamaları
interface SubItem {
  id: number;
  title: string;
  count: number;
}

interface SideNavItem {
  id: number;

  title: string;
  subItems: SubItem[];
}

// Dizi oluşturma
const sidenavItems: SideNavItem[] = [
  {
    id: 1,
    title: "Project Name 1",
    subItems: [
      { id: 1, title: "Overview", count: 8 },
      { id: 2, title: "Notifications", count: 10 },
      { id: 3, title: "Analytics", count: 12 },
      { id: 4, title: "Reports", count: 15 },
    ],
  },
  {
    id: 2,
    title: "Project Name 2",
    subItems: [
      { id: 1, title: "Dashboard", count: 5 },
      { id: 2, title: "Alerts", count: 7 },
      { id: 3, title: "Insights", count: 9 },
      { id: 4, title: "Documentation", count: 11 },
    ],
  },
  {
    id: 3,
    title: "Project Name 3",
    subItems: [
      { id: 1, title: "Summary", count: 6 },
      { id: 2, title: "Messages", count: 8 },
      { id: 3, title: "Reports", count: 10 },
      { id: 4, title: "Updates", count: 12 },
    ],
  },
  {
    id: 4,
    title: "Project Name 4",
    subItems: [
      { id: 1, title: "Introduction", count: 7 },
      { id: 2, title: "Tasks", count: 9 },
      { id: 3, title: "Performance", count: 11 },
      { id: 4, title: "Statistics", count: 13 },
    ],
  },
];

const colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500"];

const SideNav: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full py-9 px-4 flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <p className="text-base font-bold">Projeler</p>
        <div className="flex flex-col gap-2">
          {sidenavItems.map((item, index) => (
            <div key={item.id}>
              <div
                className={`relative flex items-center justify-between py-2 px-3 cursor-pointer rounded-md ${
                  openIndex === index && "bg-gray-150"
                }`}
                onClick={() => handleToggle(index)}
              >
                <span
                  className={`absolute left-[12px] top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${colors[index]}`}
                ></span>
                <h2 className="text-sm font-semibold ml-6">{item.title}</h2>
                <Image
                  src="/icons/arrow.svg"
                  width={10}
                  height={5}
                  alt="Picture of the author"
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                  openIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="flex flex-col gap-1 mt-2">
                  {item.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      className="p-3 pl-12 text-sm flex items-center justify-between"
                    >
                      <h3 className="font-semibold">{subItem.title}</h3>
                      <p className="bg-gray-50 px-2 py-0.5 border rounded-full">
                        {subItem.count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 px-3 py-2 mt-1">
          <Image
            src="/icons/chart.svg"
            width={12}
            height={16}
            alt="Picture of the author"
          />
          <p className="text-gray-200 text-sm">Proje Oluştur</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p className="font-semibold relative after:absolute after:top-1/2 after:right-0 after:w-4 after:h-4 after:border-2 after:rounded-full after:translate-y-[-50%]">
          Olivia Rhye
        </p>
        <p className="text-gray-300">olivia@untitledui.com</p>
      </div>
    </div>
  );
};

export default SideNav;
