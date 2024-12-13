import { CheckOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { motion } from "framer-motion";
import { CircleCheckBig, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../../api";
import { fb, getTitleTab, zl } from "../../../contants/client";
import { CartContext, CartContextType } from "../../../contexts/CartContext";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import { Product } from "../../../interface/products";
import { CartItem } from "../../../reducers/cartReducers";
import ProductHot from "./ProductHot";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [size, setSize] = useState<string>("");
  const [attemptedToAdd, setAttemptedToAdd] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, totalQuantity } = useContext(
    CartContext
  ) as CartContextType;
  const [product, setProduct] = useState<Product | null>(null);
  const { formatPrice, state } = useContext(
    ProductContext
  ) as ProductContextType;
  const [isModal, setIsModal] = useState(false);
  const [addData, setAddData] = useState<CartItem>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await instance.get(`/products/slug/${slug}`);
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [slug]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSize = (selectedSize: string) => {
    setSize(selectedSize);
  };

  const handleAddToCart = () => {
    window.scrollTo(0, 0);
    setAttemptedToAdd(true);

    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        if (selectedColorDetails && size) {
          addToCart(product, quantity, size, selectedColorDetails.color, false);
          const data = {
            product,
            color: selectedColorDetails.color,
            image: selectedColorDetails.image as string,
            quantity,
            size,
            isAccessory: false,
          };
          setAddData(data);
          setIsModal(true);
        }
      } else {
        if (selectedColorDetails) {
          addToCart(product, quantity, size, selectedColorDetails.color, false);
          const data = {
            product,
            color: selectedColorDetails.color,
            image: selectedColorDetails.image as string,
            quantity,
            size,
            isAccessory: false,
          };
          setAddData(data);
          setIsModal(true);
        }
      }
    }
    setTimeout(() => {
      setIsModal(false);
    }, 6666);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const handleColorClick = (index: number) => setSelectedColor(index);

  const selectedColorDetails = product?.colors[selectedColor];
  const discountPrice = formatPrice(
    Number(selectedColorDetails?.discountPrice) || 0
  );
  const price = formatPrice(Number(selectedColorDetails?.price) || 0);

  const tabsItems = [
    {
      key: "1",
      label: <p className="text-lg">Mô tả sản phẩm</p>,
      children: `${product?.description}` ? (
        <div className="flex flex-wrap flex-col gap-10">
          <p className="font-medium text-[16px] text-[#4A4A4A]">
            {product?.description}
          </p>
          <div>
            {product?.images &&
              product.images.length > 0 &&
              product.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Product image ${index}`}
                  className="w-[80%] mx-auto"
                />
              ))}
          </div>
        </div>
      ) : (
        <p className="text-[17px]">Không có mô tả sản phẩm</p>
      ),
    },
    {
      key: "2",
      label: <p className="text-lg">Chính sách bảo hành</p>,
      children: (
        <div className=" text-[16px] text-[#4A4A4A]">
          <p className="font-medium  mb-2">
            Chế độ bảo hành sản phẩm phẩm 1 năm
          </p>
          <div>
            <p>Điều kiện bảo hành:</p>
            <p>- Trường hợp xe xuống cấp do thiếu bảo trì tốt.</p>
            <p>
              - Phụ tùng, thiết bị hư hỏng do tai nạn, va chạm, bóp méo, biến
              dạng. trầy sước sơn , rỉ két …
            </p>
            <p>
              - Hư hỏng do thiên tai, hỏa hoạn, sử dụng nguồn điện không ổn định
              hoặc do vận chuyển không đúng quy cách..
            </p>
            <p>
              - Không bảo hành các linh kiện có tính hao mòn tự nhiên: sên, dây
              đề, dây phanh, má phanh, bề mặt sơn, tem xe hoặc các chi tiết thẫm
              mỹ khác.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const relatedProduct = state.products
    .filter((p) => p.brandId === product?.brandId && p._id !== product?._id)
    .slice(0, 4);

  return (
    <div className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto relative">
      <Helmet>
        <title>{getTitleTab("Chi Tiết Sản Phẩm")}</title>
      </Helmet>
      {isModal && addData && (
        <div className="fixed top-0 md:top-30 lg:top-27 right-0 bg-white shadow-2xl z-50 w-full md:w-[450px] p-6 rounded-b-lg space-y-10 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-[16px] md:text-lg">
              <CircleCheckBig size={22} className="text-green-500" />
              <p className="text-gray-800 font-semibold">
                Thêm vào giỏ hàng thành công!
              </p>
            </div>
            <X
              className="cursor-pointer hover:scale-110 transition-transform duration-200 text-gray-600"
              onClick={closeModal}
            />
          </div>

          <div className="flex gap-4">
            <img
              src={addData.image as string}
              alt=""
              className="w-[116px] md:w-[136px] rounded-md"
            />
            <div className="text-gray-700 text-sm">
              <p className="font-medium text-black text-[16px] line-clamp-2 mb-3">
                {addData.product?.title}
              </p>
              <div className="flex items-center gap-1 text-[16px]">
                {addData.color && <p>Màu: {addData.color}</p>}
                {addData.color && addData.size && <p>/</p>}
                {addData.size && <p>{addData.size}</p>}
              </div>
              <p>Số lượng: {addData.quantity}</p>
            </div>
          </div>

          <div className="w-full text-center">
            <Link
              to="/gio-hang"
              className="block py-3 border border-[#ef4d38] rounded-full text-[#ef4d38] bg-white hover:bg-[#ef4d38] hover:text-white transition-colors duration-200"
            >
              Xem giỏ hàng ({totalQuantity})
            </Link>
          </div>
        </div>
      )}

      <div className="border-b-2 mb-2">
        <p className="text-xl md:text-[30px] pb-1 md:pb-2">{product?.title}</p>
      </div>
      <div className="flex flex-wrap justify-between mb-20 w-full">
        <div className="mb-4 md:mb-10">
          <img
            src={selectedColorDetails?.image as string}
            alt={product?.title}
            className="w-full lg:max-w-[666px] mx-auto rounded-md"
          />
        </div>
        <div className="space-y-6 w-full lg:w-[500px]">
          <form className="space-y-6">
            <div className="space-y-2 md:space-y-5">
              <div>
                {discountPrice !== price ? (
                  <div className="flex flex-wrap-reverse items-center gap-x-4">
                    <p className="text-2xl md:text-[34px] font-semibold text-[#ef4d38]">
                      {discountPrice}
                    </p>
                    <del className="text-gray-500 text-lg md:text-xl lg:text-[16px]">
                      {price}
                    </del>
                  </div>
                ) : (
                  <p className="text-2xl md:text-[34px] font-semibold text-[#ef4d38]">
                    {discountPrice}
                  </p>
                )}
              </div>
              {(product?.salesCount as number) > 0 && (
                <p className="text-[16px]">
                  Đã bán:{" "}
                  <span className="font-semibold text-[#ef4d38]">
                    {product?.salesCount}
                  </span>
                </p>
              )}
              <div className="flex items-center gap-1 text-[16px]">
                <p>Tình trạng:</p>
                <CheckOutlined className=" text-[#30BD57] text-[12px] " />
                <p className="text-[#30BD57]">Còn hàng</p>
              </div>

              {product?.colors && product?.colors.length > 1 && (
                <div className="flex items-center gap-4 text-[16px]">
                  <p>Màu sắc:</p>
                  <div className="flex flex-wrap gap-4">
                    {product?.colors.map((c, index) => (
                      <div
                        key={index}
                        className={`p-[1px] flex border-2 border-dashed rounded-lg cursor-pointer 
                                    ${
                                      selectedColor === index
                                        ? "border-[#ef4d38] text-white"
                                        : "hover:border-[#ef4d38]"
                                    }`}
                        onClick={() => handleColorClick(index)}
                      >
                        <div>
                          <img
                            src={c.image as string}
                            alt={c.color}
                            className="w-15 rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-y-3 items-center gap-x-10 lg:block">
                {product?.sizes && product?.sizes.length > 1 && (
                  <div className="flex flex-wrap items-center gap-4 text-[16px]">
                    <p>Kích thước:</p>
                    {product?.sizes.map((sizeOption) => (
                      <button
                        key={sizeOption}
                        type="button"
                        className={`w-16 md:w-19 md:mr-3 h-10 border rounded-lg hover:border-[#1c2434] ${
                          size === sizeOption
                            ? "bg-[#1c2434] text-white"
                            : "hover:border focus:border-[#1c2434]"
                        } ${
                          !size && attemptedToAdd
                            ? "border-2 border-[#ef4d38] text-[#ef4d38]"
                            : ""
                        }`}
                        onClick={() => handleSize(sizeOption)}
                      >
                        {sizeOption}
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-[16px] flex items-center gap-4 lg:mt-4">
                  <p>Số lượng:</p>
                  <div className="flex justify-between items-center w-[130px] border-2 rounded-lg">
                    <Button
                      onClick={decrementQuantity}
                      type="text"
                      icon={<MinusOutlined />}
                    />
                    <p>{quantity}</p>
                    <Button
                      onClick={incrementQuantity}
                      type="text"
                      icon={<PlusOutlined />}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full h-14 custom-button rounded-full`}
            >
              Thêm vào giỏ hàng
            </button>
          </form>

          <div className="w-full space-y-2 border-2 border-green-500 p-4 rounded-xl">
            <p className="font-bold text-green-500">
              Chính sách bảo hành & CSKH
            </p>
            <div className="text-[14px]">
              <div>
                <span className="text-green-500 text-lg">•</span>
                <b className="text-[13px]"> FREE SHIP</b> toàn quốc, giao hàng
                nhanh đảm bảo
              </div>
              <div>
                <span className="text-green-500 text-lg">•</span> Bảo hành 12
                tháng
              </div>
            </div>
          </div>
          <div className="w-full lg:mt-6 space-y-4 border-2 rounded-lg p-4">
            <p className="text-[#ef4d38] font-bold">Hỗ trợ khách hàng</p>
            <p className="text-[#ef4d38] font-bold">
              Chuyên phân phối, sỉ lẻ xe đạp thể thao và phụ kiện xe đạp giá rẻ
              nhất thị trường
            </p>
            <div className="flex flex-wrap items-center space-x-2">
              <div className="flex items-center gap-2">
                <p className="text-[#ef4d38] text-lg">•</p>
                <p>Gọi ngay để được tư vấn: </p>
              </div>
              <Link
                to="tel:0938131165"
                className="hover:text-[#ff4667] text-green-500 font-semibold text-lg transition-transform transform hover:scale-110"
              >
                0938131165
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2">
                <p className="text-[#ef4d38] text-lg">•</p>
                <p>Liên hệ với chúng tôi:</p>
              </div>
              <Link to="https://www.facebook.com/profile.php?id=100037761937210">
                <img
                  src={fb}
                  alt=""
                  className="w-[46px] h-[46px] transition-transform transform hover:scale-110"
                />
              </Link>
              <Link to="https://zalo.me/0938131165">
                <img
                  src={zl}
                  alt=""
                  className="w-[46px] h-[46px] transition-transform transform hover:scale-110"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-y-10 justify-between items-start">
        <Tabs
          defaultActiveKey="1"
          items={tabsItems}
          className="w-full md:w-[58%] lg:w-[66%]"
        />
        <div className="w-full md:w-[38%] lg:w-[26%]">
          <ProductHot />
        </div>
      </div>
      <div className="mt-30">
        <p className="text-3xl mb-4 border-b pb-2">Các sản phẩm liên quan</p>
        <div className="flex flex-wrap justify-between">
          {relatedProduct.map((product) => {
            const discountPercentages = product.colors
              .map((c) => c.discountPercentage)
              .filter((percentage) => percentage > 0);
            const maxDiscountPercentage = Math.max(...discountPercentages, 0);
            const price = product.colors[0]?.price;
            const discountPrice = product.colors[0]?.discountPrice;
            return (
              <Link key={product.slug} to={`/xe-dap-the-thao/${product.slug}`}>
                <div className="transition-transform lg:hover:shadow-lg duration-300 ease-in-out transform lg:hover:-translate-y-2 w-[163px] md:w-[240px] lg:w-[310px] mb-6 lg:p-3">
                  <div className="relative">
                    <div className="rounded-br-[20px] rounded-tl-[20px] overflow-hidden">
                      <motion.img
                        src={product.colors[0].image as string}
                        className="w-full h-full"
                        alt={product.title}
                        whileHover={{ scale: 1.09 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                    {maxDiscountPercentage > 0 && (
                      <p className="absolute bottom-0 right-0 bg-[#ef4d38] text-white w-15 h-5 md:w-16 md:h-6 flex justify-center items-center font-medium text-sm md:text-[16px] rounded-br-[20px] rounded-tl-[20px]">
                        - {Math.round(maxDiscountPercentage)}%
                      </p>
                    )}
                  </div>
                  <div className="space-y-1 md:space-y-2 mx-auto text-[16px] md:text-[17px] mt-2">
                    <div>
                      <p className="h-12 line-clamp-2 mb-3">{product.title}</p>
                      <p className="text-xs md:text-sm text-gray-600">
                        Màu sắc: {product.colors.length}
                      </p>
                    </div>
                    <div className="border-t-2 pt-1 md:pt-4 text-[17px] md:text-[22px]">
                      {discountPrice !== price ? (
                        <div className="flex flex-wrap-reverse md:justify-between items-center gap-x-10">
                          <p className="text-[#ef4d38] font-semibold">
                            {formatPrice(discountPrice || 0)}
                          </p>
                          <del className="text-gray-400 text-xs md:text-[16px]">
                            {formatPrice(price || 0)}
                          </del>
                        </div>
                      ) : (
                        <p className="text-[#ef4d38] font-semibold">
                          {formatPrice(discountPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
