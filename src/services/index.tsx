// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // require('dotenv').config();

// const BASE_URL = "https://api.5bib.com";

// export const network = axios.create({
// 	baseURL: BASE_URL,
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// });

// export const networkAuth = async (content_type = "application/json") => {
// 	const access_token = await AsyncStorage.getItem("5bib_access_token");

// 	// console.log("TOKEN", access_token);

// 	return axios.create({
// 		baseURL: BASE_URL,
// 		headers: {
// 			"Content-Type": content_type,
// 			Authorization: "Bearer " + access_token,
// 		},
// 	});
// };

export const BASE_URL = "http://localhost:5556/api/v1";

export const network = () => fetch(BASE_URL, {
  headers: {
    "Content-Type": "application/json",
  },
});

export const networkAuth = () => {
  const access_token = localStorage.getItem("access_token");
  return fetch(BASE_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
};
