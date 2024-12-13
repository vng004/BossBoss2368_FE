import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Order } from "../../../interface/order";
import { CircleCheckBig } from "lucide-react";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";

const ThankYouPage = () => {
  const [order, setOrderData] = useState<Order | null>(null);
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  useEffect(() => {
    const savedOrderData = localStorage.getItem("orderData");
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    }
  }, []);
  return (
    <div className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:max-w-[1280px] mx-auto mb-20 -mt-40 md:-mt-[100px]">
      <Helmet>
        <title>{getTitleTab("Xe Đạp Thể Thao")}</title>
      </Helmet>
      <div className="text-4xl flex items-center gap-3 mb-4">
        <CircleCheckBig size={46} className="text-green-500" />
        <div className="flex flex-wrap items-center gap-x-2">
          <p>BossBoss2368</p>{" "}
          <p className="text-lg">( Cảm ơn bạn đã đặt hàng )</p>
        </div>
      </div>
      <p className="text-green-500 mb-4 text-xl">Đặt hàng thành công.</p>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-4 text-lg">
        <div className="border-l-2 pl-3">
          <p className="text-gray-500">Mã đơn hàng</p>
          <b>{order?.code}</b>
        </div>
        <div className="border-l-2 pl-3">
          <p className="text-gray-500">Tổng cộng</p>
          <b>{formatPrice(Number(order?.totalPrice))} </b>
        </div>
        <div className="border-l-2 pl-3">
          <p className="text-gray-600">Phương thức thanh toán</p>
          <b>Thanh toán khi nhận hàng</b>
        </div>
      </div>

      <div className="p-3 md:p-10 shadow-md rounded-sm space-y-4">
        <p className="text-2xl">Thông tin vận chuyển</p>
        <div className="space-y-2 text-lg">
          <div className="">
            <span className="text-gray-500">Họ và Tên: </span>
            <span>{order?.shippingDetails.name}</span>
          </div>
          <div className="">
            <span className="text-gray-500">Số điện thoại: </span>
            <span>{order?.shippingDetails.phone}</span>
          </div>
          <div className="">
            <span className="text-gray-500">Địa chỉ: </span>
            <span>
              {" "}
              {`${order?.shippingDetails.address.streetAddress}, ${order?.shippingDetails.address.ward}, ${order?.shippingDetails.address.district}, ${order?.shippingDetails.address.province}`}
            </span>
          </div>
          {order?.description && (
            <div className="">
              <span className="text-gray-500">Ghi chú: </span>
              <span> {order?.description}</span>
            </div>
          )}
          <div className="">
              <span className="text-gray-500">Lưu ý: </span>
              <span> BossBoss2368 sẽ liên hệ lại cho bạn để chốt đơn hàng sau khi bạn đặt hàng</span>
            </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-10">
        <Link to={"/"} className="">
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-[340px] h-13 custom-button rounded-full "
          >
            Trở về trang chủ
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
