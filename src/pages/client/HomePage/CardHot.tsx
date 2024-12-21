import { useContext, useRef } from 'react';
import { ProductContext, ProductContextType } from '../../../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { easeInOut, motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import '../../../scss/cardhot.scss';

const CardHot = () => {
    const { listProducts } = useContext(ProductContext) as ProductContextType;
    const ref = useRef(null);
    const hotProducts = listProducts.filter(product => product.hot);
    const isInView = useInView(ref, { amount: 0.2, once: true });
    return (
        <motion.div
            initial={{ y: 166, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.06, ease: easeInOut }}
            ref={ref}
            className="rounded-md max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto "
        >
            <p className='text-2xl mb-10 p-3 w-full rounded-full flex justify-center items-center bg-[#ef4d38] text-white uppercase'>
                Sản phẩm bán chạy
            </p>

            <Swiper
                slidesPerView={2}
                centeredSlides={false}
                pagination={{ clickable: true }}
                slidesPerGroup={2}
                speed={2666}
                modules={[Pagination, Autoplay]}
                loop={false}
                autoplay={{
                    delay: 4666,
                    disableOnInteraction: true,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3
                    },
                    1280: {
                        slidesPerView: 4,
                        slidesPerGroup: 4
                    },
                }}
            >
                {hotProducts.map((product, index) => {
                    const discountPercentages = product.colors
                        .map(c => c.discountPercentage)
                        .filter(percentage => percentage > 0);
                    const maxDiscountPercentage = Math.max(...discountPercentages, 0);
                    return (
                        <SwiperSlide key={index}>
                            <Link key={product.slug} to={`/xe-dap-the-thao/${product.slug}`}>
                                <div className="w-[160px] md:w-[240px] lg:w-[300px]">
                                    <div className="relative">
                                        <div className="rounded-br-[20px] rounded-tl-[20px] overflow-hidden">
                                            <motion.img
                                                src={product.colors[0].image as string}
                                                className="w-full h-[126px] md:h-[226px] object-cover"
                                                alt={product.title}
                                                whileHover={{ scale: 1.09 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                            />
                                        </div>
                                        {maxDiscountPercentage > 0 && (
                                            <p className="absolute bottom-0 right-0 bg-[#ef4d38] text-white w-16 h-6 flex justify-center items-center font-medium text-[16px] rounded-br-[20px] rounded-tl-[20px]">
                                                - {Math.round(maxDiscountPercentage)}%
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })
                }
            </Swiper>
        </motion.div>
    );
};

export default CardHot;
