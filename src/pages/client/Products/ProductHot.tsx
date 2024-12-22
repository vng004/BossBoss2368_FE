import { useContext } from "react";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

const ProductHot = () => {
  const { formatPrice, listProducts } = useContext(
    ProductContext
  ) as ProductContextType;

  const productsHot = listProducts.filter((p) => p.hot).slice(0, 5);

  return (
    <div className="w-full space-y-2 mt-3">
      <div className="text-lg flex gap-2 border-b pb-3">
        <p>Sản phẩm bán chạy</p> <Flame className="text-[#ef4d38]" />
      </div>
      <div className="flex flex-col gap-4 ">
        {productsHot.map((product) => {
          const discountPrice = formatPrice(
            Number(product.colors[0].discountPrice)
          );
          const price = formatPrice(Number(product.colors[0].price));
          return (
            <Link key={product.slug} to={`/xe-dap-the-thao/${product.slug}`}>
              <div className="flex gap-3 ">
                <img
                  src={product.colors[0].image as string}
                  alt=""
                  className="w-[160px] h-[110px] object-cover rounded-md"
                />
                <div>
                  <p className="line-clamp-2  w-[160px] mb-2 hover:text-[#ef4d38]">
                    {product.title}
                  </p>{" "}
                  <div>
                    {discountPrice !== price ? (
                      <div className="flex flex-col">
                        <del className="text-gray-500 text-[14px]">{price}</del>
                        <span className="font-semibold text-[#ef4d38]">
                          {discountPrice}
                        </span>
                      </div>
                    ) : (
                      <p className="font-semibold text-[#ef4d38]">
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
    </div>
  );
};

export default ProductHot;
