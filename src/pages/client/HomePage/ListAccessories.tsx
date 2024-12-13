import { motion, easeInOut, useInView } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  AccessoryContext,
  AccessoryContextType,
} from "../../../contexts/AccessoryContext";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import { ChevronRight } from "lucide-react";

const ListAccessories = () => {
  const { state, getAllAccessory } = useContext(
    AccessoryContext
  ) as AccessoryContextType;
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.2, once: true });
  const accessory = [...state.accessories].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  useEffect(() => {
    getAllAccessory(1, 12);
  }, []);

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: easeInOut }}
      ref={sectionRef}
      className="mt-12 lg:mt-30 space-y-6 max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto"
    >
      <div className=" flex justify-between text-[#ef4d38] border-b-2 pb-2">
        <p className="text-xl md:text-2xl uppercase font-semibold">
          Phụ kiện xe đạp
        </p>
        <Link
          to={"/phu-kien-xe-dap"}
          className=" flex items-center justify-center text-lg gap-1"
        >
          <p>Xem thêm</p>
          <ChevronRight size={20} />
        </Link>
      </div>
      <div className="flex flex-wrap justify-between md:justify-start md:gap-6 lg:gap-3">
        {accessory.map((accessory) => {
          const discountPercentages = Math.round(accessory.discountPercentage);
          const price = formatPrice(Number(accessory.price));
          const discountPrice = formatPrice(Number(accessory.discountPrice));
          return (
            <Link
              key={accessory.slug}
              to={`/phu-kien-xe-dap/${accessory.slug}`}
            >
              <div className="transition-transform md:hover:shadow-lg duration-300 ease-in-out transform md:hover:-translate-y-2 w-[163px] md:w-[240px] lg:w-[310px] mb-6 md:p-3">
                <div className="relative">
                  <div className="rounded-br-[20px] rounded-tl-[20px] overflow-hidden">
                    <motion.img
                      src={accessory.image as string}
                      className="w-full h-full"
                      alt={accessory.title}
                      whileHover={{ scale: 1.09 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                  {discountPercentages > 0 && (
                    <p className="absolute bottom-0 right-0 bg-[#ef4d38] text-white w-15 h-5 md:w-16 md:h-6 flex justify-center items-center font-medium text-sm md:text-[16px] rounded-br-[20px] rounded-tl-[20px]">
                      - {Math.round(discountPercentages)}%
                    </p>
                  )}
                </div>
                <div className="space-y-2 mx-auto text-[15px] md:text-[17px] mt-2">
                  <div>
                    <p className="h-12 line-clamp-2">{accessory.title}</p>
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
                      <div className="flex flex-wrap md:justify-between items-center gap-x-10">
                        <p className="text-[#ef4d38] font-semibold">
                          {discountPrice}
                        </p>
                        <del className="text-gray-400 text-[15px]">{price}</del>
                      </div>
                    ) : (
                      <p className="text-[#ef4d38] font-semibold">
                        {discountPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ListAccessories;
