import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config/config.json";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        console.log(error);
    }
);

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            const transformData = res.data
                ? Object.keys(res.data).map((key) => ({ ...res.data[key] }))
                : [];
            res.data = { content: transformData };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
export default httpService;
