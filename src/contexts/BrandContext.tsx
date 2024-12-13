import React, { createContext, useEffect, useReducer } from "react";
import { instance } from "../api";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import { Brand } from "../interface/brand";
import { Action, brandReducer } from "../reducers/brandReducers";

export type BrandContextType = {
    state: { brands: Brand[] },
    onRemove: (id: string) => void
    handleBrand: (data: Brand) => void,
    dispatch: React.Dispatch<Action>;
    totalBrands: number

}

export const BrandContext = createContext<BrandContextType | undefined>(undefined)

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(brandReducer, { brands: [] })
    const nav = useNavigate()
    const totalBrands = state.brands.length
    
    const getAllBrand = async () => {
        try {
            const { data } = await instance.get('/brands')
            dispatch({ type: "SET_BRANDS", payload: data.data })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        (async () => {
            getAllBrand()
        })()
    }, [])


    const onRemove = async (id: string) => {
        Modal.confirm({
            title: (
                <span className='text-[#ef4d38] '>Xác nhận xóa thương hiệu</span>
            ),
            content: (
                <p className='dark:text-[#b9b7c0] text-[#685f78]'>
                    Bạn có chắc chắn muốn <span className='text-[#ef4d38] font-semibold text-[16px]'>xóa</span> thương hiệu này không?
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
                            await instance.delete(`/brands/${id}`)
                            dispatch({ type: "REMOVE_BRAND", payload: id })
                            message.success('Xóa thương hiệu thành công!')
                        } catch (error) {
                            console.error(error)
                            message.error('Xóa thương hiệu thất bại!')
                        }
                        resolve(undefined);
                    }, 2000);
                });
            }
        });
    };

    const handleBrand = async (brand: Brand) => {
        try {
            if (brand._id) {
                const { data } = await instance.patch(`/brands/${brand._id}`, brand)
                dispatch({ type: "EDIT_BRAND", payload: data.data })
                message.success('Cập nhật thương hiệu thành công!')
            } else {
                const { data } = await instance.post('/brands', brand)
                dispatch({ type: "ADD_BRAND", payload: data.data })
                message.success('Thêm mới thương hiệu thành công!')
            }
            getAllBrand()
            nav('/admin/brands')
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <BrandContext.Provider value={{ state, dispatch, onRemove, handleBrand, totalBrands }}>
            {children}
        </BrandContext.Provider>
    );
}

