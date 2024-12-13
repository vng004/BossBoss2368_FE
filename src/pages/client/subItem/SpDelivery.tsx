import { Helmet } from "react-helmet"
import { getTitleTab } from "../../../contants/client"
import { motion } from 'framer-motion';

const SpDelivery = () => {
    return (
        <motion.div
            className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto space-y-3 text-gray-700"
            initial={{ opacity: 0, y: 50 }
            } // Bắt đầu từ mờ và dịch xuống
            animate={{ opacity: 1, y: 0 }} // Chuyển dần đến rõ ràng và vị trí gốc
            transition={{ duration: 1 }} // Thời gian của hiệu ứng
        >
            <Helmet>
                <title>{getTitleTab('Hướng dẫn giao nhận')}</title>
            </Helmet>
            <h1 className="text-3xl text-[#1c2434] font-semibold">Hướng dẫn giao nhận</h1>
            <p>BossBoss2368 đang áp dụng hình thức giao nhận dưới đây :</p>
            <p className="text-xl text-[#1c2434] font-semibold">Giao nhận qua dịch vụ chuyển phát</p>
            <p>- Khi giao hàng chúng tôi cũng liên hệ ,fax/email lại biên bản giao hàng ghi rõ hàng hoá, số lượng, qui cách chủng loại xác nhận với người mua, tên, số điện thoại đơn vị giao nhận hàng để người mua hàng tiện liên hệ nhận hàng trong trường hợp hàng đến chậm. </p>
            <p>- Chúng tôi tiến hành đóng dấu, niêm phong sản phẩm để Quý khách tiện kiểm tra khi nhận hàng, dễ dàng cho Quý khách hàng có thể kiểm tra và chứng minh rằng hàng không bị thay đổi nội dung khi vận chuyển, đồng thời thông báo cho người mua thời gian dự kiến hàng sẽ tới tay người nhận hàng, như vậy người mua hàng sẽ yên tâm rằng hàng hoá sắp được giao và chuẩn bị, thu xếp nhận hàng sớm hoặc thông báo cho người nhận hàng thời gian giao hàng và chủng loại hàng hóa (đối với hàng hóa biếu, tặng,….)</p>
            <p>- Quý khách vui lòng trực tiếp kiểm tra kỹ hàng hoá ngay khi nhận hàng từ người chuyển phát hàng hoá, nếu có vấn đề liên quan tới vấn đề chủng loại, chất lượng, số lượng hàng hoá không đúng như trong đơn đặt hàng, niêm phong đã bị thay đổi, Quý khách cần lập biên bản ngay khi nhận hàng với đơn vị hoặc người chuyển phát và thông báo ngay cho Bike2School để cùng phối hợp đơn vị chuyển phát hàng hóa xử lý. </p>
            <p>
                - Khi đặt hàng, Quý khách vui lòng điền đầy đủ và chính xác các thông tin cần thiết theo yêu cầu để tạo điều kiện thuận lợi cho chúng tôi trong việc cung cấp hàng hóa và nhận thanh toán nhanh chóng. BossBoss2368 có quyền kiểm tra các thông tin này và có quyền từ chối đăng kí tài khoản không xác định rõ danh tính cũng như hủy bỏ các đơn đặt hàng không rõ ràng, chúng tôi cũng không chịu trách nhiệm đối với những trường hợp giao hàng chậm trễ hay thất lạc vì các thông tin do Quý khách cung cấp không chính xác.
            </p>
            <p>Trân trọng cảm ơn quý khách đã yêu qúy tin tưởng BossBoss2368!</p>
        </motion.div >

    )
}

export default SpDelivery