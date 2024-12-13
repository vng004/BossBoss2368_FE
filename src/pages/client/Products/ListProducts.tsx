import { Checkbox, Drawer, Pagination } from "antd";
import { motion } from "framer-motion";
import { Filter, MenuIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getTitleTab } from "../../../contants/client";
import { BrandContext, BrandContextType } from "../../../contexts/BrandContext";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import "../../../scss/TreeselectAntd.scss";

const ListProducts = () => {
  const { filterProducts, totalPages, listProducts, formatPrice } =
    useContext(ProductContext) as ProductContextType;
  const { state } = useContext(BrandContext) as BrandContextType;
  const [sortPriceRange, setSortPriceRange] = useState<
    | "priceOne"
    | "priceTwo"
    | "priceThree"
    | "priceFour"
    | "priceFive"
    | undefined
  >(undefined);
  const [sortByDate, setSortByDate] = useState<"latest" | undefined>(undefined);
  const [isHot, setIsHot] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadProduct(currentPage, sortPriceRange, sortByDate, isHot, onSale);
  }, [currentPage, selectedBrand, sortPriceRange, sortByDate, isHot, onSale]);

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
    isHot?: boolean,
    onSale?: boolean
  ) => {
    setLoading(true);
    window.scrollTo(0, 0);
    await new Promise((resolver) => {
      setTimeout(resolver, 166);
    });
    await filterProducts({
      page,
      limit: 24,
      selectedBrands: selectedBrand.join(","),
      priceRange,
      sortByDate: sortByDate ? "latest" : undefined,
      isHot,
      onSale,
    });
    setLoading(false);
  };

  const handlePageChange = async (page: number) => {
    loadProduct(page, sortPriceRange, sortByDate, isHot, onSale);
    setCurrentPage(page);
  };

  const handleBrandsChange = async (value: string[]) => {
    setSelectedBrand(value);
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
        <title>{getTitleTab("Xe Đạp Thể Thao")}</title>
      </Helmet>
      <div className="md:mb-10 flex justify-between items-center">
        <div className="">
          <p className="text-xl md:text-2xl">Xe Đạp Thể Thao</p>
        </div>
        <button
          onClick={toggleMenu}
          className="w-40 lg:hidden p-2 flex justify-between items-center border rounded-lg"
        >
          <MenuIcon size={30} />
          <p className="text-lg md:text-2xl">Sắp Xếp</p>
        </button>
        <div className="hidden lg:flex items-center gap-2 ">
          <div className="flex items-center gap-1">
            <Filter />
            <p className="font-semibold">Sắp xếp:</p>
          </div>
          <div className="flex items-center gap-2 border p-2 rounded-lg">
            <Checkbox
              checked={sortByDate === "latest"}
              onChange={() => handleSortByDateChange("latest")}
            >
              Mới nhất
            </Checkbox>
            -
            <Checkbox
              checked={isHot}
              onChange={() => {
                setIsHot(!isHot);
                loadProduct(1, sortPriceRange, sortByDate, !isHot, !onSale);
              }}
            >
              Bán chạy
            </Checkbox>
            -
            <Checkbox
              checked={onSale}
              onChange={() => {
                setOnSale(!onSale);
                loadProduct(1, sortPriceRange, sortByDate, !isHot, !onSale);
              }}
            >
              Khuyến mãi
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="hidden lg:block w-[22%] space-y-6">
          <div>
            <div className="mb-4">
              <p className="border-b-2 font-semibold">Thương hiệu</p>
            </div>
            <Checkbox.Group
              options={state.brands
                .filter((brand) => brand._id)
                .map((brand) => ({
                  label: brand.title,
                  value: brand._id as string,
                }))}
              className="flex flex-col gap-1"
              value={selectedBrand}
              onChange={handleBrandsChange}
            />
          </div>
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
        <div className="lg:hidden left-30 absolute">
          <Drawer
            title={
              <div className="text-lg font-semibold flex items-center gap-1">
                <Filter /> <p>Sắp xếp</p>
              </div>
            }
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
                  checked={isHot}
                  onChange={() => {
                    setIsHot(!isHot);
                    loadProduct(1, sortPriceRange, sortByDate, !isHot, !onSale);
                  }}
                >
                  Bán chạy
                </Checkbox>
                <Checkbox
                  checked={onSale}
                  onChange={() => {
                    setOnSale(!onSale);
                    loadProduct(1, sortPriceRange, sortByDate, !isHot, !onSale);
                  }}
                >
                  Khuyến mãi
                </Checkbox>
              </div>

              <div>
                <p className="font-semibold border-b-2">Thương hiệu</p>
                <Checkbox.Group
                  options={state.brands
                    .filter((brand) => brand._id)
                    .map((brand) => ({
                      label: brand.title,
                      value: brand._id as string,
                    }))}
                  className="flex flex-col gap-1 mt-2"
                  value={selectedBrand}
                  onChange={handleBrandsChange}
                />
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
          <div className="w-full lg:w-[75%] mt-13 lg:mt-0">
            {listProducts.length > 0 ? (
              <div>
                <div className="flex flex-wrap justify-between lg:justify-start lg:gap-3">
                  {listProducts.map((product) => {
                    const discountPercentages = product.colors
                      .map((c) => c.discountPercentage)
                      .filter((percentage) => percentage > 0);

                    const maxDiscountPercentage = Math.max(
                      ...discountPercentages,
                      0
                    );
                    const price = product.colors[0]?.price;
                    const discountPrice = product.colors[0]?.discountPrice;

                    return (
                      <Link
                        key={product.slug}
                        to={`/xe-dap-the-thao/${product.slug}`}
                      >
                        <div className="transition-transform lg:hover:shadow-lg duration-300 ease-in-out transform lg:hover:-translate-y-2 w-[163px] md:w-[240px] lg:w-[310px] mb-6 lg:p-3 rounded-md">
                          <div className="relative">
                            <div className="rounded-br-[20px] rounded-tl-[20px] overflow-hidden">
                              <motion.img
                                src={product.colors[0].image as string}
                                className="w-full h-full"
                                alt={product.title}
                                whileHover={{ scale: 1.09 }}
                                transition={{
                                  duration: 0.5,
                                  ease: "easeInOut",
                                }}
                              />
                            </div>
                            {maxDiscountPercentage > 0 && (
                              <p className="absolute bottom-0 right-0 bg-[#ef4d38] text-white w-15 h-5 md:w-16 md:h-6 flex justify-center items-center font-medium text-sm md:text-[16px] rounded-br-[20px] rounded-tl-[20px]">
                                - {Math.round(maxDiscountPercentage)}%
                              </p>
                            )}
                          </div>
                          <div className="space-y-1 md:space-y-2 mx-auto text-[15px] md:text-[17px] mt-2">
                            <div>
                              <p className="h-12 line-clamp-2 mb-3">
                                {product.title}
                              </p>
                              <div className="flex justify-between items-center">
                                <p className="text-xs md:text-sm text-gray-800">
                                  Màu sắc: {product.colors.length}
                                </p>
                                {product.salesCount ? (
                                  <p className="text-xs md:text-sm text-gray-800">
                                    Đã bán: {product.salesCount}
                                  </p>
                                ) : (
                                  ""
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProducts;
