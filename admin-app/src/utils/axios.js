import axios from "axios";

const instance = axios.create({
  baseURL: "https://plum-courageous-sea-lion.cyclic.app/api/",
});

export default instance;
