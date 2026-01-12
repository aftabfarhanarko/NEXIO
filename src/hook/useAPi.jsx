import axios from "axios";

const api = axios.create({
  baseURL: "https://assignmnet8-server.vercel.app/",
  //   withCredentials: true, // future auth cookies support
});

const useAxiosAPi = () => {
  return api;
};

export default useAxiosAPi;
