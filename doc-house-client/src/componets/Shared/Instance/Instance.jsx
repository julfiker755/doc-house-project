import axios from "axios";

// axiso Instence
export const axiosinstance = axios.create({
    baseURL: 'https://doc-house-server-six.vercel.app/',
    headers: {
      authorization:`Bearer ${localStorage.getItem('assentoken')}`
  }
  });