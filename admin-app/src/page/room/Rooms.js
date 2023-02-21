import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../compoments/layout/Table";
import useFetch from "../../hook/useFetch";
import instance from "../../utils/axios";

const roomTitle = [
  "ID",
  "Title",
  "Description",
  "price",
  "max People",
  "Action",
];

function Rooms() {
  const { data, error, loading } = useFetch("/room/all");
  const navigate = useNavigate();

  const [listRoom, setListRoom] = useState();

  useEffect(() => {
    setListRoom(data);
  }, [data]);
  // console.log(listRoom);
  //delete roon
  const handlerDelete = async (id) => {
    try {
      //confirm check
      const check = await window.confirm(
        "Are you sure you want to delete this room?"
      ); //xử lý check ở back-end
      if (check) {
        await instance.delete(`/room/${id}`);
        window.alert("Deleted successfully");
        return setListRoom(listRoom.filter((room) => room._id !== id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert(error.response.data.message);
      }
    }
  };
  //update room
  const handlerUpdate = (item) => {
    //console.log(item);
    navigate("/add-room", { replace: true, state: { item } });
  };
  return (
    <div className="">
      <div className="d-flex justify-content-between p-2">
        <p>Room List</p>
        <button
          className="btn btn-outline-success"
          onClick={(e) => navigate("/add-room")}
        >
          Add New
        </button>
      </div>

      <div>
        <Table title={roomTitle}>
          {listRoom?.map((item) => {
            return (
              <tr key={item._id} className="border-bottom">
                <td className="p-3">{item._id}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>{item.price}</td>
                <td>{item.maxPeople}</td>
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

export default Rooms;
