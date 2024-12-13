import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader/Loader';
import Sidebar_Admin from '../components/admin/sidebar/Sidebar';
import { Layout } from 'antd';
const LayoutAdmin = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const nav = useNavigate()
    const token = sessionStorage.getItem("accessToken")
    const email = sessionStorage.getItem("adminEmail")
    useEffect(() => {
        if (!token) {
            nav('/')
            try {
                if (email !== "giaothot2004@gmail.com") {
                    nav('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const { Content } = Layout;

    return loading ? (
        <Loader />
    ) : (
        <Layout className="min-h-screen">
            <Sidebar_Admin />
            <Layout>
                <Content style={{ padding: 24, minHeight: 360 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
