import React, { createContext, useEffect, useReducer } from "react";
import { instance } from "../api";
import { useNavigate } from "react-router-dom";
import { Category } from "../interface/category";
import { Action, categoryReducer } from "../reducers/categoryReducers";
import { message, Modal } from "antd";

export type CategoryContextType = {
  state: { categories: Category[] },
  onRemove: (id: string) => void
  handleCategory: (data: Category) => void,
  dispatch: React.Dispatch<Action>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(categoryReducer, { categories: [] })
  const nav = useNavigate()

  const getAllCategory = async () => {
    try {
      const { data } = await instance.get('/categories')
      dispatch({ type: "SET_CATEGORIES", payload: data.data })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    (async () => {
      getAllCategory()
    })()
  }, [])


  const onRemove = async (id: string) => {
    Modal.confirm({
      title: (
        <span className='text-[#ef4d38] '>Xác nhận xóa danh mục</span>
      ),
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn <span className='text-[#ef4d38] font-semibold text-[16px]'>xóa</span> danh mục này không?
        </p>
      ),
      okText: 'Xóa',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#ef4d38', borderColor: '#ef4d38', color: '#fff' },
      },
      cancelButtonProps: {
        style: { backgroundColor: '#fff', color: '#ef4d38', borderColor: '#ef4d38' },
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      icon: null,
      width: 600,
      onOk: async () => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              await instance.delete(`/categories/${id}`)
              dispatch({ type: "REMOVE_CATEGORY", payload: id })
              getAllCategory()
              message.success('Xóa danh mục thành công!')
            } catch (error) {
              console.error(error)
              message.error('Xóa danh mục thất bại!')
            }
            resolve(undefined);
          }, 2000)
        });
      }
    });
  };
  const handleCategory = async (category: Category) => {
    try {
      if (category._id) {
        const { data } = await instance.patch(`/categories/${category._id}`, category)
        dispatch({ type: "EDIT_CATEGORY", payload: data.data })
        message.success('Cập nhật danh mục thành công!')
      } else {
        const { data } = await instance.post('/categories', category)
        dispatch({ type: "ADD_CATEGORY", payload: data.data })
        message.success('Thêm mới danh mục thành công!')
      }
      getAllCategory()
      nav('/admin/categories')
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <CategoryContext.Provider value={{ state, dispatch, onRemove, handleCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

