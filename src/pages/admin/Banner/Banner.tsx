import { useEffect, useState } from "react";
import { Banner } from "../../../interface/banner";
import { instance } from "../../../api";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";

const Banners = () => {
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
    <div className="w-[1000px] mx-auto">
      <Helmet>
        <title>{getTitleTab("Quản lí banner")}</title>
      </Helmet>
      <div className=" mb-4 p-5 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <p className="text-xl font-semibold pr-2">QUẢN LÝ TRÌNH CHIẾU ẢNH</p>
        </div>
      </div>
      <div className=" bg-white p-10 rounded-lg">
        <div>
          {banner?.images && banner.images.length > 0 ? (
            <div>
              <Carousel autoplay>
                {banner.images.map((img, index) => (
                  <img key={index} src={img} alt={`Banner`} />
                ))}
              </Carousel>
              <Link to={`/admin/banner-edit/${banner._id}`}>
                <button
                  type="button"
                  className="custom-button rounded-lg h-12 w-full"
                >
                  Cập nhật
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/admin/banner-add"}>
                <button
                  type="button"
                  className="custom-button rounded-lg h-12 w-full mt-2 "
                >
                  Thêm mới ảnh banner
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banners;
