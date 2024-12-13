import { Helmet } from "react-helmet"
import { getTitleTab } from "../../../contants/client"
import { motion } from 'framer-motion';

const TermsOfService = () => {
    return (
        <motion.div
            className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto space-y-3 text-gray-700"
            initial={{ opacity: 0, y: 50 }
            } // Bắt đầu từ mờ và dịch xuống
            animate={{ opacity: 1, y: 0 }} // Chuyển dần đến rõ ràng và vị trí gốc
            transition={{ duration: 1 }} // Thời gian của hiệu ứng
        >
            <Helmet>
                <title>{getTitleTab('Điều khoản dịch vụ')}</title>
            </Helmet>
            <div>
                <h1 className="text-3xl text-[#1c2434] font-semibold mb-4">Điều khoản</h1>
                <p className="text-lg text-[#1c2434] mb-6">
                    Chào mừng bạn đến với trang web của chúng tôi! Khi sử dụng dịch vụ và mua sắm tại cửa hàng, bạn đồng ý với các điều khoản sau đây:
                </p>
                <ul className="text-lg text-[#1c2434] list-disc pl-5 mb-6 space-y-2">
                    <li>Thông tin sản phẩm và giá cả có thể thay đổi tùy thời điểm mà không cần báo trước.</li>
                    <li>Cửa hàng cam kết cung cấp sản phẩm chất lượng chính hãng, bảo đảm nguồn gốc rõ ràng.</li>
                    <li>Khách hàng vui lòng kiểm tra hàng hóa trước khi nhận, chúng tôi không chịu trách nhiệm với sản phẩm hỏng do vận chuyển sau khi đã giao thành công.</li>
                    <li>Chính sách đổi trả và hoàn tiền tuân theo quy định hiện hành của cửa hàng. Để biết chi tiết, vui lòng tham khảo phần "Chính sách đổi trả".</li>
                </ul>

                <h1 className="text-3xl text-[#1c2434] font-semibold mb-4 ">Dịch vụ</h1>
                <p className="text-lg text-[#1c2434] mb-6">
                    Chúng tôi không chỉ bán xe đạp và phụ kiện mà còn cung cấp nhiều dịch vụ hỗ trợ khách hàng như sau:
                </p>
                <ul className="text-lg text-[#1c2434] list-disc pl-5 mb-6 space-y-2">
                    <li>
                        <span className="font-semibold">Bán lẻ và sỉ:</span> Chúng tôi cung cấp xe đạp và phụ kiện đa dạng từ các thương hiệu uy tín, đáp ứng nhu cầu của khách hàng cá nhân lẫn các đơn vị kinh doanh.
                    </li>
                    <li>
                        <span className="font-semibold">Lắp ráp theo yêu cầu:</span> Khách hàng có thể đặt xe đạp được lắp ráp và điều chỉnh theo nhu cầu và sở thích cá nhân.
                    </li>
                    <li>
                        <span className="font-semibold">Tư vấn và hướng dẫn:</span> Chúng tôi cung cấp dịch vụ tư vấn miễn phí, giúp khách hàng lựa chọn sản phẩm phù hợp với nhu cầu sử dụng và ngân sách.
                    </li>
                    <li>
                        <span className="font-semibold">Phân phối và nhập sỉ:</span> Với các khách hàng là doanh nghiệp, cửa hàng chúng tôi cung cấp dịch vụ nhập sỉ với giá ưu đãi và hỗ trợ đặc biệt.
                    </li>
                </ul>
            </div>

            <p></p>
        </motion.div >
    )
}

export default TermsOfService