"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { COLOR, SIZE } from "../constant";

const OPTIONS = {
  size: SIZE,
  color: COLOR,
} as const;

type Option = keyof typeof OPTIONS;

export default function DropDownSelect({
  option,
  value,
  onChange,
}: {
  option: Option;
  value?: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="border rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full p-3 text-left font-medium cursor-pointer"
      >
        {value ? `${option.toUpperCase()}: ${value}` : option.toUpperCase()}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {OPTIONS[option].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
