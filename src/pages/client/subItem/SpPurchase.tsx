import { Helmet } from "react-helmet"
import { getTitleTab } from "../../../contants/client"
import { motion } from 'framer-motion';

const SpPurchase = () => {
    return (
        <motion.div
            className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto space-y-3 text-gray-700"
            initial={{ opacity: 0, y: 50 }
            } // Bắt đầu từ mờ và dịch xuống
            animate={{ opacity: 1, y: 0 }} // Chuyển dần đến rõ ràng và vị trí gốc
            transition={{ duration: 1 }} // Thời gian của hiệu ứng
        >
            <Helmet>
                <title>{getTitleTab('Hướng dẫn mua hàng')}</title>
            </Helmet>
            <h1 className="text-3xl text-[#1c2434] font-semibold">Hướng dẫn mua hàng</h1>
            <p className="text-xl text-[#1c2434] font-semibold">Mua hàng online trên website BossBoss2368</p>
            <p>Quý khách muốn mua hàng online làm theo các bước sau đây :</p>
            <p>Bước 1: Truy cập website <b>BossBoss2368</b> và lựa chọn sản phẩm yêu thích để đặt hàng</p>
            <p>Bước 2: Chọn vào sản phẩm muốn mua, màn hình hiển thị ra thông tin về sản phẩm Quý khách muốn mua</p>
            <p>Bước 3: Điền các thông tin liên lạc và địa chỉ của bạn để nhận đơn hàng</p>
            <div className="flex flex-wrap">
                <p className="text-[#f37441] font-semibold">Lưu ý: </p><span>Sau khi nhận được đơn hàng Quý khách gửi, chúng tôi sẽ liên hệ bằng cách gọi điện lại để xác nhận lại đơn hàng và địa chỉ của Quý khách.</span>
            </div>
            <p>Trân trọng cảm ơn quý khách đã yêu qúy tin tưởng BossBoss2368!</p>
        </motion.div >
    )
}

export default SpPurchase