import "./featured.css";
import srcDN from "../../assets/img/DaNang.jpg";
import srcHN from "../../assets/img/HaNoi.jpg";
import srcHCM from "../../assets/img/HCM.jpg";
import { useState } from "react";
import { useEffect } from "react";
import instance from "../../utils/axios";
//data featured
const featuredData = [
  {
    name: "Da Nang",
    imgSrc: srcDN,
  },
  {
    name: "Ha Noi",
    imgSrc: srcHN,
  },
  {
    name: "Ho Chi Minh",
    imgSrc: srcHCM,
  },
];

const Featured = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("hotel/countHotel");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="featured">
      {featuredData.map((i, index) => {
        return (
          <div key={index} className="featuredItem">
            <img src={i.imgSrc} alt={i.name} className="featuredImg" />
            <div className="featuredTitles">
              <h2>{i.name}</h2>
              <h3>
                {data.find((item) => item.city === i.name)
                  ? data.find((item) => item.city === i.name).countHotels
                  : 0}{" "}
                properties
              </h3>
            </div>
          </div>
        );
      })}

      {/* <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>123 properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>533 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>532 properties</h2>
        </div>
      </div> */}
    </div>
  );
};

export default Featured;
