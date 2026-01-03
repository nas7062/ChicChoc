"use client";

import clsx from "clsx";
import { ALargeSmall, BadgePlus, Info, MessageCircleCode, SquareUserRound } from "lucide-react";

const NAV = {
  info: { label: "상품정보", icon: Info },
  size: { label: "사이즈", icon: ALargeSmall },
  review: { label: "리뷰", icon: MessageCircleCode },
  reco: { label: "추천", icon: BadgePlus },
  inquiry: { label: "문의", icon: SquareUserRound },
} as const;

export type TabKey = keyof typeof NAV;

type TabsProps = {
  selected: TabKey;
  onChange: (key: TabKey) => void;
};

export default function Tabs({ selected, onChange }: TabsProps) {
  return (
    <nav className="">
      <ul className="flex justify-around text-xl gap-2 sm:gap-8">
        {Object.entries(NAV).map(([key, v]) => {
          const Icon = v.icon;
          const isActive = selected === key;

          return (
            <li
              key={key}
              className={clsx(
                "relative pb-1 cursor-pointer w-24 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300",
                isActive
                  ? "font-bold after:w-full"
                  : "hover:after:w-full"
              )}
            >
              <button
                type="button"
                onClick={() => onChange(key as TabKey)}
                className="flex items-center gap-2 w-full text-left cursor-pointer"
              >
                <Icon className="w-3 h-3 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-base">{v.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
