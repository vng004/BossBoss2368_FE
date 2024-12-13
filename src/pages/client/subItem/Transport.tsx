import { Helmet } from "react-helmet"
import { getTitleTab } from "../../../contants/client"
import { motion } from 'framer-motion';

const Transport = () => {
    return (
        <motion.div
            className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto space-y-3 text-gray-700"
            initial={{ opacity: 0, y: 50 }
            } // Bắt đầu từ mờ và dịch xuống
            animate={{ opacity: 1, y: 0 }} // Chuyển dần đến rõ ràng và vị trí gốc
            transition={{ duration: 1 }} // Thời gian của hiệu ứng
        >
            <Helmet>
                <title>{getTitleTab('Chính sách vận chuyển')}</title>
            </Helmet>
            <h1 className="text-3xl text-[#1c2434] font-semibold">Chính sách vận chuyển</h1>
            <p className="text-xl text-[#1c2434] font-semibold">a) Đối tượng áp dụng</p>
            <p>Tất cả các khách hàng mua sản phẩm xe đạp tại hệ thống xe đạp BossBoss2368</p>
            <p className="text-xl text-[#1c2434] font-semibold">b) Phương thức giao hàng</p>
            <p>Miễn phí vận chuyển cho tất cả các đơn hàng</p>
            <p className="text-xl text-[#1c2434] font-semibold">c) Thời gian giao hàng</p>
            <p>- Trước khi vận chuyển, BossBoss2368 sẽ liên lạc với Quý khách hàng để hẹn thời gian, địa điểm cụ thể để giao hàng cho Quý khách hàng.</p>
            <p>
                - Trong một số trường hợp khách quan BossBoss2368 có thể giao hàng chậm trễ do những điều kiện bất khả kháng như thời tiết xấu, điều kiện giao thông không thuận lợi, xe hỏng hóc trên đường giao hàng, trục trặc trong quá trình xuất hàng.
            </p>
            <p>
                - Trong thời gian chờ đợi nhận hàng, Quý khách có bất cứ thắc mắc gì về thông tin vận chuyển xin vui lòng liên hệ hotline của chúng tôi để nhận trợ giúp.
            </p>
        </motion.div >
    )
}

export default Transport