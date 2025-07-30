"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function InputDemo({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 0) {
      router.push(`/?query=${encodeURIComponent(value)}`);
    }
  };

  return (
    <Input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={handleSearch}
      className={className}
    />
  );
}
