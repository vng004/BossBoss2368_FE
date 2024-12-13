import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Check, ImageUp, MoveLeft, X } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../api";
import { ProductContext, ProductContextType } from "../../../contexts/ProductContext";
import { Banner } from "../../../interface/banner";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";

const BannerForm = () => {
    const { handleSubmit, reset } = useForm<Banner>();
    const [image, setImage] = useState<File[]>([]);
    const [previewImg, setPreview] = useState<string[]>([]);
    const { uploadImages } = useContext(ProductContext) as ProductContextType;
    const { id } = useParams();
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<HTMLInputElement>(null);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        return files ? Array.from(files).map(file => URL.createObjectURL(file)) : [];
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(Array.from(event.target.files || []));
        setPreview(handleInput(event));
    }

    const handleRemoveImg = (index: number) => {
        const updateImg = [...image];
        updateImg.splice(index, 1);
        setImage(updateImg);
        setPreview(prev => {
            const newPreview = [...prev];
            URL.revokeObjectURL(prev[index]);
            newPreview.splice(index, 1);
            return newPreview;
        });
    }

    useEffect(() => {
        (async () => {
            if (id) {
                try {
                    const res = await instance.get(`banners/${id}`);
                    reset(res.data);
                    setPreview(res.data.images);
                } catch (error) {
                    console.log(error);
                }
            }
        })();
    }, [id, reset]);

    const onSubmit = async (data: Banner) => {
        try {
            setLoading(true)
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
            let dataUrls: string[] = [];
            if (image && image.length > 0) {
                dataUrls = await uploadImages(image);
            } else {
                dataUrls = previewImg;
            }
            data.images = dataUrls;

            let res;
            if (data._id) {
                res = await instance.patch(`/banners/${data._id}`, data);
                message.success("Cập nhật banner thành công!");
            } else {
                res = await instance.post("/banners", data);
                message.success("Thêm banner mới thành công!");
            }

            reset(res.data);
            nav('/admin/banner');
        } catch (error) {
            console.log(error);
            message.error("Có lỗi xảy ra. Vui lòng thử lại!");
            setLoading(false);

        }
    }

    const handleClickImg = () => {
        if (inputRefs.current) {
            inputRefs.current.click();
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Helmet>
                <title>{getTitleTab('Quản lí banner')}</title>
            </Helmet>
            <div className="flex flex-wrap justify-center gap-6">
                {previewImg.map((img, index) => (
                    <div key={index} className="relative mb-10 hover:shadow-2xl">
                        <img src={img} alt={`Xem trước ${index + 1}`} className="w-[390px] bg-white  p-6  rounded-lg" />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRemoveImg(index);
                            }}
                            className="absolute top-1 right-1 text-[#ef4d38]"
                        >
                            <X size={22} strokeWidth={3} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="bg-white p-6 space-y-6 shadow-lg">
                <div onClick={handleClickImg} className="w-full text-gray-600 flex flex-col items-center justify-center cursor-pointer border-2 hover:border-[#ef4d38] rounded-lg border-dashed p-2">
                    <ImageUp size={40} strokeWidth={1} className="text-[#ef4d38]" />
                    <p>Nhấn để tải nhiều ảnh</p>
                </div>
                <input
                    style={{ display: "none" }}
                    ref={inputRefs}
                    type="file"
                    multiple
                    onChange={handleImageChange} />
                <div className="flex justify-between mt-4">
                    <Link to="/admin/banner">
                        <button type="button" className="custom-button rounded-lg h-12 w-30">
                            <MoveLeft />
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className={`custom-button rounded-lg w-[85%] h-12`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span><LoadingOutlined /></span>
                        ) : (
                            <span><Check size={18} /></span>
                        )}
                        Lưu
                    </button>
                </div>
            </div>
        </form>
    );
}

export default BannerForm;
