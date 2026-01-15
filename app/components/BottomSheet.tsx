"use client";

import { motion } from "framer-motion";
import DropDownSelect from "./DropDownSelect";
import { useRef, useState } from "react";
import CartItem from "./CartItem";

export type CartOptionItem = {
  id: string;
  size: string;
  color: string;
  count: number;
};

const BottomSheet = ({
  isOpen = false,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [items, setItems] = useState<CartOptionItem[]>([]);
  const totalPrice = items.reduce((prev, item) => prev + item.count * 63000, 0);


  const lastAddedKeyRef = useRef<string>("");

  const confirmOption = (nextSize: string, nextColor: string) => {
    if (!nextSize || !nextColor) return;

    const key = `${nextSize}__${nextColor}`;
    if (lastAddedKeyRef.current === key) return;
    lastAddedKeyRef.current = key;

    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), size: nextSize, color: nextColor, count: 1 },
    ]);

    // 선택 초기화
    setSize("");
    setColor("");


    setTimeout(() => {
      lastAddedKeyRef.current = "";
    }, 0);
  };

  const handleChangeSize = (next: string) => {
    setSize(next);
    if (next && color) confirmOption(next, color);
  };

  const handleChangeColor = (next: string) => {
    setColor(next);
    if (size && next) confirmOption(size, next);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const addToCart = () => {
    console.log(items);
  };

  const addToBuy = () => {
    console.log(items);
  };

  return (
    <div
      className="fixed inset-0 flex items-end justify-center bg-black/40 z-10"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-[640px] bg-white border-t-2 flex flex-col h-full shadow-lg rounded-tl-2xl rounded-tr-2xl"
        initial={{ translateY: "100%" }}
        animate={{ translateY: isOpen ? "0%" : "100%" }}
        exit={{ translateY: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ height: "60vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex flex-col gap-2">
          <DropDownSelect option="size" value={size} onChange={handleChangeSize} />
          <DropDownSelect option="color" value={color} onChange={handleChangeColor} />
        </div>

        {items.length > 0 && (
          <>
            <div className="flex flex-col gap-4 px-0 overflow-auto">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onChangeCount={(nextCount) =>
                    setItems((prev) =>
                      prev.map((it) =>
                        it.id === item.id ? { ...it, count: nextCount } : it
                      )
                    )
                  }
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>

            <div className="flex justify-between p-4">
              <p>총 금액</p>
              <p className="text-xl text-blue-500">{totalPrice.toLocaleString()}원</p>
            </div>

            <div className="mt-auto flex gap-2 w-full px-4 py-2">
              <button
                onClick={addToCart}
                className="flex-1 rounded-2xl text-sm text-white font-semibold bg-black hover:bg-gray-700 transition-colors duration-300 py-2"
              >
                장바구니
              </button>
              <button
                onClick={addToBuy}
                className="flex-1 rounded-2xl text-sm bg-blue-400 text-white font-semibold hover:bg-blue-500 transition-colors duration-300 py-2"
              >
                바로구매
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default BottomSheet;
