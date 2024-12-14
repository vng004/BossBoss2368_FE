import { message, Modal } from "antd";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instance } from "../api";
import { Accessory } from "../interface/accessory";
import { Product } from "../interface/products";
import { Action, productReducer } from "../reducers/productReducers";

export type ProductContextType = {
  state: { products: Product[] };
  dispatch: React.Dispatch<Action>;
  onRemove: (id: string) => void;
  formatPrice: (price: number) => string;
  onSale?: boolean;
  filterProducts: (filter: {
    page: number;
    limit: number;
    selectedBrands: string;
    priceRange?:
      | "priceOne"
      | "priceTwo"
      | "priceThree"
      | "priceFour"
      | "priceFive"
      | undefined;
    sortByDate?: "latest";
    isHot?: boolean;
    onSale?: boolean;
  }) => void;
  listProducts: Product[];
  totalPages: number;
  uploadImages: (files: File | File[]) => Promise<string[]>;
  getAllProduct: (page: number, limit: number) => void;
  handleProduct: (data: Product) => void;
  updateProductHot: (productId: string, hotStatus: boolean) => void;
  totalDocs: number;
  formattedPrices: { [key: number]: string };
  formattedDiscountPrices: { [key: number]: string };
  handlePriceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => void;
  handleDiscountPriceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    watch: UseFormWatch<Product>,
    setValue: UseFormSetValue<Product>
  ) => void;
  handleAccessoryDiscountChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<Accessory>
  ) => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(1);
  const navigate = useNavigate();
  const [formattedPrices, setFormattedPrices] = useState<{
    [key: number]: string;
  }>({});
  const [formattedDiscountPrices, setFormattedDiscountPrices] = useState<{
    [key: number]: string;
  }>({});

  const VITE_CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const VITE_UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  useEffect(() => {
    getAllProduct(1, 6);
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await instance.get("/products");
      setTotalDocs(data.data.totalDocs);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProduct = async (page: number, limit: number) => {
    try {
      const { data } = await instance.get("/products", {
        params: {
          _page: page,
          _limit: limit,
          _sort: "createdAt",
          _order: "asc",
          sortCreatedAt: "latest",
        },
      });
      setTotalPages(data.data.totalPages);
      setListProducts(data.data.docs);
      dispatch({ type: "SET_PRODUCTS", payload: data.data.docs });
    } catch (error) {
      console.error(error);
    }
  };

  const filterProducts = async (filters: {
    page: number;
    limit: number;
    isHot?: boolean;
    selectedBrands?: string;
    priceRange?: string;
    sortByDate?: "latest";
    onSale?: boolean;
  }) => {
    try {
      const brandQuery = filters.selectedBrands
        ? `&brand=${filters.selectedBrands}`
        : "";
      const priceQuery = filters.priceRange
        ? `&priceRange=${filters.priceRange}`
        : "";
      const sortQuery = filters.sortByDate
        ? `&sortCreatedAt=${filters.sortByDate}`
        : "";
      const hotQyery = filters.isHot ? `&isHot=true` : "";
      const saleQyery = filters.onSale ? `&onSale=true` : "";

      const { data } = await instance.get(
        `/products?${brandQuery}${priceQuery}${sortQuery}${hotQyery}${saleQyery}&_page=${filters.page}&_limit=${filters.limit}`
      );

      setTotalPages(data.data.totalPages);
      setListProducts(data.data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProduct = async (product: Product) => {
    try {
      if (product._id) {
        const { data } = await instance.patch(
          `/products/${product._id}`,
          product
        );
        dispatch({ type: "EDIT_PRODUCT", payload: data.data });
        message.success("Cập nhật sản phẩm thành công!");
      } else {
        const { data } = await instance.post("/products", product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
        message.success("Thêm sản phẩm mới thành công!");
      }
      getAllProduct(1, 6);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const onRemove = async (id: string) => {
    Modal.confirm({
      title: <span className="text-[#ef4d38] ">Xác nhận xóa sản phẩm</span>,
      content: (
        <p className="dark:text-[#b9b7c0] text-[#685f78]">
          Bạn có chắc chắn muốn{" "}
          <span className="text-[#ef4d38] font-semibold text-[16px]">xóa</span>{" "}
          sản phẩm này không?
        </p>
      ),
      okText: "Xóa",
      okType: "danger",
      okButtonProps: {
        style: {
          backgroundColor: "#ef4d38",
          borderColor: "#ef4d38",
          color: "#fff",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#fff",
          color: "#ef4d38",
          borderColor: "#ef4d38",
        },
      },
      cancelText: "Hủy",
      centered: true,
      maskClosable: false,
      icon: null,
      width: 600,
      onOk: async () => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              await instance.delete(`/products/${id}`);
              dispatch({ type: "REMOVE_PRODUCT", payload: id });
              getAllProduct(1, 6);
              message.success("Xóa sản phẩm thành công!");
            } catch (error) {
              console.error(error);
              message.error("Xảy ra lỗi khi xóa sản phẩm!");
            }
            resolve(undefined);
          }, 666);
        });
      },
    });
  };

  const formatPrice = (price: number): string => {
    if (price === undefined || price === null) {
      return "";
    }
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const uploadImages = async (files: File | File[]): Promise<string[]> => {
    const fileArray = Array.isArray(files) ? files : [files];
    const formDataPromises = fileArray.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", VITE_UPLOAD_PRESET);
      return fetch(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json());
    });
    try {
      const results = await Promise.all(formDataPromises);
      return results.map((result) => result.secure_url);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  // Hàm xử lý định dạng giá
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const price = parseFloat(e.target.value) || 0;
    const formatted = price.toLocaleString("vi-VN");
    setFormattedPrices((prevPrices) => ({
      ...prevPrices,
      [idx]: formatted,
    }));
  };

  // Hàm xử lý định dạng giá giảm
  const handleDiscountPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    watch: UseFormWatch<Product>,
    setValue: UseFormSetValue<Product>
  ) => {
    const discountedPrice = parseFloat(e.target.value) || 0;
    const price = watch(`colors.${idx}.price`, 0);
    const discountPercentage =
      price > 0 ? ((price - discountedPrice) / price) * 100 : 0;
    setValue(`colors.${idx}.discountPercentage`, discountPercentage);
    const formattedDiscount = discountedPrice.toLocaleString("vi-VN");
    setFormattedDiscountPrices((prevDiscounts) => ({
      ...prevDiscounts,
      [idx]: formattedDiscount,
    }));
  };

  const handleAccessoryDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<Accessory>
  ) => {
    const discountedPrice = parseFloat(e.target.value) || 0;

    setValue("discountPrice", discountedPrice);

    const formattedDiscount = discountedPrice.toLocaleString("vi-VN") + " đ";
    setFormattedDiscountPrices((prevDiscounts) => ({
      ...prevDiscounts,
      [0]: formattedDiscount,
    }));
  };

  const updateProductHot = async (productId: string, hotStatus: boolean) => {
    Modal.confirm({
      title: (
        <span className="text-[#ef4d38] ">Xác nhận thay đổi trạng thái</span>
      ),
      content: (
        <p className="dark:text-[#b9b7c0] text-[#685f78]">
          Bạn có chắc chắn muốn thay đổi trạng thái sản phẩm không?
        </p>
      ),
      okText: "Xác nhận",
      okType: "danger",
      okButtonProps: {
        style: {
          backgroundColor: "#ef4d38",
          borderColor: "#ef4d38",
          color: "#fff",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#fff",
          color: "#ef4d38",
          borderColor: "#ef4d38",
        },
      },
      cancelText: "Hủy",
      centered: true,
      maskClosable: false,
      icon: null,
      width: 600,
      onOk: async () => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              await instance.patch(`products/${productId}/hot`, {
                hot: hotStatus,
              });
              dispatch({
                type: "UPDATE_PRODUCT_HOT",
                payload: { productId, hotStatus },
              });
              getAllProduct(1, 6);
            } catch (error) {
              console.log(error);
            }
            resolve(undefined);
          }, 1000);
        });
      },
    });
  };

  return (
    <ProductContext.Provider
      value={{
        getAllProduct,
        state,
        dispatch,
        onRemove,
        handleProduct,
        formatPrice,
        filterProducts,
        listProducts,
        updateProductHot,
        totalPages,
        uploadImages,
        formattedPrices,
        formattedDiscountPrices,
        handlePriceChange,
        handleDiscountPriceChange,
        handleAccessoryDiscountChange,
        totalDocs,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
