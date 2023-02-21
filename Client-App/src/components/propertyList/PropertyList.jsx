import { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";

import "./propertyList.css";

const propertyData = [
  {
    name: "Hotel",
    imgSrc:
      "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
  },
  {
    name: "Apartment",
    imgSrc:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
  },
  {
    name: "Resort",
    imgSrc:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
  },
  {
    name: "Villa",
    imgSrc:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  },
  {
    name: "Cabin",
    imgSrc:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  },
];

const PropertyList = () => {
  const { data, error, loading } = useFetch("/hotel/countType");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  //tạo ra 1 mang mới kết hơp propertyData và data(count type)
  const result = propertyData?.map((property) => {
    //tìm data tương ứng
    const filteredData = data?.filter(
      (propertyCount) =>
        //type === name
        propertyCount.type.toLowerCase() === property.name.toLowerCase()
    );

    // array new
    return {
      name: property.name,
      count: (filteredData && filteredData[0]?.count) || 0,
      imgSrc: property.imgSrc,
    };
  });
  console.log(result);

  return (
    <div className="pList">
      {result.map((item, index) => {
        return (
          <div key={index} className="pListItem">
            <img src={item.imgSrc} alt="" className="pListImg" />
            <div className="pListTitles">
              <h1>{item.name}</h1>
              <h2>{item.count}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyList;
