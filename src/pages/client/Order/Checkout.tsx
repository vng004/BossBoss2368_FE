import { EnvironmentOutlined, LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "antd";
import { motion } from "framer-motion";
import { ChevronLeft, Dot, HandCoins, Package2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getTitleTab, logo } from "../../../contants/client";
import { CartContext, CartContextType } from "../../../contexts/CartContext";
import { OrderContext, OrderContextType } from "../../../contexts/OrderContext";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import { Order } from "../../../interface/order";
import { CartItem } from "../../../reducers/cartReducers";
import { OrderSchema } from "../../../utils/validation";
import "../../../scss/checkout.scss";
const { Option } = Select;

const Checkout = () => {
  const { state, checkout, totalQuantity } = useContext(
    CartContext
  ) as CartContextType;
  const {
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  } = useContext(OrderContext) as OrderContextType;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    resetField,
  } = useForm<Order>({ resolver: zodResolver(OrderSchema) });
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  const [touchedFields, setTouchedFields] = useState({
    phone: false,
    address: false,
    name: false,
    email: false,
    description: false,
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (state.products.length === 0) {
      nav("/");
    }
  }, [totalQuantity, nav]);

  const onSubmit = async (data: Order) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 66);
    });
    const province =
      provinces.find((p) => Number(p.id) === Number(selectedProvince))
        ?.full_name || "";
    const district =
      districts.find((d) => Number(d.id) === Number(selectedDistrict))
        ?.full_name || "";
    const ward =
      wards.find((w) => Number(w.id) === Number(selectedWard))?.full_name || "";

    const orderData = {
      ...data,
      shippingDetails: {
        ...data.shippingDetails,
        address: {
          ...data.shippingDetails.address,
          province: province,
          district: district,
          ward: ward,
        },
      },
    };
    try {
      await checkout(orderData, state.cartId);
      nav(`/thanh-toan/${state.cartId}/cam-on`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  type OptionType = {
    children: string;
    value: string;
  };

  const filterOption = (input: string, option?: OptionType) => {
    if (!option || typeof option.children !== "string") return false;
    return option.children.toLowerCase().includes(input.toLowerCase());
  };
  return (
    state.products && (
      <div>
        <Helmet>
          <title>{getTitleTab("Thanh Toán Đơn Hàng")}</title>
        </Helmet>
        <div className="lg:hidden flex justify-between items-center shadow-lg lg:shadow-none fixed lg:relative p-1 px-4 w-full top-0  bg-white z-1">
          <img src={logo} alt="logo" className="w-[66px] md:w-[86px]" />
          <Link to="/gio-hang" className="text-lg md:text-xl">
            <motion.div
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="flex items-center gap-3"
            >
              <ChevronLeft /> <p>Quay lại</p>
            </motion.div>
          </Link>
        </div>

        <div className="mt-[-100px] lg:mt-[-156px] mb-3 md:mb-17 lg:mb-30 max-w-[768px] md:max-w-[1024px] p-4 lg:p-0 lg:max-w-[1280px] mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap justify-center gap-x-20"
          >
            <div className="space-y-6 w-full lg:w-[600px]">
              <div className="flex items-center justify-between  mb-10 pb-3 lg:pb-0">
                <img
                  src={logo}
                  alt="logo"
                  width={100}
                  className="hidden lg:block"
                />
                <p className="text-2xl uppercase">Thông Tin Đặt Hàng</p>
              </div>
              <div className="flex flex-wrap gap-y-4 justify-between ">
                <div className="flex w-full md:w-[49%] items-center justify-between border h-[60px] rounded-lg p-4 border-gray-400">
                  <div className="flex items-center gap-3">
                    <Package2 size={18} />
                    <span>Giao hàng tận nơi</span>
                  </div>
                  <Dot strokeWidth={5} className="text-green-500" />
                </div>
                <div className="flex w-full md:w-[49%] items-center justify-between border h-[60px] rounded-lg p-4 border-gray-400">
                  <div className="flex items-center gap-3">
                    <EnvironmentOutlined />
                    <span>Việt Nam</span>
                  </div>
                  <Dot strokeWidth={5} className="text-green-500" />
                </div>
              </div>
              <div className="space-y-4">
                <label htmlFor="name" className="mb-2 text-[20px]">
                  Nhập tên và địa chỉ:
                </label>
                <div className=" custom-input-container">
                  <input
                    id="name"
                    type="text"
                    {...register("shippingDetails.name")}
                    className={`input border pl-3  ${
                      errors.shippingDetails?.name && "border-[#ef4d38]"
                    }`}
                    placeholder=""
                    onBlur={() => {
                      setTouchedFields((prev) => ({ ...prev, name: true }));
                    }}
                  />
                  <label
                    htmlFor="name"
                    className={`absolute transition-all ${
                      errors.shippingDetails?.name
                        ? "text-[#ef4d38]"
                        : "text-gray-400 pt-[18px]"
                    }`}
                  >
                    Họ và tên
                  </label>
                  {touchedFields.name &&
                    !errors.shippingDetails?.name &&
                    watch("shippingDetails.name") && (
                      <Dot
                        strokeWidth={5}
                        className="text-green-500 absolute right-4 top-1/2 
                                    transform -translate-y-1/2"
                      />
                    )}
                  {errors.shippingDetails?.name && (
                    <p className="text-[#ef4d38] text-sm mt-1">
                      {errors.shippingDetails.name.message}
                    </p>
                  )}
                </div>

                <div className="custom-input-container">
                  <input
                    id="streetAddress"
                    type="text"
                    {...register("shippingDetails.address.streetAddress", {
                      required: true,
                    })}
                    className={`input border pl-3 ${
                      errors.shippingDetails?.address?.streetAddress &&
                      "border border-[#ef4d38] placeholder-[#ef4d38] "
                    }`}
                    placeholder=""
                    onBlur={() => {
                      setTouchedFields((prev) => ({ ...prev, address: true }));
                    }}
                  />
                  <label
                    htmlFor="streetAddress"
                    className={`absolute transition-all ${
                      errors.shippingDetails?.address?.streetAddress
                        ? "text-[#ef4d38] "
                        : "text-gray-400 pt-[18px]"
                    }`}
                  >
                    Địa chỉ
                  </label>
                  {touchedFields.address &&
                    !errors.shippingDetails?.address?.streetAddress &&
                    watch("shippingDetails.address.streetAddress") && (
                      <Dot
                        strokeWidth={5}
                        className="text-green-500 absolute right-4 top-1/2 
                                    transform -translate-y-1/2"
                      />
                    )}
                  {errors.shippingDetails?.address?.streetAddress && (
                    <p className="text-[#ef4d38] text-sm mt-1">
                      {errors.shippingDetails.address.streetAddress.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-y-4 justify-between">
                  <div className="w-full md:w-[32%] ">
                    <Controller
                      name="shippingDetails.address.province"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="province"
                          value={field.value || ""}
                          onChange={(value) => {
                            field.onChange(value);
                            handleProvinceChange(Number(value));
                            resetField("shippingDetails.address.district");
                            resetField("shippingDetails.address.ward");
                          }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={filterOption}
                          className={`h-[57px] w-full ${
                            errors.shippingDetails?.address?.province && "error"
                          }`}
                        >
                          <Option value="" disabled>
                            Chọn tỉnh/thành
                          </Option>
                          {provinces.map((province) => (
                            <Option key={province.id} value={province.id}>
                              {province.full_name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  </div>

                  <div className="w-full md:w-[32%] ">
                    <Controller
                      name="shippingDetails.address.district"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="district"
                          value={field.value || ""}
                          onChange={(value) => {
                            field.onChange(value);
                            handleDistrictChange(Number(value));
                            resetField("shippingDetails.address.ward");
                          }}
                          disabled={!selectedProvince}
                          showSearch
                          optionFilterProp="children"
                          filterOption={filterOption}
                          className={`h-[57px] w-full   ${
                            errors.shippingDetails?.address?.district && "error"
                          }`}
                        >
                          <Option value="" disabled>
                            Chọn quận/huyện
                          </Option>
                          {districts.map((district) => {
                            return (
                              <Option key={district.id} value={district.id}>
                                {district.full_name}
                              </Option>
                            );
                          })}
                        </Select>
                      )}
                    />
                  </div>

                  <div className="w-full md:w-[32%] ">
                    <Controller
                      name="shippingDetails.address.ward"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="ward"
                          value={field.value || ""}
                          onChange={(value) => {
                            field.onChange(value);
                            handleWardChange(Number(value));
                          }}
                          disabled={!selectedDistrict}
                          showSearch
                          optionFilterProp="children"
                          filterOption={filterOption}
                          className={`h-[57px] w-full ${
                            errors.shippingDetails?.address?.ward && "error"
                          }`}
                        >
                          <Option value="" disabled>
                            Chọn phường/xã
                          </Option>
                          {wards.map((ward) => (
                            <Option key={ward.id} value={ward.id}>
                              {ward.full_name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="phone" className="text-[20px]">
                  Thông tin liên lạc của bạn là gì
                </label>
                <div className="custom-input-container">
                  <input
                    id="phone"
                    type="text"
                    {...register("shippingDetails.phone", {
                      onBlur: () => {
                        setTouchedFields((prev) => ({ ...prev, phone: true }));
                      },
                    })}
                    className={`input border pl-3 ${
                      errors.shippingDetails?.phone &&
                      "border border-[#ef4d38] placeholder-[#ef4d38] hover:border-red-300"
                    }`}
                    placeholder=""
                  />
                  <label
                    htmlFor="phone"
                    className={`absolute transition-all ${
                      errors.shippingDetails?.phone
                        ? "text-[#ef4d38]"
                        : "text-gray-400 pt-[18px]"
                    }`}
                  >
                    Số điện thoại
                  </label>
                  {touchedFields.phone &&
                    !errors.shippingDetails?.phone &&
                    watch("shippingDetails.phone") && (
                      <Dot
                        strokeWidth={5}
                        className="text-green-500 absolute right-4 top-1/2 
                                    transform -translate-y-1/2"
                      />
                    )}
                  {errors.shippingDetails?.phone && (
                    <p className="text-[#ef4d38] text-sm mt-1">
                      {errors.shippingDetails.phone.message}
                    </p>
                  )}
                </div>
                <div className="custom-input-container">
                  <input
                    id="email"
                    type="text"
                    {...register("shippingDetails.email", {
                      onBlur: () => {
                        setTouchedFields((prev) => ({ ...prev, email: true }));
                      },
                    })}
                    className={`input border pl-3`}
                    placeholder=""
                  />
                  <label
                    htmlFor="email"
                    className={`absolute transition-all 
                                    text-gray-400 pt-[18px]`}
                  >
                    Email
                  </label>
                  {touchedFields.email &&
                    !errors.shippingDetails?.email &&
                    watch("shippingDetails.email") && (
                      <Dot
                        strokeWidth={5}
                        className="text-green-500 absolute right-4 top-1/2 
                                    transform -translate-y-1/2"
                      />
                    )}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[20px]">Phương thức thanh toán</label>
                <div className="flex w-full items-center justify-between border h-[60px] rounded-lg p-4 border-gray-400">
                  <div className="flex items-center gap-3">
                    <HandCoins size={18} />
                    <span>Thanh toán khi nhận hàng</span>
                  </div>
                  <Dot strokeWidth={5} className="text-green-500" />
                </div>
              </div>
              <div className="custom-input-container">
                <input
                  id="description"
                  type="text"
                  {...register("description")}
                  placeholder=""
                  className={`input border pl-3`}
                  onBlur={() => {
                    setTouchedFields((prev) => ({
                      ...prev,
                      description: true,
                    }));
                  }}
                />
                <label
                  htmlFor="description"
                  className={`absolute transition-all text-gray-400 pt-[18px]`}
                >
                  Ghi chú
                </label>
                {touchedFields.description &&
                  !errors?.description &&
                  watch("description") && (
                    <Dot
                      strokeWidth={5}
                      className="text-green-500 absolute right-4 top-1/2 
                                    transform -translate-y-1/2"
                    />
                  )}
              </div>

              <div className=" flex-wrap justify-between items-center pt-10 hidden lg:flex">
                <Link to="/gio-hang" className="">
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }}
                    className="flex items-center gap-3"
                  >
                    <ChevronLeft /> <p>Giỏ hàng</p>
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-[66%] h-13 custom-button rounded-lg "
                >
                  {loading && (
                    <span>
                      <LoadingOutlined />
                    </span>
                  )}{" "}
                  Hoàn tất
                </motion.button>
              </div>
            </div>

            <div className="w-full lg:w-auto mt-10 lg:mt-10">
              <div className="flex flex-wrap justify-between lg:block">
                {state.products.map((product: CartItem, index) => {
                  const colorDetails = product.product?.colors.find(
                    (item) => item.color === product.color
                  );
                  const productPrice = formatPrice(
                    Number(colorDetails?.discountPrice || 0) * product.quantity
                  );
                  const isAccessory = product.accessory;
                  const accessoryPrice = formatPrice(
                    Number(isAccessory?.discountPrice || 0) * product.quantity
                  );

                  if (isAccessory) {
                    return (
                      <div key={index} className="flex flex-wrap gap-4 mb-4">
                        <div className="relative w-[120px]">
                          <p className="absolute z-1 top-[-10px] right-[-10px] rounded-full bg-[#ef4d38] text-white h-5 flex justify-center items-center w-5 text-xs ">
                            {product.quantity}
                          </p>
                          <img
                            src={isAccessory.image as string}
                            alt={isAccessory.title}
                            className="rounded-lg relative w-full"
                          />
                        </div>
                        <div className="space-y-1 w-[220px] lg:w-[326px]">
                          <p className="text-[16px]">{isAccessory.title}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-[16px]">{accessoryPrice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex gap-4 mb-4 ">
                        <div className="relative w-[120px]">
                          <p className="absolute z-1 top-[-10px] right-[-10px] rounded-full bg-[#ef4d38] text-white h-5 flex justify-center items-center w-5 text-xs">
                            {product.quantity}
                          </p>
                          <img
                            src={colorDetails?.image as string}
                            alt={product.product?.title}
                            className="rounded-lg relative w-full"
                          />
                        </div>
                        <div className="text-[14px] w-[220px] lg:w-[326px]">
                          <p className="text-[16px] line-clamp-2">
                            {product.product?.title} assa as as s s s sasssss
                          </p>
                          <div className="block lg:flex justify-between items-center">
                            <div className="flex items-center">
                              <p className=" text-gray-600">
                                Màu: {product.color}
                              </p>
                              {product.size && (
                                <p className=" text-gray-600">
                                  {" "}
                                  / Size: {product.size}
                                </p>
                              )}
                            </div>
                            <p className="text-[16px]">{productPrice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div>
                {[
                  { label: "Số lượng", value: totalQuantity },
                  { label: "Tạm tính", value: formatPrice(state.totalPrice) },
                  {
                    label: "Vận chuyển",
                    value: (
                      <p className="flex">
                        <Dot strokeWidth={5} className="text-green-500" />
                        Miễn phí{" "}
                      </p>
                    ),
                  },
                ].map(({ label, value }, index) => (
                  <div key={index} className="flex justify-between pt-2">
                    <span className="text-gray-500">{label}:</span>{" "}
                    <span>{value}</span>
                  </div>
                ))}

                <div className="flex justify-between pt-5 pb-5 border-t-2 mt-5 text-2xl">
                  <span>Tổng tiền:</span>
                  <span className="font-semibold text-[#ef4d38]">
                    {formatPrice(state.totalPrice)}
                  </span>
                </div>
              </div>
              <div className="block lg:hidden">
                <motion.button
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full h-13 custom-button rounded-lg "
                >
                  {loading && (
                    <span>
                      <LoadingOutlined />
                    </span>
                  )}{" "}
                  Hoàn tất
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Checkout;
