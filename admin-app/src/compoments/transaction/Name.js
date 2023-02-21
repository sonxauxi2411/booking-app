import React from "react";
import useFetch from "../../hook/useFetch";

function Name({ userId }) {
  const { data, loading, error } = useFetch(`/users/${userId}`);

  return <>{data?.fullName}</>;
}

export default Name;
