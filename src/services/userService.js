import httpService from "./httpService";

const userEndpoint = "user/";

const userService = {
    get: async (id) => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    }
};

export default userService;
