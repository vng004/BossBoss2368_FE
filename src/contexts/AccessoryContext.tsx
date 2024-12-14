import { message, Modal } from "antd";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api";
import { Accessory } from "../interface/accessory";
import { accessoryReducer, Action } from "../reducers/accessory";

export type AccessoryContextType = {
  state: { accessories: Accessory[] };
  onRemove: (id: string) => void;
  handleAccessory: (data: Accessory) => void;
  dispatch: React.Dispatch<Action>;
  filterAccessories: (
    page: number,
    limit: number,
    priceRange?:
      | "priceOne"
      | "priceTwo"
      | "priceThree"
      | "priceFour"
      | "priceFive"
      | undefined,
    sortByDate?: "latest",
    onSale?: boolean
  ) => void;
  listAccessories: Accessory[];
  totalPages: number;
  currentPage: number;
  totalDocs: number;
  getAllAccessory: (page: number, limit: number) => void;
};

export const AccessoryContext = createContext<AccessoryContextType | undefined>(
  undefined
);

export const AccessoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(accessoryReducer, { accessories: [] });
  const [listAccessories, setListAccessories] = useState<Accessory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const nav = useNavigate();

  useEffect(() => {
    getAllAccessory(1, 6);
    getAccessories();
  }, []);

  const getAccessories = async () => {
    const { data } = await instance.get("/accessories");
    setTotalDocs(data.data.totalDocs);
  };

  const getAllAccessory = async (page: number, limit: number) => {
    try {
      const { data } = await instance.get("/accessories", {
        params: {
          _page: page,
          _limit: limit,
          _sort: "createdAt",
          _order: "asc",
          sortCreatedAt: "latest",
        },
      });
      setTotalPages(data.data.totalPages);
      setListAccessories(data.data.docs);
      setCurrentPage(page);
      dispatch({ type: "SET_ACCESSORIES", payload: data.data.docs });
    } catch (error) {
      console.log(error);
    }
  };

  const filterAccessories = async (
    page: number,
    limit: number,
    priceRange?:
      | "priceOne"
      | "priceTwo"
      | "priceThree"
      | "priceFour"
      | "priceFive",
    sortByDate?: "latest",
    onSale?: boolean
  ) => {
    try {
      const priceQuery = priceRange ? `&priceRange=${priceRange}` : "";
      const sortQuery = sortByDate ? `&sortCreatedAt=${sortByDate}` : "";
      const saleQuery = onSale ? `&onSale=true` : "";
      const { data } = await instance.get(
        `/accessories?${priceQuery}${sortQuery}${saleQuery}&_page=${page}&_limit=${limit}`
      );
      setListAccessories(data.data.docs);
      setTotalPages(data.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemove = async (id: string) => {
    Modal.confirm({
      title: <span className="text-[#ef4d38] ">Xác nhận xóa phụ kiện</span>,
      content: (
        <p className="dark:text-[#b9b7c0] text-[#685f78]">
          Bạn có chắc chắn muốn{" "}
          <span className="text-[#ef4d38] font-semibold text-[16px]">xóa</span>{" "}
          phụ kiện này không?
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
              await instance.delete(`/accessories/${id}`);
              dispatch({ type: "REMOVE_ACCESSORY", payload: id });
              getAllAccessory(1, 6);
              message.success("Xóa phụ kiện thành công!");
            } catch (error) {
              console.error(error);
            }
            resolve(undefined);
          }, 666);
        });
      },
    });
  };
  const handleAccessory = async (accessory: Accessory) => {
    try {
      console.log(accessory._id);
      if (accessory._id) {
        const { data } = await instance.patch(
          `/accessories/${accessory._id}`,
          accessory
        );
        dispatch({ type: "EDIT_ACCESSORY", payload: data.data });
        message.success("Cập nhật phụ kiện thành công!");
      } else {
        const { data } = await instance.post("/accessories", accessory);
        dispatch({ type: "ADD_ACCESSORY", payload: data.data });
        message.success("Thêm mới phụ kiện thành công!");
      }
      nav("/admin/accessories");
      getAllAccessory(1, 6);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AccessoryContext.Provider
      value={{
        state,
        dispatch,
        totalDocs,
        onRemove,
        handleAccessory,
        filterAccessories,
        listAccessories,
        totalPages,
        currentPage,
        getAllAccessory,
      }}
    >
      {children}
    </AccessoryContext.Provider>
  );
};
