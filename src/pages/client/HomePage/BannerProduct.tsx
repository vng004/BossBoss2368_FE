import { Link } from "react-router-dom"
import { accessory, bike } from "../../../contants/client"
import { easeInOut, motion, useInView } from 'framer-motion';
import { useRef } from "react";

const BannerProduct = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  return (
    <motion.div
      initial={{ y: 70, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: easeInOut }}
      ref={ref} className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto space-y-20 mt-6 md:mt-20">
      <div className="flex flex-wrap gap-y-4 justify-between">
        <Link to={'/xe-dap-the-thao'} className="relative md:w-[46%] lg:w-[50%] border rounded-md border-[#ef4d38]">
          <img src={bike} alt="" className="w-full h-full object-cover rounded-md" />
          <p className="text-xl font-bold absolute bottom-4 left-4 text-white bg-[#ef4d38] px-4 py-2 rounded-lg">XE ĐẠP</p>
        </Link>
        <p className="text-xl lg:text-2xl text-gray-700 md:w-[42%]">
          Khám phá những chiếc xe đạp chất lượng cao của chúng tôi, được thiết kế để mang đến trải nghiệm đi xe thoải mái và hiệu suất tối ưu. Chúng tôi tự hào mang đến cho bạn sự kết hợp hoàn hảo giữa công nghệ hiện đại và thiết kế tinh tế, phù hợp với mọi nhu cầu sử dụng. BossBoss2368 luôn đồng hành cùng bạn.
        </p>
      </div>

      <div className="flex flex-wrap-reverse gap-y-4 justify-between">
        <p className="text-xl lg:text-2xl text-gray-700 md:w-[42%]">
          Chúng tôi cung cấp một loạt các phụ kiện đi kèm, từ mũ bảo hiểm đến giày thể thao, giúp bạn tăng cường trải nghiệm và bảo vệ bản thân trong mỗi hành trình. Đừng quên ghé thăm cửa hàng để tìm kiếm những món đồ cần thiết cho chuyến đi của bạn! BossBoss2368 luôn đồng hành cùng bạn.
        </p>
        <Link to={'/phu-kien-xe-dap'} className="relative md:w-[46%] lg:w-[50%] border rounded-md border-[#ef4d38]">
          <img src={accessory} alt="" className="w-full h-full object-cover rounded-md" />
          <p className="text-xl font-bold absolute bottom-4 right-4 text-white bg-[#ef4d38] px-4 py-2 rounded-lg">PHỤ KIỆN</p>
        </Link>
      </div>

    </motion.div>

  )
}

export default BannerProduct