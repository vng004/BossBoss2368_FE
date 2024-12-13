import { easeInOut, motion } from 'framer-motion';
import { useRef } from "react";
const Intro = () => {
    const sectionRef = useRef(null);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: easeInOut }}
            className="max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto flex flex-col gap-2 items-center justify-center text-center mt-6 md:mt-16 mb-6 lg:mb-20"
            ref={sectionRef}
        >
            <b className="text-[30px] md:text-[40px] lg:text-[46px] uppercase">Xe đạp không chỉ là phương tiện</b>
            <p className="text-sm md:text-lg">Mà còn là niềm đam mê và tự do. Hãy để BossBoss2368 đồng hành cùng bạn trên mọi nẻo đường.</p>
        </motion.div>
    )
}

export default Intro