import {
  Bike,
  Check,
  CircleCheckBig,
  Earth,
  Network,
  Wrench,
  X,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import {
  AccessoryContext,
  AccessoryContextType,
} from "../../../contexts/AccessoryContext";
import {
  CategoryContext,
  CategoryContextType,
} from "../../../contexts/CategoryContext";
import { BrandContext, BrandContextType } from "../../../contexts/BrandContext";
import { OrderContext, OrderContextType } from "../../../contexts/OrderContext";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";

const Dashboard = () => {
  const [, setLoading] = useState<boolean>(true);
  const { totalDocs: totalP } = useContext(
    ProductContext
  ) as ProductContextType;
  const { totalDocs: totalA } = useContext(
    AccessoryContext
  ) as AccessoryContextType;
  const { state: c } = useContext(CategoryContext) as CategoryContextType;
  const { state: b } = useContext(BrandContext) as BrandContextType;
  const { orders } = useContext(OrderContext) as OrderContextType;

  const orderStatus0 = orders.filter((order) => order.orderStatus === 0).length;
  const orderStatus1 = orders.filter((order) => order.orderStatus === 1).length;
  const orderStatus2 = orders.filter((order) => order.orderStatus === 2).length;
  useEffect(() => {
    setTimeout(() => setLoading(false), 100000);
  }, []);
  return (
    <div>
      <Helmet>
        <title>{getTitleTab("Thống kê tổng hợp")}</title>
      </Helmet>
      <div className="grid grid-cols-4 gap-3 mb-20">
        <div className="rounded-lg  bg-white py-10 p-10 transition-transform transform hover:shadow-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-full">
            <Earth style={{ fontSize: 22, color: "#1E5EFF" }} />
          </div>
          <div className="flex justify-between items-center mt-7">
            <p className="text-[16px] font-medium">Tổng số thương hiệu</p>
            <h4 className="text-title-md font-bold text-[#1c2434]">
              {b.brands.length}
            </h4>
          </div>
        </div>
        <div className="rounded-lg  bg-white py-10 p-10 transition-transform transform hover:shadow-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-full">
            <Network style={{ fontSize: 22, color: "#1E5EFF" }} />
          </div>
          <div className="flex justify-between items-center mt-7">
            <p className="text-[16px] font-medium">Tổng số danh mục</p>
            <h4 className="text-title-md font-bold text-[#1c2434]">
              {c.categories.length}
            </h4>
          </div>
        </div>
        <div className="rounded-lg  bg-white py-10 p-10 transition-transform transform hover:shadow-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-full">
            <Bike style={{ fontSize: 22, color: "#1E5EFF" }} />
          </div>
          <div className="flex justify-between items-center mt-7">
            <p className="text-[16px] font-medium">Tổng số xe đạp</p>
            <h4 className="text-title-md font-bold text-[#1c2434]">{totalP}</h4>
          </div>
        </div>
        <div className="rounded-lg  bg-white py-10 p-10 transition-transform transform hover:shadow-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-full">
            <Wrench style={{ fontSize: 22, color: "#1E5EFF" }} />
          </div>
          <div className="flex justify-between items-center mt-7">
            <p className="text-[16px] font-medium">Tổng số phụ kiện</p>
            <h4 className="text-title-md font-bold text-[#1c2434]">{totalA}</h4>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 ">
        <div className="rounded-lg  bg-white py-10 p-10 transition-transform transform hover:shadow-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-full">
            <X style={{ fontSize: 22, color: "red" }} />
          </div>
          <div className="flex justify-between items-center mt-7">
            <p className="text-[16px] font-medium">
              Tổng đơn hàng chưa xác nhận
            </p>
            <h4 className="text-title-md font-bold text-[#1c2434]">
              {orderStatus0}
            </h4>
          </div>
        </div>
        <div className="rounded-lg  bg-white py-10 p-10 transition-transform transform hover:shadow-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-full">
            <Check style={{ fontSize: 22, color: "#1E5EFF" }} />
          </div>
          <div className="flex justify-between items-center mt-7">
            <p className="text-[16px] font-medium">Tổng đơn hàng đã xác nhận</p>
            <h4 className="text-title-md font-bold text-[#1c2434]">
              {orderStatus1}
            </h4>
          </div>
        </div>
        <div className="rounded-lg  bg-white py-10 p-10 transition-transform transform hover:shadow-xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-full">
            <CircleCheckBig style={{ fontSize: 22, color: "green" }} />
          </div>
          <div className="flex justify-between items-center mt-7">
            <p className="text-[16px] font-medium">Tổng đơn hàng đã hoàn tất</p>
            <h4 className="text-title-md font-bold text-[#1c2434]">
              {orderStatus2}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
