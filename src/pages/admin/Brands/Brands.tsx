import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getTitleTab } from "../../../contants/client";
import { BrandContext, BrandContextType } from "../../../contexts/BrandContext";
import { Brand } from "../../../interface/brand";
import { Category } from "../../../interface/category";
import { Product } from "../../../interface/products";

const Brands = () => {
  const { state, onRemove } = useContext(BrandContext) as BrandContextType;
  const [loading] = useState<boolean>(false);

  const columns: ColumnsType<Brand> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      render: (_, __, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Thương hiệu",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (_, record) => <p>{record?.title}</p>,
    },
    {
      title: "Damh mục",
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (categories: Category) => <p>{categories?.title}</p>,
    },
    {
      title: "Số xe đạp",
      dataIndex: "products",
      key: "products",
      align: "center",
      render: (products: Product[]) => <span>{products.length}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (date: string) => {
        const formatDate = new Date(date).toLocaleDateString("vi-VN");
        return formatDate;
      },
    },

    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                (window.location.href = `/admin/brands-edit/${record._id}`)
              }
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

  return (
    <div>
      <Helmet>
        <title>{getTitleTab("Quản lí thương hiệu")}</title>
      </Helmet>
      <div className="mb-4 flex justify-between items-center p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <p className="text-xl font-semibold pr-2 ">QUẢN LÝ THƯƠNG HIỆU</p>
          <p>( {state.brands.length} thương hiệu )</p>
        </div>

        <Link to="/admin/brands-add">
          <button type="button" className="custom-button h-11 rounded-lg">
            <PlusOutlined />
            Thêm danh mục
          </button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={state.brands}
        rowKey="_id"
        className="p-4 bg-white rounded-lg shadow-lg"
        pagination={false}
        loading={loading}
      />
    </div>
  );
};

export default Brands;
