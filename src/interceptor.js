var axios = require("axios");

export const jwtToken = "";

   // localStorage.getItem("authorization");

axios.interceptors.request.use(
    function (config) {
        if (jwtToken) {
            console.log("inside configuration axios")
            config.headers["authorization"] = "Bearer " + jwtToken;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);