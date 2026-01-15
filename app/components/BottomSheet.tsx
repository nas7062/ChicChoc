"use client"
import { motion } from "framer-motion";
import DropDownSelect from "./DropDownSelect";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";


export type CartOptionItem = {
  id: string;
  size: string;
  color: string;
  count: number;
};

const BottomSheet = ({ isOpen = false, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [items, setItems] = useState<CartOptionItem[]>([]);
  const totalPrice = items.reduce((prev, item) => prev + item.count * 63000, 0);
  const canAdd = !!size && !!color;

  const confirmOption = () => {
    if (!canAdd) return;

    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), size: size!, color: color!, count: 1 },
    ]);

    setSize('');
    setColor('');
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };


  const addToCart = () => {
    if (!canAdd) return;

    const payload = { size, color };
    console.log(payload);
  };

  const addToBuy = () => {
    if (!canAdd) return;

    const payload = { size, color };
    console.log(payload);
  };
  useEffect(() => {
    if (size && color) confirmOption();
  }, [size, color]);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-end justify-center bg-black/40 bg-opacity-50 z-10"
      onClick={onClose} // 배경 클릭 시 바텀 시트 닫기
    >
      {/* BottomSheet 컴포넌트 */}
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
          <DropDownSelect option="size" value={size} onChange={setSize} />
          <DropDownSelect option="color" value={color} onChange={setColor} />
        </div>

        {
          items.length > 0 && <>
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
            <div>
              <div className="flex justify-between p-4">
                <p>총 금액</p>
                <p className="text-xl text-blue-500">{totalPrice.toLocaleString()}원</p>
              </div>
            </div>

            <div className="mt-auto flex  gap-2 w-full px-4 py-2">
              <button onClick={addToCart} className="flex-1 rounded-2xl text-sm text-white font-semibold  bg-black cursor-pointer hover:bg-gray-700 transition-colors duration-300 py-2">장바구니</button>
              <button onClick={addToBuy} className="flex-1 rounded-2xl text-sm bg-blue-400 text-white font-semibold cursor-pointer hover:bg-blue-500 transition-colors duration-300 py-2">바로구매</button>
            </div>
          </>
        }

      </motion.div>

    </div>
  );
};

export default BottomSheet;
