import { Badge, Drawer, Menu, Tooltip } from "antd";
import { motion } from "framer-motion";
import {
  Bike,
  House,
  MenuIcon,
  Phone,
  Search,
  ShoppingCart ,
  Wrench,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fb, logo, shopee, tiktok, zl } from "../../../contants/client";
import { CartContext, CartContextType } from "../../../contexts/CartContext";
import "../../../scss/MenuAntd.scss";
import SliderHeader from "./SliderHeader";
const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isTopVisible, setIsTopVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [search, setSearch] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { totalQuantity } = useContext(CartContext) as CartContextType;
  const popularKeywords = ["fixed gear", "road", "Giant", "xe fixed gear"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsHeaderVisible(
      currentScrollY < lastScrollY.current || currentScrollY <= 66
    );
    setIsTopVisible(currentScrollY <= 66);
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!search) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [search]);

  useEffect(() => {}, [totalQuantity]);
  const handleSearchFocus = () => setSearch(false);
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      window.location.href = `/search?keyword=${encodeURIComponent(
        searchKeyword
      )}`;
    }
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <motion.header
      className="fixed top-0 left-0 w-full bg-white z-50"
      initial={{ y: 0 }}
      animate={{ y: isHeaderVisible ? 0 : -180 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      {isTopVisible && search && (
        <div className="bg-[#f5f5f5] text-black text-xs">
          <div className="hidden sm:flex max-w-[768px] md:max-w-[1024px] lg:p-1 p-4 lg:max-w-[1280px] mx-auto justify-between items-center py-1">
            <div className="gap-2 flex items-center text-sm">
              <p>Cần hỗ trợ: </p>
              <Phone width={18} className="text-green-500" />
              <a className="hover:text-[#ef4d38] text-lg" href="tel:0938131165">
                (+84) 938131165
              </a>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-sm">Kết nối với tôi:</p>
              <div className="flex gap-1 items-center">
                <Link to="https://www.facebook.com/profile.php?id=100037761937210">
                  <img
                    alt=""
                    src={fb}
                    className="w-9 h-9 transition-transform transform hover:scale-110"
                  />
                </Link>
                <Link to="https://zalo.me/0938131165">
                  <img
                    alt=""
                    src={zl}
                    className="w-9 h-9 transition-transform transform hover:scale-110"
                  />
                </Link>
                <Link to="https://www.tiktok.com/@bossboss2.3.6.8?_t=8rA9inz0AeC&_r=1">
                  <img
                    alt=""
                    src={tiktok}
                    className="w-9 h-9 transition-transform transform hover:scale-110"
                  />
                </Link>
                <Link to="https://shopee.vn/bossboss2368">
                  <img
                    alt=""
                    src={shopee}
                    className="w-7 h-7 border border-[#EC3B2A] rounded-md transition-transform transform hover:scale-110"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${
          search &&
          "flex flex-wrap justify-center lg:justify-between md:items-center md:py-1  max-w-[768px] md:max-w-[1024px]  p-4 md:p-6 lg:p-0  lg:max-w-[1280px] mx-auto bg-white relative"
        }`}
      >
        <div>
          {search && (
            <Link to={`/`}>
              <img src={logo} className="w-[70px] -mt-3 md:-mt-0" alt="Logo" />
            </Link>
          )}
        </div>
        {search && (
          <div className="lg:hidden left-0 absolute">
            <button onClick={toggleMenu} className="p-2">
              <MenuIcon size={30} />
            </button>
            <Drawer
              title={<p className="text-lg font-semibold">Danh mục</p>}
              placement="left"
              closable={true}
              onClose={() => setIsMenuOpen(false)}
              open={isMenuOpen}
              onClick={toggleMenu}
            >
              <Menu
                mode="vertical"
                className="text-[#1c2434] font-semibold text-[16px] md:text-lg"
                items={[
                  {
                    key: "/",
                    icon: <House size={18} />,
                    label: <Link to="/">Trang Chủ</Link>,
                  },
                  {
                    key: "/xe-dap-the-thao",
                    icon: <Bike size={18} />,
                    label: <Link to="/xe-dap-the-thao">Xe Đạp Thể Thao</Link>,
                  },
                  {
                    key: "/phu-kien-xe-dap",
                    icon: <Wrench size={18} />,
                    label: <Link to="/phu-kien-xe-dap">Phụ Kiện Xe Đạp</Link>,
                  },
                ]}
              />
              <div className="absolute bottom-4 md:bottom-16 text-[16px] md:text-lg space-y-3">
                <p className=" font-semibold pb-2 text-lg">Hỗ trợ</p>
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-green-500" />
                  <p>Hotline:</p>
                  <Link
                    className="text-[#ef4d38] font-semibold text-lg"
                    to="tel:0938131165
"
                  >
                    (+84) 938131165
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <p>Kết nối với tôi:</p>
                  <div className="flex gap-1 items-center">
                    <Link to="https://www.facebook.com/profile.php?id=100037761937210">
                      <img
                        alt=""
                        src={fb}
                        className="w-10 h-10 transition-transform transform hover:scale-110"
                      />
                    </Link>
                    <Link to="https://zalo.me/0938131165">
                      <img
                        alt=""
                        src={zl}
                        className="w-10 h-10 transition-transform transform hover:scale-110"
                      />
                    </Link>
                    <Link to="https://www.tiktok.com/@bossboss2.3.6.8?_t=8rA9inz0AeC&_r=1">
                      <img
                        alt=""
                        src={tiktok}
                        className="w-10 h-10 transition-transform transform hover:scale-110"
                      />
                    </Link>
                    <Link to="https://shopee.vn/bossboss2368">
                      <img
                        alt=""
                        src={shopee}
                        className="w-8 h-8 border border-[#EC3B2A] rounded-md transition-transform transform hover:scale-110"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Drawer>
          </div>
        )}

        <div className="hidden lg:block">
          {search && (
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              className="text-[#1c2434] font-semibold text-sm md:text-lg w-[540px] lg:ml-36"
              items={[
                {
                  key: "/",
                  icon: <House size={18} />,
                  label: <Link to="/">Trang Chủ</Link>,
                },
                {
                  key: "/xe-dap-the-thao",
                  icon: <Bike size={18} />,
                  label: <Link to="/xe-dap-the-thao">Xe Đạp Thể Thao</Link>,
                },
                {
                  key: "/phu-kien-xe-dap",
                  icon: <Wrench size={18} />,
                  label: <Link to="/phu-kien-xe-dap">Phụ Kiện Xe Đạp</Link>,
                },
              ]}
            />
          )}
        </div>

        <div
          className={`${
            search ? "md:absolute right-5 lg:static " : ""
          }  flex gap-3 items-center`}
        >
          <div className={`w-full ${search ? "h-auto" : "h-[360px]"}`}>
            <form
              className={`relative flex items-center`}
              onSubmit={handleSearchSubmit}
            >
              <input
                className={`py-[6px] pl-12 transition-all duration-500 outline-none ease-in-out bg-[#f5f5f5] 
                  ${
                    search
                      ? "w-[346px] pt-2 md:mt-0 md:w-[166px] hover:bg-gray-200"
                      : "w-[900px] mt-3 ml-10 md:ml-30 lg:ml-80"
                  } 
                  border rounded-full focus:outline-none`}
                type="text"
                name="kyw"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm kiếm"
                onFocus={handleSearchFocus}
                autoComplete="off"
              />
              <button
                className={`absolute w-8 h-8 rounded-full bg-gray-50 flex justify-center items-center ml-[2px] transition-all 
                  ${
                    search
                      ? "text-[#1c2434]"
                      : "left-10 md:left-[120px] lg:left-[319px] top-[14px] lg:top-[13px] text-[#ef4d38]"
                  }`}
                type="submit"
              >
                <Search width={20} />
              </button>
              {!search && (
                <span
                  className="ml-2 md:ml-18 lg:ml-60 mt-3 hover:text-gray-400 text-xl cursor-pointer transition-colors duration-300\ ease-in-out mr-2 md:mr-4 lg:mr-0"
                  onClick={() => setSearch(true)}
                >
                  Hủy
                </span>
              )}
            </form>
            {!search && (
              <motion.div
                className="absolute ml-10 md:ml-30 lg:ml-80 pt-8 text-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                Cụm từ tìm kiếm phổ biến
                <div className="mt-3">
                  {popularKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="block text-[16px] cursor-pointer hover:text-[#1c2434] mt-2 text-gray-500"
                      onClick={() => setSearchKeyword(keyword)}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
            {!search && (
              <div
                className="bg-gray-400/70 h-screen mt-[310px] transition-opacity duration-300 ease-in-out z-99"
                onClick={() => setSearch(true)}
              />
            )}
          </div>

          {search && (
            <Tooltip
              title="Giỏ hàng"
              className="absolute top-7 right-5 md:static"
            >
              <Link to="/gio-hang">
                <Badge count={totalQuantity} style={{ scale: "0.9" }}>
                  <ShoppingCart size={29} />
                </Badge>
              </Link>
            </Tooltip>
          )}
        </div>
      </div>
      {isTopVisible && search && <SliderHeader />}
    </motion.header>
  );
};

export default Header;
