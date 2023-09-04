import axios from "axios";

var baseURL;

//  if (typeof window !== "undefined") {
//       // Access window object here
//       const hostname = window.location.hostname;
//       // Perform actions with the window object
//        if (hostname.startsWith("www")) {
//     baseURL = "https://www.odoads.com/api/";
//   } else {
//     baseURL = "https://odoads.com/api/";
//   }
//     }

baseURL = "http://localhost:3000/api/";

const instance =  axios.create({baseURL:baseURL})
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
instance.defaults.withCredentials = true;

export default instance;