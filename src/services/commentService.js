import httpService from "./httpService";
const commentEndpoint = "comment/";

const commentService = {
    create: async (payload) => {
        const { data } = await httpService.put(
            commentEndpoint + payload._id,
            payload
        );
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    remove: async (commentId) => {
        const { data } = httpService.delete(commentEndpoint + commentId);
        return data;
    }
};
export default commentService;
