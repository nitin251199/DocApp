export const ServerURL = "https://e-doc-app.herokuapp.com";
// export const ServerURL = "http://localhost:1000";
var axios = require("axios");
const getData = async (URL) => {
  try {
    const response = await fetch(`${ServerURL}/${URL}`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("ERROR:", e);
    return null;
  }
};

const postDataAndImage = async (url, formData, config) => {
  try {
    const response = await axios.post(`${ServerURL}/${url}`, formData, config);
    const result = await response.data;
    return result;
  } catch (e) {
    console.log("Error:", e);
    alert(e);
    return null;
  }
};

const postData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error:", e);
    alert(e);
    return null;
  }
};

export { getData, postDataAndImage, postData };
