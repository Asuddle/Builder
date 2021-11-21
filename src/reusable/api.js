import axios from "axios";

const URL = process.env.API_URL;
export function handleApi(method = "get", url = "", data = {}) {
  return axios({
    method,
    url: `https://property-expert-backend-prod.herokuapp.com${url}`,
    data,
  });
}
