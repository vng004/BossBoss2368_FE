import { easeInOut, motion, useInView } from "framer-motion";
import { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import { ChevronRight } from "lucide-react";

const ListProducts = () => {
  const { state, formatPrice, getAllProduct } = useContext(
    ProductContext
  ) as ProductContextType;
  const bike = [...state.products].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.2, once: true });

 
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    getAllProduct(1,12);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    handleResize();  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <motion.div
        initial={!isSmallScreen && { opacity: 0 }}
        animate={isSectionInView ? { opacity: 1 } : {}}
        transition={
          !isSmallScreen ? { duration: 1, ease: easeInOut } : { duration: 0.6 }
        }
        ref={sectionRef}
        className="mt-12 lg:mt-30 space-y-6 max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0  lg:max-w-[1280px] mx-auto"
      >
        <div className="flex justify-between text-[#ef4d38] border-b-2 pb-2">
          <p className="text-xl md:text-2xl font-semibold uppercase">
            Xe đạp thể thao
          </p>
          <Link
            to={"/xe-dap-the-thao"}
            className="flex items-center justify-center text-lg gap-1"
          >
            <p>Xem thêm</p>
            <ChevronRight size={20} />
          </Link>
        </div>
        <div>
          <div className="flex flex-wrap justify-between md:justify-start md:gap-6 lg:gap-3">
            {bike.map((product) => {
              const discountPercentages = product.colors
                .map((c) => c.discountPercentage)
                .filter((percentage) => percentage > 0);

              const maxDiscountPercentage = Math.max(...discountPercentages, 0);
              const price = product.colors[0]?.price;
              const discountPrice = product.colors[0]?.discountPrice;

              return (
                <Link
                  key={product.slug}
                  to={`/xe-dap-the-thao/${product.slug}`}
                >
                  <div className="transition-transform lg:hover:shadow-lg duration-300 ease-in-out transform lg:hover:-translate-y-2 w-[163px] md:w-[240px] lg:w-[310px] mb-6 lg:p-3">
                    <div className="relative">
                      <div className="rounded-br-[20px] rounded-tl-[20px] overflow-hidden">
                        <motion.img
                          src={product.colors[0].image as string}
                          className="w-full h-[120px] md:h-[226px] object-cover"
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
                    <div className="space-y-1 md:space-y-2 mx-auto text-[15px] md:text-[17px] mt-2">
                      <div>
                        <p className="h-12 line-clamp-2 md:mb-3">
                          {product.title}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs md:text-sm text-gray-800">
                            Màu sắc: {product.colors.length}
                          </p>
                          {(product?.salesCount as number) > 0 && (
                            <p className="text-xs md:text-sm text-gray-800">
                              Đã bán: {product.salesCount}
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
        </div>
      </motion.div>
    </div>
  );
};

export default ListProducts;
