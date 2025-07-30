"use client";

import TableCent from "./tableCenter";
import { tableData as initialData } from "./lib/data";
import { useState, useRef, useEffect } from "react";
import { MoveRight, MoveLeft } from "lucide-react";
import { InputDemo } from "./search";
import { useSearchParams } from "next/navigation";
import ThemeToggle from "./theme-button";

type TableRow = {
  id: number;
  user: string;
  email: string;
};

const NUM_OF_ROWS = 10;

export default function Home() {
  const [tableData, setData] = useState<TableRow[]>(
    initialData.slice(0, NUM_OF_ROWS)
  );

  const [pag, setPag] = useState<number>(1);

  const num_pages_initial = Math.ceil(initialData.length / NUM_OF_ROWS);

  const num_pages = useRef<number>(num_pages_initial);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Filter data when URL query changes
  useEffect(() => {
    if (query.length === 0) {
      setData(initialData.slice(0, NUM_OF_ROWS));
      setPag(1);
      num_pages.current = Math.ceil(initialData.length / NUM_OF_ROWS);
    } else {
      const filtered = initialData.filter((row) =>
        row.user.toLowerCase().includes(query.toLowerCase())
      );
      setData(filtered.slice(0 * NUM_OF_ROWS, 1 * NUM_OF_ROWS));
      setPag(1);
      num_pages.current = Math.ceil(filtered.length / NUM_OF_ROWS);
    }
  }, [query]);

  useEffect(() => {
    const filtered = initialData.filter((row) =>
      row.user.toLowerCase().includes(query.toLowerCase())
    );
    setData(filtered.slice((pag - 1) * NUM_OF_ROWS, pag * NUM_OF_ROWS));
  }, [pag]);

  return (
    <div>
      <div className="relative left-[48rem]  flex items-center justify-center top-[5rem] max-w-[30rem]">
        <InputDemo className="w-[10rem] text-gray-100  placeholder:text-gray-300" />
        <div className="absolute  bg-blue-50 right-10 -top-10 rounded-lg shadow-lg p-2">
          <ThemeToggle />
        </div>
      </div>

      <div className="relative top-[7em] flex flex-col justify-center items-center">
        <TableCent data={tableData} />

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
              if (prev === num_pages.current) return prev;

              return prev + 1;
            });
          }}
        >
          <MoveRight className="text-red-400" />
        </div>
      </div>
    </div>
  );
}
