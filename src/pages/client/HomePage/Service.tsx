import { ClipboardCheck, Medal, MessagesSquare, Truck } from "lucide-react";
import { easeInOut, motion, useInView } from "framer-motion";
import { useRef } from "react";

const Service = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.2, once: true });
  return (
    <motion.div
      initial={{ y: 46, opacity: 0 }}
      animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: easeInOut }}
      ref={sectionRef}
      className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-0 lg:mt-30"
    >
      <motion.div
        animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: easeInOut }}
        className="flex items-start bg-[#f5f5f5] gap-4 border rounded-lg p-4 text-[#1c2434]"
      >
        <Medal size={30} strokeWidth={1} />
        <div>
          <b>Chất lượng</b>
          <p>Sảm phẩm chính hãng 100%</p>
        </div>
      </motion.div>

      <motion.div
        animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: easeInOut, delay: 0.1 }}
        className="flex items-start bg-[#f5f5f5] gap-4 border rounded-lg p-4 text-[#1c2434]"
      >
        <Truck size={30} strokeWidth={1} />
        <div>
          <b>Giao hàng</b>
          <p>Miễn phí vận chuyển toàn quốc</p>
        </div>
      </motion.div>

      <motion.div
        animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: easeInOut, delay: 0.2 }}
        className="flex items-start bg-[#f5f5f5] gap-4 border rounded-lg p-4 text-[#1c2434]"
      >
        <ClipboardCheck size={36} strokeWidth={1} />

        <div>
          <b>Dịch vụ</b>
          <p>Phân phối sỉ lẻ xe đạp thể thao và phụ kiện xe đạp</p>
        </div>
      </motion.div>

      <motion.div
        animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: easeInOut, delay: 0.3 }}
        className="flex items-start gap-4 bg-[#f5f5f5] border rounded-lg p-4 text-[#1c2434]"
      >
        <MessagesSquare size={30} strokeWidth={1} />
        <div>
          <b>Hotline</b>
          <div>
            <a href="tel:0938131165">Tư vấn, bán hàng: 0938131165</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Service;
