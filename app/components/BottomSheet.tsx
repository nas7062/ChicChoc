import { motion } from "framer-motion";

const BottomSheet = ({ isOpen = false, onClose }: { isOpen: boolean, onClose: () => void }) => {

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-end justify-center bg-black/40 bg-opacity-50 z-50"
      onClick={onClose} // 배경 클릭 시 바텀 시트 닫기
    >
      {/* BottomSheet 컴포넌트 */}
      <motion.div
        className="w-full max-w-[640px] bg-white border-t-2 shadow-lg rounded-tl-2xl rounded-tr-2xl"
        initial={{ translateY: "100%" }}
        animate={{ translateY: isOpen ? "0%" : "100%" }}
        exit={{ translateY: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ height: "60vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          
        </div>
      </motion.div>
    </div>
  );
};

export default BottomSheet;
