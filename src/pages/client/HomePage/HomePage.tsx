import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";
import BannerProduct from "./BannerProduct";
import CardHot from "./CardHot";
import ListAccessories from "./ListAccessories";
import ListProducts from "./ListProducts";
import Service from "./Service";
import Slide from "./Silde";
import Intro from "./Intro";
import Outro from "./Outro";

const Home_Page = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      await new Promise((resolver) => {
        setTimeout(resolver, 266);
      });
      setLoading(false);
    })();
  }, []);
  return loading ? (
    <div />
  ) : (
    <div className=" mt-[-24px] md:mt-[-40px] text-[#1c2434]">
      <Helmet>
        <title>{getTitleTab("Xe Đạp Thể Thao, Địa Hình")}</title>
      </Helmet>

      <Slide />

      <Intro />

      <CardHot />

      <ListProducts />

      <ListAccessories />

      <BannerProduct />

      <Outro />

      <Service />
    </div>
  );
};

export default Home_Page;
