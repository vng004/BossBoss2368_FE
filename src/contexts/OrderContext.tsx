import { message } from 'antd';
import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { instance } from '../api';
import { Order } from '../interface/order';
import { useNavigate } from 'react-router-dom';

export interface Province {
    id: number;
    full_name: string;
}

export interface District {
    id: number;
    full_name: string;
}

export interface Ward {
    id: number;
    full_name: string;
}

export type OrderContextType = {
    orders: Order[];
    fetchOrders: () => void;
    updateOrderStatus: (id: string, status: number) => Promise<void>;
    provinces: Province[];
    districts: District[];
    wards: Ward[];
    selectedProvince: number | null;
    selectedDistrict: number | null;
    selectedWard: number | null;
    handleProvinceChange: (provinceId: number) => void;
    handleDistrictChange: (districtId: number) => void;
    handleWardChange: (wardId: number) => void;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const nav = useNavigate()
    const URL_API = import.meta.env.VITE_API_ESGOO_URL;
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
    const [selectedWard, setSelectedWard] = useState<number | null>(null);

    const fetchOrders = async () => {
        try {
            const res = await instance.get('/orders', {
                params: {
                    _sort: "createdAt",
                    _order: "desc"
                }
            });
            const ordersData = res.data.docs || [];
            setOrders(ordersData);
        } catch (error) {
            console.error(error);
        }
    };
    

    useEffect(() => {
        fetchOrders();
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            fetchDistricts();
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetchWards();
        }
    }, [selectedDistrict]);

    const updateOrderStatus = async (_id: string, status: number) => {
        try {
            await instance.patch(`/orders/${_id}/status`, { orderStatus: status });
            fetchOrders();
            message.success('Cập nhật trạng thái đơn hàng thành công');
            nav("/admin/orders")
        } catch (error) {
            console.log(error);
            message.error("Trạng thái không thể thay đổi khi đã hoàn tất")
        }
    };

    const fetchProvinces = async () => {
        try {
            const res = await axios.get(`${URL_API}/1/0.htm`);
            setProvinces(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDistricts = async () => {
        try {
            const res = await axios.get(`${URL_API}/2/${selectedProvince}.htm`);
            setDistricts(res.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchWards = async () => {
        try {
            const res = await axios.get(`${URL_API}/3/${selectedDistrict}.htm`);
            setWards(res.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleProvinceChange = (provinceId: number) => {
        setSelectedProvince(provinceId);
        setSelectedDistrict(null); // Reset selectedDistrict
        setSelectedWard(null); // Reset selectedWard
        setDistricts([]); // Clear districts
        setWards([]); // Clear wards
    };

    const handleDistrictChange = (districtId: number) => {
        setSelectedDistrict(districtId);
        setSelectedWard(null); // Reset selectedWard when selecting a new district
        setWards([]); // Clear wards when selecting a new district
    };

    const handleWardChange = (wardId: number) => {
        setSelectedWard(wardId);
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                fetchOrders,
                updateOrderStatus,
                provinces,
                districts,
                wards,
                selectedProvince,
                selectedDistrict,
                selectedWard,
                handleProvinceChange,
                handleDistrictChange,
                handleWardChange
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
