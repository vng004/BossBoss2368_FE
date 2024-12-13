import { SnippetsOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Bike, Earth, ImagePlay, LayoutDashboard, Network, Wrench } from 'lucide-react';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../../../scss/Sidebar.scss';
import { logo2 } from "../../../contants/client";
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const Sidebar_Admin = () => {

    const [collapsed, setCollapsed] = useState(false);

    const items: MenuItem[] = [
        getItem(<NavLink to={'/admin'} >Bảng tổng hợp</NavLink>, '1', <LayoutDashboard width={16} />),
        getItem('Xe đạp', 'sub1', <Bike width={16} />, [
            getItem(<NavLink to={'/admin/products'}>Danh sách xe đạp</NavLink>, '3'),
            getItem(<NavLink to={'/admin/products-add'}>Thêm mới xe đạp</NavLink>, '4'),
        ]),
        getItem('Phụ kiện', 'sub2', <Wrench width={16} />, [
            getItem(<NavLink to={'/admin/accessories'}>Danh sách phụ kiện</NavLink>, '5'),
            getItem(<NavLink to={'/admin/accessories-add'}>Thêm mới phụ kiện</NavLink>, '6'),
        ]),
        getItem(<NavLink to={'/admin/brands'}>Thương hiệu</NavLink>, '7', <Earth size={16} />),
        getItem(<NavLink to={'/admin/categories'}>Danh mục</NavLink>, '8', <Network size={16} />),
        getItem(<NavLink to={'/admin/orders'}>Đơn hàng</NavLink>, '9', <SnippetsOutlined />),
        getItem(<NavLink to={'/admin/banner'}>Trình chiếu Banner</NavLink>, '10', <ImagePlay size={16} />),
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className='fixed top-0 left-0 z-10 min-h-screen bg-[#001529] '
            width={270}
        >
            <div className="flex justify-center items-center p-3 bg-[#001529]" >
                <img src={logo2} alt="logo" width={90} />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    )
}

export default Sidebar_Admin