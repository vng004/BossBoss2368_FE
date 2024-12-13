import { Link } from "react-router-dom";
import { fb, logo, shopee, tiktok, VNG, zl } from "../../../contants/client";

const Footer = () => {
  return (
    <footer className="md:mt-20">
      <div className="pt-10 pb-10">
        <div className="lg:mt-30 space-y-6 max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto text-black">
          <div className="flex flex-wrap justify-between gap-10 lg:gap-20">
            <div className="w-[666px] lg:w-[350px] space-y-1">
              <img src={logo} alt="logo" className="w-[120px] pb-4" />
              <div>
                <p>
                  Cung cấp các sản phẩm chính hãng về xe đạp, chuyên phân phối
                  sỉ lẻ xe đạp thể thao và phụ kiện xe đạp
                </p>
                <p>
                  Gọi ngay để được tư vấn:{" "}
                  <Link
                    to="tel:                0938131165
"
                    className="hover:text-[#ff4667] font-semibold"
                  >
                    0938131165
                  </Link>
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p>Danh Mục</p>
              <div className="text-gray-500">
                <Link to={"/"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Trang chủ
                  </p>
                </Link>
                <Link to={"/xe-dap-the-thao"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Xe đạp thể thao
                  </p>
                </Link>
                <Link to={"/phu-kien-xe-dap"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Phụ kiện xe đạp
                  </p>
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-[15px]">
              <p>Chính Sách</p>
              <div className="text-gray-500">
                <Link to={"/chinh-sach-van-chuyen"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Chính sách vận chuyển
                  </p>
                </Link>
                <Link to={"/chinh-sach-doi-tra"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Chính sách đổi trả
                  </p>
                </Link>
                <Link to={"/dieu-khoan-dich-vu"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Điều khoản dịch vụ
                  </p>
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-[15px]">
              <p>Hỗ Trợ</p>
              <div className="text-gray-500">
                <Link to={"/huong-dan-mua-hang"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Hướng dẫn mua hàng
                  </p>
                </Link>
                <Link to={"/huong-dan-thanh-toan"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Hướng dẫn thanh toán
                  </p>
                </Link>
                <Link to={"/huong-dan-giao-nhan"}>
                  <p className="pt-3 text-[15px] hover:text-[#ef4d38]">
                    Hướng dẫn giao nhận
                  </p>
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <p>Kết nối với chúng tôi</p>
              <div className="flex items-center gap-1">
                <Link to="https://www.facebook.com/profile.php?id=100037761937210">
                  <img
                    alt=""
                    src={fb}
                    className="w-[46px] h-[46px] transition-transform transform hover:scale-110"
                  />
                </Link>
                <Link to="https://zalo.me/0938131165">
                  <img
                    alt=""
                    src={zl}
                    className="w-[46px] h-[46px] transition-transform transform hover:scale-110"
                  />
                </Link>
                <Link to="https://www.tiktok.com/@bossboss2.3.6.8?_t=8rA9inz0AeC&_r=1">
                  <img
                    alt=""
                    src={tiktok}
                    className="w-[46px] h-[46px] transition-transform transform hover:scale-110"
                  />
                </Link>
                <Link to="https://shopee.vn/bossboss2368">
                  <img
                    alt=""
                    src={shopee}
                    className="w-[37px] border border-[#EC3B2A] rounded-md h-[37px] transition-transform transform hover:scale-110"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 border-2 p-4 mb-17 md:mb-0">
        <p className="text-[15px]">BossBoss2368</p>
        <div className="flex items-center gap-1">
          <p className="text-[13px] text-gray-800 ">© 2024, cung cấp bởi </p>
          <img src={VNG} alt="VNG" width={36} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
