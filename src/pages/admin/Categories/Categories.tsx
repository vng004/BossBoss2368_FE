import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from "antd/es/table";
import { useContext, useState } from "react";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { getTitleTab } from '../../../contants/client';
import { CategoryContext, CategoryContextType } from "../../../contexts/CategoryContext";
import { Category } from "../../../interface/category";
import { smoothScrollToTop } from '../../../hooks/scroll';

const Categories = () => {
  const { state, onRemove } = useContext(CategoryContext) as CategoryContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const columns: ColumnsType<Category> = [
    {
      title: 'STT',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      render: (_, __, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      render: (text: string) => (
        <span >{text}</span>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      align: 'center',
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() => window.location.href = `/admin/categories-edit/${record._id}`}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemove(record._id as string)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  const handlePageChange = async (page: number) => {
    setLoading(true)
    smoothScrollToTop()
    setCurrentPage(page);
    setLoading(false)
  };
  const paginationConfig = {
    current: currentPage,
    pageSize: 6,
    total: state.categories?.length,
    onChange: handlePageChange,
    showSizeChanger: false,
    pageSizeOptions: ['6'],
  };


  return (
(<div >
      <Helmet>
          <title>{getTitleTab('Quản lí danh mục')}</title>
        </Helmet>
      <div className="mb-4 flex justify-between items-center p-4 bg-white rounded-lg shadow-lg">
        <div className='flex items-center'>
          <p className="text-xl font-semibold pr-2">QUẢN LÝ DANH MỤC</p>
          <p>( {state.categories.length} danh mục )</p>
        </div>

        <Link to="/admin/categories-add">
          <button type='button' className="custom-button rounded-lg h-11">
            <PlusOutlined />
            Thêm danh mục
          </button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={state.categories}
        rowKey="_id"
        pagination={paginationConfig}
        className='p-4 bg-white rounded-lg shadow-lg'
        loading={loading}
      />
    </div>
    ));
};

export default Categories;
