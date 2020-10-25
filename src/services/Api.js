import axios from "axios";

export default axios.create({
  baseURL: "https://api-rest-node.azurewebsites.net/api/",
});
