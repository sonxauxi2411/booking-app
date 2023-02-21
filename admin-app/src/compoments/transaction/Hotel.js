import React from "react";
import useFetch from "../../hook/useFetch";

function Hotel({ hotelId }) {
  const { data, loading, error } = useFetch(`/hotel/${hotelId}`);
  //  console.log(data);

  return <div>{data?.name}</div>;
}

export default Hotel;
