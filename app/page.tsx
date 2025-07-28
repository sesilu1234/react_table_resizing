"use client";

import TableCent from "./tableCenter";
import { tableData as initialData } from "./lib/data";
import { useState } from "react";
import { MoveRight, MoveLeft } from "lucide-react";

type TableRow = {
  id: number;
  user: string;
  email: string;
};

export default function Home() {
  const [data, setData] = useState<TableRow[]>(initialData.slice(0, 10));

  const [pag, setPag] = useState<number>(1);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <TableCent data={data} />

      <div className="relative flex items-center justify-center w-[35rem]">
        <div
          className="
    flex items-center justify-center
    p-2 rounded-lg
    mt-3
    bg-gray-900
    cursor-pointer
    hover:bg-red-900
    shadow-lg hover:shadow-xl
    transition
    select-none
  "
          onClick={() => {
            setPag((prev) => {
              if (prev === 1) return prev;
              setData(initialData.slice((prev - 2) * 10, (prev - 1) * 10));
              return prev - 1;
            });
          }}
        >
          <MoveLeft className="text-red-400" />
        </div>

        <div
          className="
    absolute top-0 right-0
    flex items-center justify-center
    w-10 h-10     /* ancho y alto iguales para círculo */
    rounded-full
    mt-3
    bg-gray-900
    
   
    text-[#f5e942]
    shadow-lg hover:shadow-xl
    transition
    select-none
  "
        >
          {pag}
        </div>
      </div>
      <div
        className="
    inline-flex items-center justify-center
    p-2 rounded-lg
    mt-3
    bg-gray-900
    cursor-pointer
    hover:bg-red-900
    shadow-lg hover:shadow-xl
    transition
    select-none
  "
        onClick={() => {
          setPag((prev) => {
            if (prev === 2) return prev;
            setData(initialData.slice(prev * 10, (prev + 1) * 10));
            return prev + 1;
          });
        }}
      >
        <MoveRight className="text-red-400" />
      </div>
    </div>
  );
}
