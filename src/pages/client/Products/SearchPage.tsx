import { easeInOut, motion, useInView } from "framer-motion";
import { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { getTitleTab } from '../../../contants/client';
import { ProductContext, ProductContextType } from '../../../contexts/ProductContext';
import { Accessory } from '../../../interface/accessory';
import { Product } from '../../../interface/products';
import { instance } from '../../../api';

const SearchPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [accessories, setAccessories] = useState<Accessory[]>([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword') || '';
    const { formatPrice } = useContext(ProductContext) as ProductContextType;
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { amount: 0.2, once: true });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await instance.get(`products/search`, {
                    params: { keyword }
                });
                setProducts(response.data.data.docs);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchAccessories = async () => {
            try {
                const response = await instance.get(`accessories/search`, {
                    params: { keyword }
                });
                setAccessories(response.data.data.docs);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
        fetchAccessories();
    }, [keyword]);
    const combinedResults = [...products, ...accessories];

    return (
        <div className='max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto min-h-[300px]'>
            <Helmet>
                <title>{getTitleTab('Tìm Kiếm Sản Phẩm')}</title>
            </Helmet>
            <div className='space-y-6'>
                <p className='text-xl md:text-2xl'>
                    Kết quả tìm kiếm cho: <span className='font-semibold text-[#ef4d38]'>{keyword}</span>
                </p>
                {combinedResults ?
                    (
                        <div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.5, ease: easeInOut }}
                                ref={sectionRef}
                            >
                                <div className="flex flex-wrap justify-between lg:justify-start lg:gap-3">
                                {combinedResults.map((item) => {
                                        const isProduct = 'colors' in item;
                                        const linkPath = isProduct ? `/xe-dap-the-thao/${item.slug}` : `/phu-kien-xe-dap/${item.slug}`;
                                        const imageSrc = isProduct ? item.colors[0]?.image : item.image;
                                        const title = item.title;
                                        const price = isProduct ? item.colors[0]?.price : item.price;
                                        const discountPrice = isProduct ? item.colors[0]?.discountPrice : item.discountPrice;
                                        let discountPercentage;
                                        if (isProduct) {
                                            const discountPercentages = item.colors
                                                .map(c => c.discountPercentage)
                                                .filter(percentage => percentage > 0);
                                            discountPercentage = Math.max(...discountPercentages, 0);
                                        }

                                        return (
                                            <Link key={item.slug} to={linkPath}>
                                                <div className="transition-transform lg:hover:shadow-lg duration-300 ease-in-out transform lg:hover:-translate-y-2 w-[163px] md:w-[240px] lg:w-[310px] mb-6 lg:p-3">
                                                    <div className="relative">
                                                        <div className="rounded-br-[20px] rounded-tl-[20px] overflow-hidden">
                                                            <motion.img
                                                                src={imageSrc as string}
                                                                className="w-full h-[120px] md:h-[226px] object-cover"
                                                                alt={title}
                                                                whileHover={{ scale: 1.09 }}
                                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                            />
                                                        </div>
                                                        {isProduct && (discountPercentage || 0) > 0 && (
                                                            <p className="absolute bottom-0 right-0 bg-[#ef4d38] text-white w-15 h-5 md:w-16 md:h-6 flex justify-center items-center font-medium text-sm md:text-[16px] rounded-br-[20px] rounded-tl-[20px]">
                                                                - {Math.round(discountPercentage || 0)}%
                                                            </p>
                                                        )}
                                                        {!isProduct && (item.discountPercentage > 0 && (
                                                            <p className="absolute bottom-0 right-0 bg-[#ef4d38] text-white w-15 h-5 md:w-16 md:h-6 flex justify-center items-center font-medium text-sm md:text-[16px] rounded-br-[20px] rounded-tl-[20px]">
                                                                - {Math.round(item.discountPercentage)}%
                                                            </p>
                                                        ))}
                                                    </div>
                                                    <div className="space-y-1 md:space-y-2 mx-auto text-[15px] md:text-[17px] mt-2">
                                                        <div>
                                                            <p className="h-12 line-clamp-2 mb-3">{item.title}</p>
                                                            <div className='flex justify-between items-center'>
                                                                {isProduct ?
                                                                    (<p className='text-xs md:text-sm text-gray-800'>Màu sắc: {item.colors.length}</p>)
                                                                    : (<p className='text-xs md:text-sm text-gray-800'>Màu sắc: 1</p>)}
                                                                {item.salesCount as number > 0 && (<p className='text-xs md:text-sm text-gray-800'>Đã bán: {item.salesCount} </p>)}
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
                                                                <p className="text-[#ef4d38] font-semibold">{formatPrice(discountPrice)}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>

                    ) : (
                        <Link to='/xe-dap-the-thao' className='flex justify-center'>
                            <motion.button whileHover={{
                                scale: 1.01,
                                backgroundColor: '#f39c12',
                                transition: { duration: 0.3 },
                            }}
                                whileTap={{ scale: 0.95 }} className='mt-20 custom-button h-14 w-60 rounded-full '>Tiếp tục mua sắm</motion.button>
                        </Link>
                    )}
            </div>
        </div>
    );
};

export default SearchPage;
