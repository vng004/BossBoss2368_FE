import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Tag, Tooltip, TreeSelect } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { FilePen } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getTitleTab } from "../../../contants/client";
import { OrderContext, OrderContextType } from "../../../contexts/OrderContext";
import {
  ProductContext,
  ProductContextType,
} from "../../../contexts/ProductContext";
import { smoothScrollToTop } from "../../../hooks/scroll";
import { Order } from "../../../interface/order";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { orders, fetchOrders } = useContext(OrderContext) as OrderContextType;
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolver) => {
        setTimeout(resolver, 166);
      });
      await fetchOrders();
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns: ColumnsType<Order> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Họ và tên",
      dataIndex: "shippingDetails",
      key: "shippingDetails",
      render: (_, record) => (
        <div>
          <p className="m-0">{record.shippingDetails.name}</p>
        </div>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => {
        const formatDate = dayjs(date).format("HH:mm - DD/MM/YYYY");
        return <div>{formatDate}</div>;
      },
    },
    {
      title: "Số sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (_, record) => {
        const totalQuantity = record.products.reduce(
          (sum, p) => sum + p.quantity,
          0
        );
        return <div>{totalQuantity}</div>;
      },
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => <div>{formatPrice(record.totalPrice)}</div>,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <div className="pl-2">
          {orderStatus === 1 ? (
            <Tag color={"green"} className="px-3 text-sm py-1 w-30">
              Đã xác nhận
            </Tag>
          ) : orderStatus === 2 ? (
            <Tag color={"blue"} className="px-3 text-sm py-1 w-30">
              Hoàn tất
            </Tag>
          ) : (
            <Tag color={"red"} className="px-3 text-sm py-1 w-30">
              Chưa xác nhận
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Chi tiết",
      key: "actions",
      width: 150,
      render: (record) => (
        <Tooltip title="Xem">
          <Link to={`/admin/orders-edit/${record._id}`}>
            <Button>
              <FilePen width={18} />
            </Button>
          </Link>
        </Tooltip>
      ),
    },
  ];

  const filterOrder = orders.filter(
    (order) =>
      (selectedStatus === undefined || order.orderStatus === selectedStatus) &&
      order.code?.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log(orders)

  const handlePageChange = async (page: number) => {
    setLoading(true);
    smoothScrollToTop();
    setCurrentPage(page);
    setLoading(false);
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: 8,
    total: filterOrder?.length,
    onChange: handlePageChange,
    showSizeChanger: false,
    pageSizeOptions: ["8"],
  };

  return (
    <div>
      <Helmet>
        <title>{getTitleTab("Quản lí đơn hàng")}</title>
      </Helmet>
      <div className="mb-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-xl font-semibold pr-2">QUẢN LÝ ĐƠN HÀNG</p>
            <p>( {orders.length} đơn hàng )</p>
          </div>
          <div className="flex w-[400px] gap-2 ml-10">
            <Input
              placeholder="Tìm theo mã đơn hàng"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              className="w-full h-10"
              allowClear
            />
            <TreeSelect
              placeholder="Lọc theo trạng thái"
              onChange={(value) => setSelectedStatus(value as number)}
              value={selectedStatus}
              className="w-full h-10"
              treeData={[
                { value: 0, title: "Chưa xác nhận" },
                { value: 1, title: "Đã xác nhận" },
                { value: 2, title: "Hoàn tất" },
              ]}
              allowClear
            />
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filterOrder}
        rowKey="_id"
        pagination={paginationConfig}
        className="p-4 bg-white rounded-lg shadow-lg"
        loading={loading}
      />
    </div>
  );
};

export default Orders;
