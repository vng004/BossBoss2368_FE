import { LoadingOutlined } from "@ant-design/icons";
import { TreeSelect } from "antd";
import { Check, ImagePlus, MoveLeft } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../../api";
import { AccessoryContext, AccessoryContextType } from "../../../contexts/AccessoryContext";
import { CategoryContext, CategoryContextType } from "../../../contexts/CategoryContext";
import { ProductContext, ProductContextType } from "../../../contexts/ProductContext";
import { Accessory } from "../../../interface/accessory";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaAccessory } from "../../../utils/validation";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";

const AccessoriesForm = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<Accessory>({
        resolver: zodResolver(schemaAccessory)
    });
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>();
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);
    const { handleAccessory } = useContext(AccessoryContext) as AccessoryContextType;
    const { state } = useContext(CategoryContext) as CategoryContextType;
    const { uploadImages, formattedPrices, formattedDiscountPrices, handlePriceChange, handleAccessoryDiscountChange } = useContext(ProductContext) as ProductContextType;
    const { id } = useParams();
    const [valueC, setValueC] = useState<string | undefined>();

    useEffect(() => {
        (async () => {
            if (id) {
                try {
                    const { data } = await instance.get(`accessories/${id}`);
                    reset(data.data);
                    setValueC(data.data.category);
                    setValue("category", data.data.category);
                    setPreviewImage(data.data.image);
                } catch (error) {
                    console.log(error);
                }
            }
        })();
    }, [id, reset]);
    const onChangeCB = (value: string) => {
        setValueC(value);
        setValue("category", value);
    };

    useEffect(()=>{},[formattedPrices,formattedDiscountPrices])


    const treeData = state.categories.map(c => ({
        title: c.title,
        value: c._id,
    }));
    const calculateDiscountPercentage = (price: number, discountPrice: number) => {
        if (price && discountPrice) {
            return Math.round(((price - discountPrice) / price) * 100);
        }
        return 0;
    };

    const price = watch("price") || 0;
    const discountPrice = watch("discountPrice") || 0;

    useEffect(() => {
        const percentage = calculateDiscountPercentage(price, discountPrice);
        setDiscountPercentage(percentage);
    }, [price, discountPrice]);

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        return files ? Array.from(files).map(file => URL.createObjectURL(file)) : [];
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const [imageUrl] = handleFileInput(event);
            setPreviewImage(imageUrl);
            setValue("image", file);
        }
    };
    const onSubmit = async (data: Accessory) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!valueC) {
            setLoading(false);
            return;
        }
        try {
            let imageUrl: string = '';
            if (data.image && data.image instanceof File) {
                const uploadedImageUrls = await uploadImages([data.image]);
                imageUrl = uploadedImageUrls[0];
            } else if (typeof data.image === 'string' && data.image.length) {
                imageUrl = data.image;
            }
            if (!valueC) {
                setLoading(false);
                return;
            }
            handleAccessory({ ...data, _id: id!, category: valueC, image: imageUrl, discountPercentage: discountPercentage });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Helmet>
                <title>{getTitleTab('Quản lí phụ kiện')}</title>
            </Helmet>
            <div className="flex justify-between items-center bg-white  shadow-md p-4">
                <h2 className="text-xl font-semibold">
                    {id ? "CẬP NHẬT PHỤ KIỆN" : "THÊM MỚI PHỤ KIỆN"}
                </h2>
                <div className="flex gap-2">
                    <Link to="/admin/accessories">
                        <button type="button" className="custom-button rounded-lg h-11 w-26">
                            <MoveLeft />
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className={`custom-button rounded-lg w-26 h-11`}
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
            <div className="flex justify-between items-start mt-10">
                <div className="w-[50%] bg-white p-6 rounded-lg space-y-4 shadow-lg ">
                    <div>
                        <p className=" text-sm mb-3">
                            Tên phụ kiện <span className="text-[#ef4d38] text-[20px]">*</span>
                        </p>
                        <input
                            id="title"
                            type="text"
                            className={`w-full border rounded-lg py-3 px-4 outline-none  border-gray-200`}
                            {...register("title", { required: true })}
                        />
                        {errors.title && (<p className="text-[#ef4d38]">{errors.title.message}</p>)}
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <div className="w-[47%]">
                            <div>
                                <p className="text-sm mb-3">
                                    Danh mục <span className="text-[#ef4d38] text-[20px]">*</span>
                                </p>
                                <TreeSelect
                                    value={valueC}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={treeData}
                                    placeholder="Vui lòng chọn"
                                    treeDefaultExpandAll
                                    onChange={onChangeCB}
                                    className="h-11 w-full"
                                    allowClear
                                />
                                {errors.category && (<p className="text-[#ef4d38]">{errors.category.message}</p>)}
                            </div>
                        </div>

                        <div className="w-[47%]">
                            <p className="text-sm  mb-3">
                                Đã bán
                            </p>
                            <input
                                id="salesCount"
                                defaultValue={0}
                                className={`w-full border rounded-lg py-3 px-4 outline-none border-gray-200  `}
                                {...register("salesCount", { valueAsNumber: true })}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="block text-sm mb-3">Mô tả</p>
                        <textarea
                            rows={5}
                            className="w-full border rounded-lg py-3 px-4 outline-none border-gray-200"
                            {...register("description")}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center w-[45%] p-6 rounded-lg shadow-lg bg-white relative gap-4 ">
                    <div>
                        <div
                            onClick={handleClick}
                            className="cursor-pointer border-2 hover:border-[#ef4d38] rounded-lg border-dashed flex justify-center items-center w-[366px] min-h-[202px] h-auto relative"
                        >
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    className="w-full h-full rounded-lg"
                                    alt="Preview"
                                />
                            ) : (
                                <div className="w-full h-full text-gray-700 flex flex-col gap-2 items-center justify-center">
                                    <ImagePlus size={60} strokeWidth={1} className="text-[#ef4d38]" />
                                    <p>Nhấn để tải ảnh</p>
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex items-center justify-center gap-2 bg-[#ef4d38] text-white rounded-full h-9 w-9">
                                <p>{discountPercentage}%</p>
                            </div>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            ref={inputRef}
                        />
                        {errors.image && (<p className="text-[#ef4d38]">{errors.image.message}</p>)}
                    </div>
                    <div className="w-[366px]">
                        <div>
                            <p className="text-sm mb-3">
                                Giá sản phẩm <span className="text-[#ef4d38] text-[20px]">*</span>
                            </p>
                            <input
                                type="number"
                                {...register(`price`, {
                                    valueAsNumber: true,
                                    onChange: (e) => handlePriceChange(e, 0),
                                    onBlur: (e) => {
                                        if (isNaN(Number(e.target.value))) {
                                            setValue(`price`, 0);
                                        }
                                    },
                                })}
                                className={`w-1/2 border-t border-l border-b text-gray-500 rounded-tl-[6px] rounded-bl-[6px] h-[40px] px-3 outline-none border-gray-200"
                                `}
                            />
                            <input
                                type="text"
                                value={`${formattedPrices[0] || ""} đ`}
                                readOnly
                                disabled
                                className="w-1/2 border rounded-tr-[6px] rounded-br-[6px] h-[40px] px-3"
                            />
                            {errors.price && (<p className="text-[#ef4d38] mb-2">{errors.price.message}</p>)}

                        </div>

                        <div>
                            <p className="text-sm mb-3">
                                Giá khuyến mãi <span className="text-[#ef4d38] text-[20px]">*</span>
                            </p>
                            <input
                                type="number"
                                {...register(`discountPrice`, {
                                    valueAsNumber: true,
                                    onChange: (e) => handleAccessoryDiscountChange(e, setValue),
                                    onBlur: (e) => {
                                        if (isNaN(Number(e.target.value))) {
                                            setValue(`discountPrice`, 0);
                                        }
                                    },
                                })}
                                className={`w-1/2 border-t border-l border-b text-gray-500  rounded-tl-[6px] rounded-bl-[6px] h-[40px] px-3 outline-none  border-gray-200
                                `}
                            />
                            <input
                                type="text"
                                value={`${formattedDiscountPrices[0] || ""} đ`}
                                readOnly
                                disabled
                                className="w-1/2 border rounded-tr-[6px] rounded-br-[6px] h-[40px] px-3"
                            />
                            {errors.discountPrice && (<p className="text-[#ef4d38] mb-1">{errors.discountPrice.message}</p>)}

                        </div>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default AccessoriesForm;
