import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { getTitleTab } from '../../../contants/client';

const SpPay = () => {
    return (
        <motion.div
            className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto space-y-3 text-gray-700"
            initial={{ opacity: 0, y: 50 }
            } // Bắt đầu từ mờ và dịch xuống
            animate={{ opacity: 1, y: 0 }} // Chuyển dần đến rõ ràng và vị trí gốc
            transition={{ duration: 1 }} // Thời gian của hiệu ứng
        >
            <Helmet>
                <title>{getTitleTab('Hướng dẫn thanh toán')}</title>
            </Helmet>
            <h1 className="text-3xl text-[#1c2434] font-semibold">Hướng dẫn thanh toán</h1>
            <p>BossBoss2368 chỉ áp dụng 01 hình thức thanh toán: Thanh toán COD</p>
            <p className="text-xl text-[#1c2434] font-semibold">-Thanh toán trả sau (COD)</p>
            <p>+ Là hình thức khách hàng thanh toán tiền mặt trực tiếp cho nhân viên vận chuyển khi nhận hàng.</p>
            <p>+ Khi hàng được chuyển giao đến quý khách, xin vui lòng hoàn tất việc thanh toán và ký xác nhận với nhân viên giao hàng trước, sau đó quý khách nhận hàng và kiểm tra sau. Nếu sản phẩm có bất kỳ lỗi hay khiếm khuyết nào không đúng ý muốn, quý khách thực hiện quy trình đổi hàng. Quý khách vui lòng giữ lại biên lai vận chuyển để xác minh ngày nhận hàng và thời gian đổi hàng (không quá 14 ngày kể từ khi nhận hàng).</p>
            <div className="flex flex-wrap">
                <p className="text-[#f37441] font-semibold">Lưu ý: </p><span>BossBoss2368 không nhận cọc tiền trước</span>
            </div>
            <p>Trân trọng cảm ơn quý khách đã yêu qúy tin tưởng BossBoss2368!</p>
        </motion.div >
    );
}

export default SpPay;
