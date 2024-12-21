import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Pagination,
  Space,
  Table,
  Tooltip,
  TreeSelect,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getTitleTab } from "../../../contants/client";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import { smoothScrollToTop } from "../../../hooks/scroll";
import { Product } from "../../../interface/products";
import "../../../scss/CheckBox.scss";
const Products = () => {
  const {
    filterProducts,
    listProducts,
    onRemove,
    formatPrice,
    updateProductHot,
    totalDocs,
    totalPages,
  } = useContext(ProductContext) as ProductContextType;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckboxChange = (productId: string, checked: boolean) => {
    updateProductHot(productId, checked);
  };

  const handleHot = async (status: boolean | null) => {
    setSelectedStatus(status as boolean);
    await filterProducts({
      page: currentPage,
      limit: 6,
      selectedBrands: "",
      isHot: status as boolean,
      onSale: undefined,
      priceRange: undefined,
      sortByDate: "latest",
    });
  };

  const columns: ColumnsType<Product> = [
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
          src={record.colors[0]?.image as string}
          alt={record.title}
          className="rounded-lg h-[60px] object-cover w-[110px]"
        />
      ),
    },
    {
      title: "Tên xe đạp",
      dataIndex: "title",
      key: "title",
      render: (_, record) => <p>{record.title}</p>,
      width: 250,
    },
    {
      title: "Màu sắc",
      dataIndex: "colors",
      key: "colors",
      render: (_, record) =>
        record.colors?.map((color, colorIndex) => (
          <div key={colorIndex}>{color.color}</div>
        )),
    },
    {
      title: "Giá",
      dataIndex: "colors",
      key: "colors",
      render: (_, record) =>
        record.colors?.map((color, colorIndex) => (
          <div key={colorIndex}>{formatPrice(color.price)}</div>
        )),
    },
    {
      title: "Giá đã giảm",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (_, record) =>
        record.colors?.map((color, colorIndex) => (
          <div key={colorIndex}>
            {formatPrice(Number(color?.discountPrice))}
          </div>
        )),
    },
    {
      title: "Trạng thái (nổi bật)",
      dataIndex: "hot",
      key: "hot",
      render: (_, record: Product) => (
        <Checkbox
          checked={record.hot}
          onChange={(e) =>
            handleCheckboxChange(record._id as string, e.target.checked)
          }
        />
      ),
      width: 160,
      align: "center",
    },
    {
      title: "Hành động",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Link to={`/admin/products-edit/${record._id}`}>
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
    await filterProducts({
      page: page,
      limit: 6,
      selectedBrands: "",
      isHot: undefined,
      onSale: undefined,
      priceRange: undefined,
      sortByDate: "latest",
    });
    smoothScrollToTop();
    setCurrentPage(page);
    setLoading(false);
  };

  return (
    <div>
      <Helmet>
        <title>{getTitleTab("Quản lí xe đạp")}</title>
      </Helmet>
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-lg mb-4">
        <div className="flex items-center">
          <p className="text-xl font-semibold pr-2">QUẢN LÝ XE ĐẠP</p>
          <p>
            ( Sản phẩm:{" "}
            <span className="text-[#ef4d38] font-semibold">{totalDocs}</span> )
          </p>
          <div className="ml-10">
            <TreeSelect
              placeholder="Lọc theo trạng thái"
              value={selectedStatus}
              onChange={(value) => handleHot(value as boolean)}
              className="w-[180px] h-10"
              treeData={[{ value: true, title: "Sản phẩm nổi bật" }]}
              allowClear
            />
          </div>
        </div>
        <Link to="/admin/products-add">
          <button type="button" className="custom-button rounded-lg h-11">
            <PlusOutlined /> Thêm xe đạp
          </button>
        </Link>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-lg space-y-5">
        <Table
          columns={columns}
          dataSource={listProducts}
          rowKey="_id"
          pagination={false}
          loading={loading}
        />
        <div className="flex justify-end">
          <Pagination
            current={currentPage}
            total={totalPages * 6}
            onChange={handlePageChange}
            pageSize={6}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
