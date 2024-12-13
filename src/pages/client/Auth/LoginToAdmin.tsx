import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../../interface/auth";
import { instance } from "../../../api";
import { getTitleTab, logo } from "../../../contants/client";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { message } from "antd";

const LoginToAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({});
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (auth: Auth) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 66);
    });
    try {
      if (!isOtpSent) {
        const res = await instance.post("auth/login", {
          email: auth.email,
          password: auth.password,
        });
        console.log(res)
        setIsOtpSent(true);
        message.success("Mã OTP đã được gửi về gmail.");
      } else {
        try {
          const { data } = await instance.post("auth/login", {
            email: auth.email,
            otp: Number(auth.otp),
          });
          console.log(data)
          sessionStorage.setItem("accessToken", JSON.stringify(data.token));
          sessionStorage.setItem("adminEmail", JSON.stringify(data.email));
          nav("/admin");
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center z-10 mt-[-200px]">
      <Helmet>
        <title>{getTitleTab("Đăng nhập quản trị viên")}</title>
      </Helmet>
      <div className="bg-gray-100 absolute top-0 left-0 bg-gradient-to-b from-[#222222] via-[#222222] to-gray-100 bottom-0 leading-5 h-full w-full overflow-hidden "></div>
      <div className="relative min-h-screen flex justify-center gap-36 items-start pt-34 z-10">
        <div className="w-auto text-white text-center">
          <h1 className="my-3 font-semibold text-[44px]">
            Chào mừng Quản Trị Viên!
          </h1>
          <p className="pr-3 text-lg">
            Đăng nhập tài khoản để vào trang quản trị của <b>BossBoss2368</b>
          </p>
        </div>
        <form
          className="space-y-6 w-[466px] bg-white p-10 rounded-lg  shadow-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center justify-center text-[24px] text-gray-800 h-full">
            <img src={logo} alt="logo" className="w-[80px]" />
            <p>Đăng nhập vào trang quản trị</p>
          </div>
          <div className="custom-input-container">
            <input
              id="email"
              className={`w-full border rounded-xl py-4 px-4 outline-none transition-all ${
                errors.email
                  ? "border-[#ef4d38] focus:border-[#ef4d38]"
                  : "border-gray-400 focus:border "
              }`}
              type="text"
              placeholder=" "
              {...register("email", { required: "Email là bắt buộc" })}
            />
            <label
              htmlFor="email"
              className={`absolute left-4 top-3 transition-all ${
                errors.email ? "text-[#ef4d38]" : "text-gray-400 pt-4"
              }`}
            >
              Email
            </label>
            {errors.email && (
              <p className="text-[#ef4d38] pl-2">{errors.email.message}</p>
            )}
          </div>
          <div className="custom-input-container">
            <input
              id="password"
              className={`w-full border rounded-xl py-4 px-4 outline-none transition-all ${
                errors.password
                  ? "border-[#ef4d38] focus:border-[#ef4d38]"
                  : "border-gray-400 focus:border "
              }`}
              type="text"
              placeholder=" "
              {...register("password", { required: "Mật khẩu là bắt buộc" })}
            />
            <label
              htmlFor="password"
              className={`absolute left-4 top-3 transition-all ${
                errors.password ? "text-[#ef4d38]" : "text-gray-400 pt-4"
              }`}
            >
              Mật khẩu
            </label>
            {errors.password && (
              <p className="text-[#ef4d38] pl-2">{errors.password.message}</p>
            )}
          </div>
          {isOtpSent && (
            <div className="custom-input-container">
              <input
                id="otp"
                className={`w-full border rounded-xl py-4 px-4 outline-none transition-all ${
                  errors.otp
                    ? "border-[#ef4d38] focus:border-[#ef4d38]"
                    : "border-gray-400 focus:border "
                }`}
                type="number"
                placeholder=""
                {...register("otp", { required: "Otp là bắt buộc" })}
              />
              <label
                htmlFor="otp"
                className={`absolute left-4 top-3 transition-all ${
                  errors.otp ? "text-[#ef4d38]" : "text-gray-400 pt-4"
                }`}
              >
                Mã OTP
              </label>
              {errors.otp && (
                <p className="text-[#ef4d38] pl-2">{errors.otp.message}</p>
              )}
            </div>
          )}
          <motion.button
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full h-14 bg-black text-white rounded-lg"
          >
            {loading ? (
              <span>
                <LoadingOutlined />
              </span>
            ) : (
              <span>Đăng nhập</span>
            )}
          </motion.button>
        </form>
        <div className="absolute right-[-180px] top-2 text-gray-200 hover:text-[#ef4d38] text-[30px]  z-10 ">
          <Link to={"/"}>
            <i className="fa-solid fa-circle-xmark"></i>
          </Link>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default LoginToAdmin;
