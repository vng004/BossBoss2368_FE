import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getTitleTab } from "../../../contants/client";
import {
  AccessoryContext,
  AccessoryContextType,
} from "../../../contexts/AccessoryContext";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import { smoothScrollToTop } from "../../../hooks/scroll";
import { Accessory } from "../../../interface/accessory";
import { Category } from "../../../interface/category";

const Accessories = () => {
  const { state, onRemove, totalPages, totalDocs, getAllAccessory } =
    useContext(AccessoryContext) as AccessoryContextType;
  const [currentPage, setCurrentPage] = useState(1);
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  const [loading, setLoading] = useState<boolean>(false);

  const sortAccessory = [...state.accessories].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const columns: ColumnsType<Accessory> = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      render: (_, __, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 110,
      render: (_, record) => (
        <img
          src={record?.image as string}
          alt={record.title}
          width={80}
          className="rounded-lg"
        />
      ),
    },
    {
      title: "Tên phụ kiện",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category: Category) => <div>{category?.title}</div>,
    },

    {
      title: " Giá",
      dataIndex: "price",
      key: "price",
      render: (record) => <div>{formatPrice(record)}</div>,
    },
    {
      title: "Giá đã giảm",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (record) => <div>{formatPrice(record)}</div>,
    },
    {
      title: "Hành động",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Link to={`/admin/accessories-edit/${record._id}`}>
              <Button
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(record._id as string);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handlePageChange = async (page: number) => {
    setLoading(true);
    await getAllAccessory(page, 6);
    smoothScrollToTop();
    setCurrentPage(page);
    setLoading(false);
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: 6,
    total: totalPages * 6,
    onChange: handlePageChange,
    showSizeChanger: false,
  };

  return (
    <div>
      <Helmet>
        <title>{getTitleTab("Quản lí phụ kiện")}</title>
      </Helmet>
      <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <p className="text-xl font-semibold pr-2">QUẢN LÝ PHỤ KIỆN</p>
          <p>
            ( Sản phẩm:{" "}
            <span className="text-[#ef4d38] font-semibold">{totalDocs}</span> )
          </p>
        </div>
        <Link to="/admin/accessories-add">
          <button type="button" className="custom-button rounded-lg h-11">
            <PlusOutlined /> Thêm phụ kiện
          </button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={sortAccessory}
        rowKey="_id"
        pagination={paginationConfig}
        className="p-4 bg-white rounded-lg shadow-lg"
        loading={loading}
      />
    </div>
  );
};

export default Accessories;
