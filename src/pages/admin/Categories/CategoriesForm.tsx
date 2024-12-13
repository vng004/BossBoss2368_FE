import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../../api";
import { Category } from "../../../interface/category";
import { categorySchema } from "../../../utils/validation";
import { CategoryContext, CategoryContextType } from "../../../contexts/CategoryContext";
import { LoadingOutlined } from "@ant-design/icons";
import { Check, MoveLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";

const CategoryForm = () => {
  const { handleCategory } = useContext(CategoryContext) as CategoryContextType;
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Category>(
    { resolver: zodResolver(categorySchema) }
  );

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/categories/${id}`);
        reset(data.data);
      })();
    }
  }, [id, reset]);

  const onSubmit = async (data: Category) => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    try {
      await handleCategory({ ...data, _id: id });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg'>
      <Helmet>
          <title>{getTitleTab('Quản lí danh mục')}</title>
        </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <h2 className='text-xl font-semibold'>{id ? "CẬP NHẬT DANH MỤC" : "THÊM MỚI DANH MỤC"}</h2>
        </div>
        <div>
          <div className='text-[16px] space-y-10'>
            <div>
              <input
                type="text"
                id="title"
                className={`w-full border rounded-lg py-3 px-4 outline-none ${errors.title
                  ? "border-[#ef4d38] placeholder-[#ef4d38] "
                  : "border-gray-200"
                  }`}
                placeholder="Tên danh mục"
                {...register("title", { required: true })}
              />
            </div>
            <div className="flex flex-wrap w-full justify-between items-center">
              <Link to="/admin/categories">
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
};

export default CategoryForm;
