import { LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { AutoComplete, Checkbox, Image, Input, Tooltip, TreeSelect } from 'antd';
import { Check, ImagePlus, ImageUp, MoveLeft, Trash2, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../../api";
import { BrandContext, BrandContextType } from "../../../contexts/BrandContext";
import { ProductContext, ProductContextType } from "../../../contexts/ProductContext";
import { Color, Product } from "../../../interface/products";
import { schemaProduct } from "../../../utils/validation";
import { Helmet } from "react-helmet";
import { getTitleTab } from "../../../contants/client";

const ProductForm = () => {
  const { handleProduct, uploadImages, formattedPrices, formattedDiscountPrices, handlePriceChange, handleDiscountPriceChange } = useContext(ProductContext) as ProductContextType;
  const { state } = useContext(BrandContext) as BrandContextType;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>({});
  const [productImages, setProductImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { register, reset, setValue, formState: { errors }, control, watch, handleSubmit } = useForm<Product>({
    defaultValues: {
      sizes: [], colors: [
        {
          color: "",
          price: NaN,
          discountPercentage: 0,
          discountPrice: NaN,
          image: "",
        }
      ],
    }, resolver: zodResolver(schemaProduct)
  });
  const { fields: colors, append, remove } = useFieldArray({ control, name: 'colors' });
  const sizeOptions = ['S', 'M', 'L', 'XL', '2XL'];
  const [valueB, setValueB] = useState<string | undefined>();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await instance.get(`/products/${id}`);
          reset(data.data);
          const imagePreviews = data.data.colors.reduce((acc: { [key: number]: string }, color: Color, index: number) => {
            if (typeof color.image === 'string' && color.image.length) {
              acc[index] = color.image;
            }
            return acc;
          }, {});
          setImagePreviews(imagePreviews);
          setPreviewImages(data.data.images);
          setValueB(data.data.brand)
          setValue("brand", data.data.brand);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProduct();
    }
  }, [id, reset, setValue]);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    return files ? Array.from(files).map(file => URL.createObjectURL(file)) : [];
  };

  const handleProductImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductImages(Array.from(event.target.files || []));
    setPreviewImages(handleFileInput(event));
  };

  const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const [imageUrl] = handleFileInput(event);
      setImagePreviews(prev => ({ ...prev, [index]: imageUrl }));
      setValue(`colors.${index}.image`, file);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
    setPreviewImages(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(prev[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const onSubmit = async (product: Product) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      if (!valueB) {
        setLoading(false);
        return;
      }
      const dataColors = await Promise.all(
        product.colors.map(async (color) => {
          let imageUrl: string = '';

          if (color.image instanceof File) {
            const uploadedImageUrls = await uploadImages([color.image]);
            imageUrl = uploadedImageUrls[0];
          } else if (typeof color.image === 'string' && color.image.length) {
            imageUrl = color.image;
          }
          return { ...color, image: imageUrl };
        })
      );
      let imageUrls: string[] = [];
      if (productImages && productImages.length > 0) {
        imageUrls = await uploadImages(productImages);
      } else {
        imageUrls = previewImages;
      }

      const datadProduct = {
        ...product,
        _id: id!,
        colors: dataColors,
        images: imageUrls,
        brand: valueB,
        sizes: product.sizes,
      };

      handleProduct(datadProduct);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const treeData = state.brands.map(b => ({
    title: b.title,
    value: b._id,
  }));

  const onChangeB = (value: string) => {
    setValueB(value);
    setValue("brand", value);
  };

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const inputRefs = useRef<HTMLInputElement>(null);

  const handleClickImg = (index: number) => {
    if (inputRef.current[index]) {
      inputRef.current[index]?.click();
    }
  };
  const handleClickImgs = () => {
    if (inputRefs.current) {
      inputRefs.current.click();
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title>{getTitleTab('Quản lí xe đạp')}</title>
      </Helmet>
      <div className="relative mt-20">
        <div className="flex justify-between items-center fixed bg-white z-9 top-0 shadow-md p-4 w-full min-w-[1000px] left-0 right-0">
          <h2 className="text-xl font-semibold ml-[276px]">
            {id ? "CẬP NHẬT XE ĐẠP" : "THÊM MỚI XE ĐẠP"}
          </h2>
          <div className="flex gap-2 text-[14px] pr-2">
            <Link to="/admin/products">
              <button type="button" className="custom-button rounded-lg h-11 w-26">
                <MoveLeft />
              </button>
            </Link>
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() =>
                  append({
                    color: "",
                    price: NaN,
                    discountPercentage: 0,
                    discountPrice: NaN,
                    image: "",
                  })
                }
                className={`custom-button rounded-lg px-10 text-white h-11`}
              >
                Thêm màu xe
              </button>
            </div>
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
        <div className="flex justify-between items-start">
          <div className="w-[46%] p-6 bg-white space-y-4">
            <div>
              <p className="text-sm  mb-2">
                Tên sản phẩm <span className="text-[#ef4d38] text-[20px]">*</span>
              </p>
              <input
                id="title"
                type="text"
                className={`w-full border rounded-lg py-3 px-4 outline-none mb-1 border-gray-200 `}
                {...register("title", { required: true })}
              />
              {errors.title && (<p className="text-[#ef4d38]">{errors.title.message}</p>)}
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-[47%]">
                <div>
                  <p className="text-sm mb-2">
                    Thương hiệu <span className="text-[#ef4d38] text-[20px]">*</span>
                  </p>
                  <TreeSelect
                    value={valueB}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    placeholder="Vui lòng chọn"
                    treeDefaultExpandAll
                    onChange={(value) => {
                      onChangeB(value);
                    }}
                    className="h-11 w-full"
                    allowClear
                  />
                  {errors.brand && <span className="text-[#ef4d38]">{errors.brand?.message}</span>}
                </div>
              </div>

              <div className="w-[47%]">
                <p className="text-sm mb-2">
                  Đã bán
                </p>
                <input
                  id="salesCount"
                  defaultValue={0}
                  className={`w-full border rounded-lg py-3 px-3 outline-none border-gray-200  `}
                  {...register("salesCount", { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm ">
                Kích thước
              </p>
              <div className="border p-4 rounded-lg">
                <Controller
                  name="sizes"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <>
                      <Checkbox.Group
                        options={sizeOptions.map(size => ({ label: size, value: size }))}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className=" text-sm ">Ảnh mô tả sản phẩm</p>
              <div onClick={handleClickImgs} className="w-full text-gray-600 flex flex-col items-center justify-center cursor-pointer border-2 hover:border-[#ef4d38] rounded-lg border-dashed p-2">
                <ImageUp size={40} strokeWidth={1} className="text-[#ef4d38]" />
                <p>Nhấn để tải nhiều ảnh</p>
              </div>
              <input
                style={{ display: "none" }}
                ref={inputRefs}
                id="productImages"
                type="file"
                accept="image/*"
                multiple
                className="w-full border rounded-lg py-3 px-4 cursor-pointer"
                onChange={handleProductImagesChange}
              />
              <div className="flex flex-wrap justify-center gap-5 mt-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative">
                    <Image src={src} alt={`Xem trước ${index + 1}`} className="rounded-lg" width={153} />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveImage(index);
                      }}
                      className="absolute top-1 right-1 bg-[#ef4d38] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm ">Mô tả sản phẩm</p>
              <textarea
                id="description"
                className={`w-full border rounded-lg py-3 px-4 outline-none border-gray-200  `}
                {...register("description")}
                rows={3}
              />
            </div>
          </div>

          <div className="w-[52%] space-y-4 relative">
            {colors.map((field, index) => (
              <div key={field.id} className="p-4 bg-white relative border rounded-lg space-y-6">
                <div className="flex justify-between gap-6">
                  <div>
                    {colors.length > 1 && (
                      <Tooltip title="Xóa"
                      >
                        <Trash2
                          onClick={() => remove(index)}
                          className="absolute text-xl top-2 right-2 text-[#ef4d38]"
                        />
                      </Tooltip>
                    )}
                    <p className=" text-sm  mb-2">
                      Ảnh sản phẩm <span className="text-[#ef4d38] text-[20px]">*</span>
                    </p>
                    <div onClick={() => handleClickImg(index)} className="cursor-pointer border-2 hover:border-[#ef4d38] rounded-lg border-dashed flex justify-center items-center  w-[255px] min-h-[190px] h-auto relative mb-10">
                      <div>
                        {imagePreviews[index] ? (
                          <img src={imagePreviews[index]} width={250} className="rounded-lg" />
                        ) : (
                          <div className="w-[260px] h-full  text-gray-600  flex flex-col gap-2 items-center justify-center">
                            <ImagePlus size={60} strokeWidth={1} className="text-[#ef4d38]" />
                            <p>Nhấn để tải ảnh</p>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-2 left-2 flex items-center justify-center bg-[#ef4d38] text-white rounded-full w-9 h-9">
                        <p className="text-sm font-semibold">
                          {Math.round(Number(watch(`colors.${index}.discountPercentage`, 0)) || 0)}%
                        </p>
                      </div>
                    </div>
                    <input
                      ref={(ef) => (inputRef.current[index] = ef)}
                      id={`colors-${index}-image`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      style={{ display: "none" }}
                    />
                    {errors.colors?.[index]?.image && (<p className="text-[#ef4d38]">{errors.colors?.[index]?.image.message}</p>)}
                  </div>
                  <div className="space-y-2">
                    <div >
                      <p className=" text-sm  mb-2">
                        Giá sản phẩm <span className="text-[#ef4d38] text-[20px]">*</span>
                      </p>
                      <input
                        type="number"
                        {...register(`colors.${index}.price`, {
                          valueAsNumber: true,
                          onChange: (e) => {
                            handlePriceChange(e, index);
                          },
                          onBlur: (e) => {
                            if (isNaN(Number(e.target.value))) {
                              setValue(`colors.${index}.price`, 0);
                            }
                          },
                        })}
                        className={`w-1/2 border text-gray-500 rounded-tl-[6px] rounded-bl-[6px] py-3 px-3 outline-none border-gray-200 `}
                      />
                      <input
                        type="text"
                        value={`${formattedPrices[index] || ''} đ`}
                        readOnly disabled
                        className="w-1/2 border rounded-tr-[6px] rounded-br-[6px] py-3 px-3"
                      />
                      {errors.colors?.[index]?.price && (<p className="text-[#ef4d38]">{errors.colors?.[index]?.price.message}</p>)}
                    </div>

                    <div >
                      <p className="text-sm  mb-2">Giá khuyến mãi <span className="text-[#ef4d38] text-[20px]">*</span></p>
                      <input
                        type="number"
                        {...register(`colors.${index}.discountPrice`, {
                          valueAsNumber: true,
                          onChange: (e) => handleDiscountPriceChange(e, index, watch, setValue),
                          onBlur: (e) => {
                            if (isNaN(Number(e.target.value))) {
                              setValue(`colors.${index}.discountPrice`, 0);
                            }
                          },
                        })}
                        className={`w-1/2 border text-gray-500 rounded-tl-[6px] rounded-bl-[6px]  py-3 px-3 outline-none
                        border-gray-200 `}
                      />
                      <input
                        type="text"
                        value={`${formattedDiscountPrices[index] || ''} đ`}
                        readOnly disabled
                        className="w-1/2 border rounded-tr-[6px] rounded-br-[6px] py-3 px-3"
                      />
                      {errors.colors?.[index]?.discountPrice && (<p className="text-[#ef4d38]">{errors.colors?.[index]?.discountPrice.message}</p>)}
                    </div>
                    <div >
                      <p className="text-sm  mb-2">
                        Màu sắc <span className="text-[#ef4d38] text-[20px]">*</span>
                      </p>
                      <Controller
                        name={`colors.${index}.color`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <AutoComplete
                            {...field}
                            className="w-full"
                            showSearch
                            options={[
                              { value: "Trắng" },
                              { value: "Đen" },
                              { value: "Đỏ" },
                              { value: "Xám" },
                              { value: "Hồng" },
                              { value: "Xanh lá" },
                              { value: "Xanh dương" },
                              { value: "Vàng" },
                              { value: "Bạc" },
                              { value: "Nâu" },
                              { value: "Tím" },
                            ]}
                            onChange={field.onChange}
                            value={field.value}
                          >
                            <Input
                              className="capitalize py-3"
                              placeholder="Vui lòng chọn"
                            />
                          </AutoComplete>
                        )}
                      />
                      {errors.colors?.[index]?.color && (<p className="text-[#ef4d38] mt-4">{errors.colors?.[index]?.color.message}</p>)}
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
