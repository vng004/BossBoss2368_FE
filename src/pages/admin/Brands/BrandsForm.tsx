import { LoadingOutlined } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { instance } from "../../../api";
import { BrandContext, BrandContextType } from "../../../contexts/BrandContext";
import { Brand } from "../../../interface/brand";
import { Select } from "antd";
import { CategoryContext, CategoryContextType } from "../../../contexts/CategoryContext";
import { Check, MoveLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema } from "../../../utils/validation";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";

const BrandsForm = () => {
    const { handleBrand } = useContext(BrandContext) as BrandContextType;
    const { state } = useContext(CategoryContext) as CategoryContextType
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<Brand>(
        {resolver:zodResolver(brandSchema)}
    );

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            (async () => {
                const { data } = await instance.get(`/brands/${id}`);
                reset(data.data);
                setValue('category', data.data.category?._id);
            })();
        }
    }, [id, reset, setValue]);

    const onSubmit = async (data: Brand) => {
        setLoading(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
        if (!data.category) {
            setError('Vui lòng chọn');
            setLoading(false);
            return;
        }
        try {
            await handleBrand({ ...data, _id: id });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6 bg-white rounded-lg shadow-lg'>
            <Helmet>
          <title>{getTitleTab('Quản lí thương hiệu')}</title>
        </Helmet>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-xl font-semibold mb-6'>{id ? "CẬP NHẬT THƯƠNG HIỆU" : "THÊM MỚI THƯƠNG HIỆU"}</h2>
                <div>
                    <div className='text-[16px] space-y-10'>
                        <div>
                            <input
                                type="text"
                                id="title"
                                className={`w-full border rounded-lg py-3 px-4 outline-none ${errors.title
                                    ? "border-[#ef4d38] placeholder-[#ef4d38] "
                                    : "border-gray-200 focus:ring-0"
                                    }`}
                                placeholder="Tên danh mục"
                                {...register("title", { required: true })}
                            />
                        </div>
                        < Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                    placeholder="Chọn danh mục"
                                    className="h-12 w-full"
                                >
                                    {state.categories.map((c, index) => (
                                        <Select.Option key={index} value={c._id}>
                                            {c.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                        {error && <span className="text-[#ef4d38]">{error}</span>}

                        <div className="flex flex-wrap w-full justify-between items-center">
                            <Link to="/admin/brands">
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
                </div>
            </form>
        </div>
    );
}

export default BrandsForm