import { easeInOut, motion, useInView } from 'framer-motion';
import { useRef } from "react";
const Outro = () => {
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { amount: 0.2, once: true });
    return (
        <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: easeInOut, delay: 0.6 }}
            className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto flex flex-col gap-2 items-center justify-center text-center mt-6 md:mt-20 mb-6 md:mb-20"
            ref={sectionRef}
        >
            <b className="text-[30px] md:text-[40px] lg:text-[46px]">Khơi dậy Đam Mê Chinh Phục</b>
            <p className="text-xs md:text-lg">Cùng BossBoss2368, nuôi dưỡng sở thích và niềm đam mê của bạn, biến mỗi chuyến đi thành một hành trình tuyệt vời đầy ý nghĩa.</p>
        </motion.div>
    )
}


export default Outro