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

const NUM_OF_ROWS = 10;

export default function Home() {
  const [data, setData] = useState<TableRow[]>(
    initialData.slice(0, NUM_OF_ROWS)
  );

  const [pag, setPag] = useState<number>(1);

  const num_pages = Math.ceil(initialData.length / NUM_OF_ROWS);

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
              setData(
                initialData.slice(
                  (prev - 2) * NUM_OF_ROWS,
                  (prev - 1) * NUM_OF_ROWS
                )
              );
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
    w-10 h-10
    rounded-full
    mt-3
    bg-gray-900

    text-yellow-300
    font-semibold
    shadow-md hover:shadow-lg
    transition duration-300
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
            if (prev === num_pages) return prev;
            setData(
              initialData.slice(prev * NUM_OF_ROWS, (prev + 1) * NUM_OF_ROWS)
            );
            return prev + 1;
          });
        }}
      >
        <MoveRight className="text-red-400" />
      </div>
    </div>
  );
}
