import { Badge, Tooltip } from "antd";
import { motion } from "framer-motion";
import { ChevronsUp, ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Loader from "../common/Loader/Loader";
import Footer from "../components/client/Footer/Footer";
import Header from "../components/client/Header/Header";
import { fb, phone, zl } from "../contants/client";
import { CartContext, CartContextType } from "../contexts/CartContext";

const LayoutClient = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
  const { totalQuantity } = useContext(CartContext) as CartContextType;

  const toggleVisible = () => {
    setIsVisible(window.pageYOffset > 100);
  };

  const scrollToTop = () => {
    const scrollDuration = 500;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / scrollDuration, 1);
      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, start * (1 - easeInOutQuad));

      if (timeElapsed < scrollDuration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const shouldShowHeader =
    !location.pathname.startsWith("/thanh-toan") &&
    !location.pathname.startsWith(
      "/VNG-BOSSBOSS2368/login-to-admin/by/LeDinhAnh"
    );

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen flex flex-col font-satoshi">
      {shouldShowHeader && <Header />}
      <main className="flex-grow mt-50">
        <Outlet />
      </main>

      {shouldShowHeader && (
        <div className="fixed bottom-0 md:bottom-100 lg:bottom-30 bg-white rounded-lg border border-[#ef4d38] md:right-3 flex w-full md:w-auto justify-center gap-x-9 md:justify-between py-1 md:gap-y-1 md:flex-col items-center z-1">
          <Tooltip title="Giỏ hàng" placement="right">
            <Link
              to="/gio-hang"
              className=" bg-[#ef4d38] w-10 h-10 md:w-9 md:h-9 rounded-md md:mt-2 flex justify-center items-center transition-transform transform hover:scale-110"
            >
              <Badge count={totalQuantity} style={{ scale: "0.9" }}>
                <ShoppingCart size={29} className="text-white" />
              </Badge>
            </Link>
          </Tooltip>
          <Tooltip title="Gọi ngay" placement="right">
            <Link to="tel:0938131165">
              <img
                src={phone}
                alt="phone"
                className="w-14 h-14 md:w-11 md:h-11 lg:w-12 lg:h-12 transition-transform transform hover:scale-110"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Chat Zalo" placement="right">
            <Link to="https://zalo.me/0938131165">
              <img
                src={zl}
                alt="zalo"
                className="w-14 h-14 md:w-11 md:h-11 lg:w-12 lg:h-12 transition-transform transform hover:scale-110"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Facebook" placement="right">
            <Link to="https://www.facebook.com/profile.php?id=100037761937210">
              <img
                src={fb}
                alt="facebook"
                className="w-14 h-14 md:w-11 md:h-11 lg:w-12 lg:h-12 transition-transform transform hover:scale-110"
              />
            </Link>
          </Tooltip>
        </div>
      )}

      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="right-[16px] bottom-30 md:bottom-6 fixed bg-[#ef4d38] text-white w-10 h-10 flex items-center justify-center rounded-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronsUp />
        </motion.button>
      )}
      {shouldShowHeader && <Footer />}
    </div>
  );
};

export default LayoutClient;
