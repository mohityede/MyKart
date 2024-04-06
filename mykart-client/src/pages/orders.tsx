import toast from "react-hot-toast";
import { Column } from "react-table";
import { useSelector } from "react-redux";
import { ReactElement, useEffect, useState } from "react";
import { UserReducerInitialState } from "../types/reducers";

import Loader from "../components/loader";
import TableHOC from "../components/tableHOC";
import { useMyOrdersQuery } from "../redux/api/order";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  // action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  // {
  //   Header: "Action",
  //   accessor: "action",
  // },
];
function Orders() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { isLoading, data, isError, error } = useMyOrdersQuery(
    user?._id as string
  );

  const [rows, setRows] = useState<DataType[]>([]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  useEffect(() => {
    if (data) {
      setRows(
        data.data.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "processing"
                  ? "red"
                  : i.status === "shipped"
                  ? "green"
                  : i.status === "confirmed"
                  ? "yellow"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
        }))
      );
    }
  }, [data]);

  if (isError) return toast.error("Error...");
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Loader /> : Table}
    </div>
  );
}

export default Orders;
