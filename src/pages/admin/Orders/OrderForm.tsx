import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { Check, MoveLeft } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { instance } from '../../../api';
import { OrderContext, OrderContextType } from '../../../contexts/OrderContext';
import { ProductContext, ProductContextType } from '../../../contexts/ProductContext';
import { Order } from '../../../interface/order';
import { CartItem } from '../../../reducers/cartReducers';
import { Helmet } from 'react-helmet';
import { getTitleTab } from '../../../contants/client';
const { Option } = Select;

const OrderForm = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const { formatPrice } = useContext(ProductContext) as ProductContextType;
    const { updateOrderStatus } = useContext(OrderContext) as OrderContextType;
    const { handleSubmit } = useForm<Order>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get(`/orders/${id}`);
                setOrder(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);
    console.log(order?.products)

    const confirmStatusChange = (value: 0 | 1 | 2) => {
        Modal.confirm({
            title: <span className='text-[#ef4d38] '>Xác nhận thay đổi trạng thái</span>,
            content: (
                <p className='dark:text-[#b9b7c0] text-[#685f78]'>
                    Bạn có chắc chắn muốn <span className='text-[#ef4d38] font-semibold text-[16px]'>thay đổi trạng thái</span> đơn hàng này không?
                </p>
            ),
            okText: 'Xác nhận',
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
                        if (order) {
                            const updatedOrder: Order = {
                                ...order,
                                orderStatus: value,
                            };
                            setOrder(updatedOrder);
                        }
                        resolve(undefined);
                    }, 1666);
                });
            }
        });
    };


    const onSubmit = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            if (order) {
                await updateOrderStatus(order._id!, order.orderStatus);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className='relative mt-20' onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center fixed bg-white z-9 top-0 shadow-md p-4 w-full min-w-[1000px] left-0 right-0">
                    <Helmet>
                        <title>{getTitleTab('Quản lí đơn hàng')}</title>
                    </Helmet>
                    <h2 className="text-xl ml-[276px]">
                        Chi tiết đơn hàng: {order?.code}
                    </h2>
                    <div className="flex gap-2">
                        <Link to="/admin/orders">
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
                {order && (
                    <div className='space-y-5'>
                        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                            <div className='flex justify-between items-center'>
                                <p className="text-gray-700 text-xl">
                                    <span>Thời gian đặt hàng: </span>
                                    <strong className="text-blue-600">
                                        {dayjs(order.createdAt).format('HH:mm - DD/MM/YYYY')}
                                    </strong>
                                </p>
                                <div className='w-[230px]'>
                                    <Select value={order.orderStatus} onChange={confirmStatusChange} className='h-12 w-full'>
                                        <Option value={0}><p className='text-[#ef4d38] text-lg'>Chưa xác nhận</p></Option>
                                        <Option value={1}><p className='text-green-500 text-lg'>Đã xác nhận</p></Option>
                                        <Option value={2}><p className='text-blue-500 text-lg'>Hoàn tất</p></Option>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2 text-lg">
                                <div className="flex items-center">
                                    <p>Họ và Tên: </p>
                                    <p>{order?.shippingDetails.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <p>Số điện thoại: </p>
                                    <p>{order?.shippingDetails.phone}</p>
                                </div>
                                <div className="flex items-center">
                                    <p>Địa chỉ: </p>
                                    <p> {`${order?.shippingDetails.address.streetAddress}, ${order?.shippingDetails.address.ward}, ${order?.shippingDetails.address.district}, ${order?.shippingDetails.address.province}`}</p>
                                </div>
                                <div className="flex items-center">
                                    <p>Ghi chú: </p>
                                    <p> {order?.description}</p>
                                </div>
                            </div>
                            <p className="text-2xl text-right">
                                Tổng tiền:
                                <span className="text-[#ef4d38] font-semibold"> {formatPrice(order.totalPrice)}</span>
                            </p>
                        </div>
                        <div>
                            <div className='flex flex-wrap justify-between '>
                                {order.products.map((product: CartItem, index) => {
                                    const colorDetails = product.product?.colors.find(
                                        (item) => item.color === product.color
                                    );
                                    const productPrice = formatPrice(Number(colorDetails?.discountPrice || 0) * product.quantity);
                                    const accessoryPrice = formatPrice(Number(product.accessory?.discountPrice || 0) * product.quantity);
                                    const isAccessory = product.accessory
                                    console.log(isAccessory)
                                    if (isAccessory) {
                                        return (
                                            <div
                                                key={index}
                                                className="flex gap-4 mb-4 bg-white p-4 rounded-lg shadow-lg"
                                            >
                                                <div className="relative w-[166px]">
                                                    <p className="absolute z-1 top-[-10px] right-[-10px] rounded-full bg-[#ef4d38] text-white  w-6 h-6  flex justify-center items-center text-xs ">
                                                        {product.quantity}
                                                    </p>
                                                    <img
                                                        src={isAccessory.image as string}
                                                        alt={isAccessory.title}
                                                        className="rounded-lg relative w-full"
                                                    />
                                                </div>
                                                <div className="space-y-2 w-[366px]">
                                                    <p className='text-lg '>{isAccessory.title}</p>
                                                    <div>
                                                        <p>Giá: {formatPrice(Number(isAccessory.discountPrice))}</p>
                                                        <p className=' text-[#ef4d38] font-semibold text-lg '>{accessoryPrice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                key={index}
                                                className="flex gap-4 mb-4 bg-white p-4 rounded-lg shadow-lg"
                                            >
                                                <div className="relative w-[166px]">
                                                    <p className="absolute z-1 top-[-10px] right-[-10px] rounded-full bg-[#ef4d38] text-white w-6 h-6 flex justify-center items-center text-xs">
                                                        {product.quantity}
                                                    </p>
                                                    <img
                                                        src={colorDetails?.image as string}
                                                        alt={product.product?.title}
                                                        className="rounded-lg relative w-full"
                                                    />
                                                </div>
                                                <div className="w-[366px] text-[16px]">
                                                    <p className="text-lg">{product.product?.title}</p>
                                                    <div className='flex items-center'>
                                                        <p className=' text-gray-600'>Màu: {product.color}</p>
                                                        {product.size && <p className=' text-gray-600'> / Size: {product.size}</p>}
                                                    </div>
                                                    <p>Giá: {formatPrice(Number(colorDetails?.discountPrice))}</p>
                                                    <p className='text-lg text-[#ef4d38] font-semibold'>{productPrice}</p>
                                                </div>
                                            </div>
                                        )

                                    }
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default OrderForm;
