import { Carousel } from "antd";
import { easeInOut, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { instance } from "../../../api";
import { Banner } from "../../../interface/banner";

const Slide = () => {
    const [banner, setBanner] = useState<Banner | null>(null);
    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get(`/banners`);
                setBanner(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }} // Bắt đầu với độ mờ 0
            animate={{ opacity: 1 }} // Xuất hiện với độ mờ 1
            transition={{ duration: 1, ease: easeInOut }} // Hiệu ứng chuyển tiếp
            className="w-full mx-auto"
        >
            <Carousel autoplay dots={false} arrows={false}>
                {banner && banner.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Banner`}
                        className="w-full h-full lg:h-[580px]"
                    />
                ))}
            </Carousel>
        </motion.div>
    );
};
export default Slide;
