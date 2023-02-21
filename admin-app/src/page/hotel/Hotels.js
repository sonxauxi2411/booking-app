import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../compoments/layout/Table";
import useFetch from "../../hook/useFetch";
import instance from "../../utils/axios";

const titleTable = ["ID", "Name", "Type", "Title", "City", "Action"];

function Hotels() {
  const { data, error, loading } = useFetch("/hotel/all");
  const navigate = useNavigate();

  const [listData, setListData] = useState();
  //setListData(data) useEffect khi data thay đổi ref lại trang
  useEffect(() => {
    setListData(data);
  }, [data]);
  //delete hotel
  const handlerDelete = async (id) => {
    try {
      //confirm delete
      const check = await window.confirm("Are you sure to delete?");
      if (check) {
        await instance.delete(`/hotel/${id}`);
        window.alert("delete success");
        //refresh list
        return setListData(listData.filter((item) => item._id !== id));
      }
    } catch (error) {
      //nếu có transation thì 404
      if (error.response.status === 404) {
        alert(error.response.data.message);
      }
    }
  };
  const handlerUpdate = (e) => {
    navigate("/add-hotel", { replace: true, state: e });
  };
  return (
    <div className="">
      <div className="d-flex justify-content-between p-2">
        <p>Hotels List</p>
        <button
          className="btn btn-outline-success"
          onClick={(e) => navigate("/add-hotel")}
        >
          Add New
        </button>
      </div>

      <div>
        <Table title={titleTable}>
          {listData?.map((item) => {
            return (
              <tr key={item._id} className="border-bottom">
                <td className="p-3">{item._id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.city}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) => handlerDelete(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={(e) => handlerUpdate(item)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default Hotels;
