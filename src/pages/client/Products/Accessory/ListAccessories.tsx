import { Checkbox, Drawer, Pagination } from "antd";
import { easeInOut, motion, useInView } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getTitleTab } from "../../../../contants/client";
import {
  AccessoryContext,
  AccessoryContextType,
} from "../../../../contexts/AccessoryContext";
import {
  ProductContext,
  ProductContextType,
} from "../../../../contexts/ProductContext";

const ListAccessories = () => {
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  const {
    currentPage,
    totalPages,
    filterAccessories,
    listAccessories,
    totalDocs,
  } = useContext(AccessoryContext) as AccessoryContextType;
  const [sortPriceRange, setSortPriceRange] = useState<
    | "priceOne"
    | "priceTwo"
    | "priceThree"
    | "priceFour"
    | "priceFive"
    | undefined
  >(undefined);
  const [sortByDate, setSortByDate] = useState<"latest" | undefined>(undefined);
  const [onSale, setOnSale] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.1, once: true });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadProduct = async (
    page: number,
    priceRange:
      | "priceOne"
      | "priceTwo"
      | "priceThree"
      | "priceFour"
      | "priceFive"
      | undefined,
    sortByDate?: "latest" | undefined,
    onSale?: boolean
  ) => {
    setLoading(true);
    window.scrollTo(0, 0);
    await new Promise((resolver) => {
      setTimeout(resolver, 166);
    });
    await filterAccessories(
      page,
      24,
      priceRange,
      sortByDate ? "latest" : undefined,
      onSale
    );
    setLoading(false);
  };

  useEffect(() => {
    loadProduct(currentPage, sortPriceRange, sortByDate, onSale);
  }, [currentPage, sortPriceRange, sortByDate, onSale]);

  const handlePageChange = async (page: number) => {
    loadProduct(page, sortPriceRange, sortByDate, onSale);
  };

  const handlePriceRangeChange = (
    priceRange:
      | "priceOne"
      | "priceTwo"
      | "priceThree"
      | "priceFour"
      | "priceFive"
  ) => {
    setSortPriceRange(priceRange);
  };

  const handleSortByDateChange = (sortByDate?: "latest") => {
    setSortByDate(sortByDate);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto">
      <Helmet>
        <title>{getTitleTab("Phụ Kiện Xe Đạp")}</title>
      </Helmet>
      <div className="mb-4 flex justify-between items-center">
        <div className="">
          <p className="text-xl md:text-2xl">Phụ Kiện Xe Đạp</p>
        </div>
        <button
          onClick={toggleMenu}
          className="w-40 lg:hidden p-2 flex justify-between items-center border rounded-lg"
        >
          <MenuIcon size={30} />
          <p className="text-lg md:text-2xl">Sắp Xếp</p>
        </button>
        <div className="hidden lg:flex items-center gap-2 ">
          <p className="">Sắp xếp:</p>
          <div className="flex items-center gap-2 border p-2 rounded-lg">
            <Checkbox
              checked={sortByDate === "latest"}
              onChange={() => handleSortByDateChange("latest")}
            >
              Mới nhất
            </Checkbox>
            -
            <Checkbox
              checked={onSale}
              onChange={() => {
                setOnSale(!onSale);
                loadProduct(1, sortPriceRange, sortByDate, !onSale);
              }}
            >
              Khuyến mãi
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="hidden lg:block w-[22%] space-y-6">
          <div className="space-y-1">
            <div className="mb-4">
              <p className="border-b-2 font-semibold">Khoảng giá</p>
            </div>
            <Checkbox
              checked={sortPriceRange === "priceOne"}
              onChange={() => handlePriceRangeChange("priceOne")}
            >
              Giá dưới 1.000.000đ
            </Checkbox>
            <Checkbox
              checked={sortPriceRange === "priceTwo"}
              onChange={() => handlePriceRangeChange("priceTwo")}
            >
              1.000.000 - 3.000.000đ
            </Checkbox>
            <Checkbox
              checked={sortPriceRange === "priceThree"}
              onChange={() => handlePriceRangeChange("priceThree")}
            >
              3.000.000 - 6.000.000đ
            </Checkbox>
            <Checkbox
              checked={sortPriceRange === "priceFour"}
              onChange={() => handlePriceRangeChange("priceFour")}
            >
              6.000.000 - 10.000.000đ
            </Checkbox>
            <Checkbox
              checked={sortPriceRange === "priceFive"}
              onChange={() => handlePriceRangeChange("priceFive")}
            >
              Giá trên 10.000.000đ
            </Checkbox>
          </div>
        </div>
        <div className="lg:hidden left-30  absolute">
          <Drawer
            title={<p className="text-lg font-semibold">Sắp xếp</p>}
            placement="left"
            closable={true}
            onClose={() => setIsMenuOpen(false)}
            open={isMenuOpen}
          >
            <div className="space-y-6">
              <div className="flex flex-col gap-2 border p-2 rounded-lg">
                <Checkbox
                  checked={sortByDate === "latest"}
                  onChange={() => handleSortByDateChange("latest")}
                >
                  Mới nhất
                </Checkbox>
                <Checkbox
                  checked={onSale}
                  onChange={() => {
                    setOnSale(!onSale);
                    loadProduct(1, sortPriceRange, sortByDate, !onSale);
                  }}
                >
                  Khuyến mãi
                </Checkbox>
              </div>

              <div>
                <p className="font-semibold border-b-2">Khoảng giá</p>
                <div className="flex flex-col mt-2 gap-2">
                  <Checkbox
                    checked={sortPriceRange === "priceOne"}
                    onChange={() => handlePriceRangeChange("priceOne")}
                  >
                    Giá dưới 1.000.000đ
                  </Checkbox>
                  <Checkbox
                    checked={sortPriceRange === "priceTwo"}
                    onChange={() => handlePriceRangeChange("priceTwo")}
                  >
                    1.000.000 - 3.000.000đ
                  </Checkbox>
                  <Checkbox
                    checked={sortPriceRange === "priceThree"}
                    onChange={() => handlePriceRangeChange("priceThree")}
                  >
                    3.000.000 - 6.000.000đ
                  </Checkbox>
                  <Checkbox
                    checked={sortPriceRange === "priceFour"}
                    onChange={() => handlePriceRangeChange("priceFour")}
                  >
                    6.000.000 - 10.000.000đ
                  </Checkbox>
                  <Checkbox
                    checked={sortPriceRange === "priceFive"}
                    onChange={() => handlePriceRangeChange("priceFive")}
                  >
                    Giá trên 10.000.000đ
                  </Checkbox>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
        {loading ? (
          <div></div>
        ) : (
          <motion.div
            initial={!isSmallScreen ? { y: 10, opacity: 0 } : {}}
            animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
            transition={
              !isSmallScreen
                ? { duration: 1, ease: easeInOut }
                : { duration: 0.6 }
            }
            ref={sectionRef}
            className="w-full lg:w-[75%] mt-13 lg:mt-0"
          >
            {listAccessories.length > 0 ? (
              <div>
                <div className="flex flex-wrap justify-between lg:justify-start lg:gap-3">
                  {listAccessories.map((accessory) => {
                    const discountPercentages = accessory.discountPercentage;
                    const price = accessory?.price;
                    const discountPrice = accessory?.discountPrice;

                    return (
                      <Link
                        key={accessory.slug}
                        to={`/phu-kien-xe-dap/${accessory.slug}`}
                      >
                        <div className="transition-transform lg:hover:shadow-lg duration-300 ease-in-out transform lg:hover:-translate-y-2 w-[163px] md:w-[240px] lg:w-[310px] mb-6 lg:p-3">
                          <div className="relative">
                            <div className="rounded-br-[20px] rounded-tl-[20px] overflow-hidden">
                              <motion.img
                                src={accessory.image as string}
                                className="w-full h-auto"
                                alt={accessory.title}
                                whileHover={{ scale: 1.09 }}
                                transition={{
                                  duration: 0.5,
                                  ease: "easeInOut",
                                }}
                              />
                            </div>
                            {discountPercentages > 0 && (
                              <p className="absolute bottom-0 right-0 bg-[#ef4d38] text-white w-15 h-5 md:w-16 md:h-6 flex justify-center items-center font-medium text-sm md:text-[16px] rounded-br-[20px] rounded-tl-[20px]">
                                - {Math.round(discountPercentages)}%
                              </p>
                            )}
                          </div>
                          <div className="space-y-1 md:space-y-2 mx-auto text-[15px] md:text-[17px] mt-2">
                            <div>
                              <p className="h-12 line-clamp-2 mb-3">
                                {accessory.title}
                              </p>
                              <div className="flex justify-between items-center">
                                <p className="text-xs md:text-sm text-gray-800">
                                  Màu sắc: 1
                                </p>
                                {(accessory.salesCount as number) > 0 && (
                                  <p className="text-xs md:text-sm text-gray-800">
                                    Đã bán: {accessory.salesCount}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="border-t-2 pt-1 md:pt-4 text-[17px] md:text-[22px]">
                              {discountPrice !== price ? (
                                <div className="flex flex-wrap-reverse md:justify-between items-center gap-x-10">
                                  <p className="text-[#ef4d38] font-semibold">
                                    {formatPrice(discountPrice || 0)}
                                  </p>
                                  <del className="text-gray-400 text-xs md:text-[15px]">
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
                <div className="flex justify-end mt-10">
                  <Pagination
                    current={currentPage}
                    total={totalPages * 24}
                    onChange={handlePageChange}
                    pageSize={24}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center md:mt-20 text-xl md:text-2xl">
                <p>Không có sản phẩm</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ListAccessories;
