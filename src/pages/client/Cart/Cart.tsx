import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getTitleTab } from '../../../contants/client';
import { CartContext, CartContextType } from '../../../contexts/CartContext';
import { ProductContext, ProductContextType } from '../../../contexts/ProductContext';
import { CartItem } from '../../../reducers/cartReducers';

const Cart = () => {
    const { state, getCart, removeFromCart, updateQuantity } = useContext(CartContext) as CartContextType;
    const { formatPrice } = useContext(ProductContext) as ProductContextType;

    useEffect(() => {
        getCart();
    }, [getCart]);

    const incrementQuantity = (
        productId: string | undefined,
        size: string = '',
        color: string = '',
        currentQuantity: number,
        isAccessory: boolean
    ) => {
        updateQuantity(productId!, size, color, currentQuantity + 1, isAccessory);
    };

    const decrementQuantity = (
        productId: string | undefined,
        size: string = '',
        color: string = '',
        currentQuantity: number,
        isAccessory: boolean
    ) => {
        if (currentQuantity > 1) {
            updateQuantity(productId!, size, color, currentQuantity - 1, isAccessory);
        }
    };
    return (
        <div className='max-w-[768px] md:max-w-[1024px] p-4 md:p-6 lg:p-0 lg:max-w-[1280px] mx-auto flex justify-between flex-wrap  min-h-[300px] gap-y-10 -mt-6 lg:-mt-0'>
            <Helmet>
                <title>{getTitleTab('Giỏ hàng')}</title>
            </Helmet>
            <div className='w-full lg:w-[62%] '>
                <p className='text-2xl mb-4'>Giỏ hàng</p>
                <div className='flex flex-col space-y-4 md:p-3 lg:p-0'>
                    {state.products.length > 0 ? (
                        state.products.map((item: CartItem, index) => {
                            const isAccessory = item.accessory;
                            if (isAccessory) {
                                return (
                                    <div key={isAccessory._id} className='flex flex-wrap justify-between border-b-2 pb-4 items-start gap-y-4'>
                                        <div className='flex space-x-4 max-w-full md:max-w-[50%]'>
                                            <Link to={`/phu-kien-xe-dap/${isAccessory.slug}`} className="shrink-0">
                                                <img
                                                    src={isAccessory.image as string}
                                                    alt={isAccessory.title}
                                                    className="w-[130px] md:w-[146px] rounded-lg"
                                                />
                                            </Link>
                                            <div className="flex-1">
                                                <Link to={`/phu-kien-xe-dap/${isAccessory.slug}`}>
                                                    <p className='text-[16px] md:text-[17px] hover:text-[#ef4d38] mb-1 md:w-[260px] line-clamp-2 md:line-clamp-none'>{isAccessory.title}</p>
                                                </Link>
                                                <p className='text-[14px] md:text-[16px] text-gray-600'>Đơn giá: {formatPrice(Number(isAccessory.discountPrice))}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center w-[130px] border-2 rounded-lg">
                                            <Button
                                                type="text"
                                                icon={<MinusOutlined />}
                                                onClick={() => decrementQuantity(isAccessory._id, '', '', item.quantity, true)}
                                                className="w-8 h-8 flex items-center justify-center"
                                            />
                                            <span className="text-lg  text-center w-12">{item.quantity}</span>
                                            <Button
                                                type="text"
                                                icon={<PlusOutlined />}
                                                onClick={() => incrementQuantity(isAccessory._id, '', '', item.quantity, true)}
                                                className="w-8 h-8 flex items-center justify-center"
                                            />
                                        </div>
                                        <div className='text-xl md:w-[100px] flex md:flex-col items-center gap-4 md:gap-6'>
                                            <p className='text-[#ef4d38]'>{formatPrice((isAccessory.discountPrice || 0) * item.quantity)}</p>
                                            <button>
                                                <Trash2 onClick={() => {
                                                    removeFromCart(isAccessory._id as string, '', '', true);
                                                }}
                                                    className='hover:text-[#ef4d38] cursor-pointer' />
                                            </button>
                                        </div>
                                    </div>
                                );
                            } else {
                                const colorDetails = item.product?.colors.find(colorItem => colorItem.color === item.color);
                                const productPrice = Number(colorDetails?.discountPrice || 0) * item.quantity;

                                return (
                                    <div key={`${item.product?._id}-${item.color}-${index}`} className='flex flex-wrap justify-between border-b-2 pb-4 items-start gap-y-4'>
                                        <div className='flex items-start  space-x-4 max-w-full md:max-w-[50%]'>
                                            <Link to={`/xe-dap-the-thao/${item.product?.slug}`} className="shrink-0">
                                                <img
                                                    src={colorDetails?.image as string}
                                                    alt={item.product?.title}
                                                    className="w-[130px] md:w-[146px] rounded-lg"
                                                />
                                            </Link>
                                            <div className="flex flex-col">
                                                <Link to={`/xe-dap-the-thao/${item.product?.slug}`}>
                                                    <p className='text-[16px] md:text-[17px] hover:text-[#ef4d38] mb-1 md:w-[260px] line-clamp-2 md:line-clamp-none'>{item.product?.title}</p>
                                                </Link>
                                                <div className='flex items-center'>
                                                    <p className='text-[14px] md:text-[16px] text-gray-600 mb-1'>Màu: {item.color}</p>
                                                    {item.size && <p className='text-[14px]  md:text-[16px] text-gray-600 mb-1'> / Size: {item.size}</p>}
                                                </div>
                                                <p className='text-[14px] text-gray-600'>Giá: {formatPrice(Number(item.product?.colors[0].discountPrice))}</p>

                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center w-[130px] border-2 rounded-lg md:mt-0">
                                            <Button
                                                type="text"
                                                icon={<MinusOutlined />}
                                                onClick={() => decrementQuantity(item.product?._id, item.size, item.color, item.quantity, false)}
                                                className="w-8 h-8 flex items-center justify-center"
                                            />
                                            <span className="text-lg  text-center w-12">{item.quantity}</span>
                                            <Button
                                                type="text"
                                                icon={<PlusOutlined />}
                                                onClick={() => incrementQuantity(item.product?._id, item.size, item.color, item.quantity, false)}
                                                className="w-8 h-8 flex items-center justify-center"
                                            />
                                        </div>

                                        <div className='text-xl md:w-[100px] flex md:flex-col items-center gap-4 md:gap-6'>
                                            <p className='text-[#ef4d38]'>{formatPrice(productPrice)}</p>
                                            <button>
                                                <Trash2 strokeWidth={2} onClick={() => removeFromCart(item.product?._id as string, item.size as string, item.color as string, false)} className='hover:text-[#ef4d38] cursor-pointer' />
                                            </button>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <div className='text-lg'>
                            <p>Không có sản phẩm nào trong giỏ hàng</p>

                        </div>
                    )}
                </div>
            </div>

            {state.products.length > 0 && (
                <div className=' w-full lg:w-[29%] space-y-4'>
                    <p className='text-2xl'>Tóm tắt</p>
                    <div className='flex justify-between border-b pb-2'>
                        <p className='text-[16px]'>Tổng tiền:</p>
                        <p className='text-xl  font-semibold text-[#ef4d38]'>{formatPrice(Number(state.totalPrice))}</p>
                    </div>
                    <p className='text-[14px] text-gray-600'>
                        Lưu ý: BossBoss2368 sẽ liên hệ lại cho bạn để chốt đơn hàng sau khi bạn đặt hàng
                    </p>
                    <Link to={`/thanh-toan/${state.cartId}`}>
                        <motion.button
                            className={`w-full h-13 custom-button rounded-full mt-10`}
                            type='button'
                            whileHover={{
                                scale: 1.01,
                                backgroundColor: '#f39c12',
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Đặt hàng
                        </motion.button>
                    </Link>
                </div>
            )}

            {state.products.length < 1 && (
                <div className='w-full flex justify-center '>
                    <Link to='/xe-dap-the-thao'>
                        <motion.button whileHover={{
                            scale: 1.01,
                            backgroundColor: '#f39c12',
                            transition: { duration: 0.3 },
                        }}
                            whileTap={{ scale: 0.95 }} className='custom-button h-14 w-72 rounded-full'>Tiếp tục mua sắm</motion.button>
                    </Link>
                </div>
            )}
        </div>

    );
};

export default Cart;
