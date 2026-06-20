// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://kitchen-store-project-9.onrender.com/api",
//   withCredentials: true,
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
