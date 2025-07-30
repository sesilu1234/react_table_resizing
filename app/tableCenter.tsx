"use client";

import { useRef } from "react";

type TableRow = {
  id: number;
  user: string;
  email: string;
};

type TableCentProps = {
  data: TableRow[];
  children?: React.ReactNode;
};

export default function TableCent({ data, children }: TableCentProps) {
  const columnRefs = useRef(new Map<number, HTMLDivElement>());

  const original = useRef<number | null>(null);

  const col = useRef<HTMLDivElement | null>(null);

  const currentWidth = useRef<number | null>(null);

  if (!data.length)
    return (
      <div className="flex max-w-[65%]  items-center min-h-[55vh] ">
        No data
      </div>
    );

  const keys = Object.keys(data[0]) as (keyof TableRow)[];
  const columnValues = keys.map((key) => data.map((row) => row[key]));

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    const moveX = e.clientX - original.current!;

    const newWidth = currentWidth.current! + moveX;

    col.current!.style.width = `${newWidth}px`;
  };

  const handleMouseUp = () => {
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("mousemove", handleMouseMove);
    document.body.style.userSelect = "";
  };

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    document.body.style.userSelect = "none";

    original.current = e.clientX;
    col.current = columnRefs.current.get(index)!;

    currentWidth.current = parseInt(
      window.getComputedStyle(col.current!).width,
      10
    );

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className=" flex max-w-[65%]   min-h-[55vh]  border shadow-[0_0_20px_#4cc9f066] rounded overflow-x-auto">
      {keys.map((key, index) => (
        <div key={index} className="flex">
          <div
            className="flex flex-col p-4 pt-2 bg-custom-dark rounded shadow max-w-[20rem] w-[10rem] "
            ref={(el) => {
              if (el) {
                columnRefs.current.set(index, el);
              } else {
                columnRefs.current.delete(index);
              }
            }}
          >
            <div className="border-b-2 border-gray-400 pb-1 mb-4 flex justify-center font-bold capitalize">
              {key}
            </div>

            {columnValues[index].map((value, jindex) => (
              <div
                key={`${key}-${jindex}`}
                className="truncate overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1 "
                title={String(value)}
              >
                {value || "\u00A0"}
              </div>
            ))}
          </div>

          {index < keys.length - 1 && (
            <div
              className="relative cursor-ew-resize flex items-center"
              onMouseDown={handleMouseDown(index)}
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6" />
              <div className="w-[0.1rem] bg-gray-400 mx-auto z-10 h-[95%] pt-10" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
