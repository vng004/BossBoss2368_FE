import { Helmet } from "react-helmet"
import { getTitleTab } from "../../../contants/client"
import { motion } from 'framer-motion';

const Return = () => {
    return (
        <motion.div
            className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto space-y-3 text-gray-700"
            initial={{ opacity: 0, y: 50 }
            } // Bắt đầu từ mờ và dịch xuống
            animate={{ opacity: 1, y: 0 }} // Chuyển dần đến rõ ràng và vị trí gốc
            transition={{ duration: 1 }} // Thời gian của hiệu ứng
        >
            <Helmet>
                <title>{getTitleTab('Chính sách đổi trả')}</title>
            </Helmet>
            <h1 className="text-3xl text-[#1c2434] font-semibold">Chính sách đổi trả</h1>
            <p>Thời gian áp dụng: tính từ thời điểm mua hàng</p>
            <p className="text-xl text-[#1c2434] font-semibold">a) Đối tượng áp dụng</p>
            <p>- Tất cả các khách hàng mua sản phẩm xe đạp tại hệ thống xe đạp BossBoss2368</p>
            <p>- Xe đổi lỗi trong vòng 30 ngày với các lỗi được xác định do nhà sản xuất</p>
            <p>Trường hợp: Cửa hàng giao sai, nhầm mẫu xe không đúng khách hàng yêu cầu</p>
            <p>- Xe được kiểm tra, đổi mới nếu phát hiện giao không đúng màu, đúng size</p>
            <p className="text-xl text-[#1c2434] font-semibold">b) Điều kiện đổi trả</p>
            <p>- Sản phẩm được xác định bị lỗi kỹ thuật, nhầm sản phẩm bởi BossBoss2368 và nhà sản xuất.</p>
            <p>- Sản phẩm nhận lại phải còn nguyên vẹn và đầy đủ các phụ kiện kèm theo, quà khuyến mãi (nếu có)…</p>
            <p>- Sản phẩm nhận lại không bị lỗi hình thức (trầy xước, vỡ, móp méo, ố vàng…)</p>
            <p className="text-xl text-[#1c2434] font-semibold">c) Quy trình đổi hàng</p>
            <p>- Khách hàng liên hệ trực tiếp với BossBoss2368</p>
            <p>
                - Sau khi xác nhận tình trạng với nội dung hàng hóa trong phạm vi điều kiện đổi hàng, sẽ được thực hiện đúng quy định của BossBoss2368
            </p>
            <p>Trân trọng cảm ơn quý khách đã yêu qúy tin tưởng BossBoss2368!</p>
        </motion.div >
    )
}

export default Return