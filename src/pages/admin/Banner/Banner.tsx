import { useEffect, useState } from "react";
import { Banner } from "../../../interface/banner";
import { instance } from "../../../api";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";

const Banners = () => {
  const [banner, setBanner] = useState<Banner | null>(null);
  console.log(banner)
  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/banners`);
        setBanner(res.data[0] || null); 
      } catch (error) {
        console.log("Error fetching banners:", error);
      }
    })();
  }, []);

  return (
    <div className="w-[1000px] mx-auto">
      <Helmet>
        <title>{getTitleTab("Quản lí banner")}</title>
      </Helmet>
      <div className="mb-4 p-5 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <p className="text-xl font-semibold pr-2">QUẢN LÝ TRÌNH CHIẾU ẢNH</p>
        </div>
      </div>
      <div className="bg-white p-10 rounded-lg">
        {banner && banner.images?.length > 0 ? (
          // Nếu đã có banner và hình ảnh
          <div>
            <Carousel autoplay>
              {banner.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Banner ${index + 1}`}
                  className="rounded-lg shadow-md"
                />
              ))}
            </Carousel>
            <Link to={`/admin/banner-edit/${banner._id}`}>
              <button
                type="button"
                className="custom-button rounded-lg h-12 w-full mt-4"
              >
                Cập nhật ảnh banner
              </button>
            </Link>
          </div>
        ) : (
          // Nếu chưa có banner hoặc chưa có hình ảnh
          <div>
            <div className="border-2 border-dashed rounded-lg h-[550px] flex items-center justify-center text-xl text-gray-500 hover:border-[#1c2434]">
              Chưa có ảnh nào. Hãy thêm mới ảnh banner.
            </div>
            <Link to={"/admin/banner-add"}>
              <button
                type="button"
                className="custom-button rounded-lg h-12 w-full mt-4"
              >
                Thêm mới ảnh banner
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banners;
