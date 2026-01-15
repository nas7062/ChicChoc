"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { COLOR, SIZE } from "../constant";

const OPTIONS = {
  size: SIZE,
  color: COLOR
};

export default function DropDownSelect({ option }: { option: "size" | "color" }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="border rounded-md overflow-hidden">
      {/* 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full p-3 text-left font-medium"
      >
        {option.toUpperCase()}
      </button>

      {/* 드롭다운 */}
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
              <label
                key={item}
                className="block px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
