import httpService from "./httpService";
import { localStorageService } from "./localStorageService";

const userEndpoint = "user/";

const userService = {
    get: async (id) => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.patch(userEndpoint + id, content);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    }
};

export default userService;
