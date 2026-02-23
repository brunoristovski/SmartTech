import axiosInstance from "../axios/axios.js";

const shoppingCartRepository = {
    findShoppingCartById: async () => {
        return await axiosInstance.get(`/shopping_cart`);
    },
    addItemToShoppingCart: async (data) => {
        return await axiosInstance.post("/shopping_cart/add_item", data);
    },
    deleteItemFromShoppingCart: async (id) => {
        return await axiosInstance.delete(`/shopping_cart/delete_item/${id}`);
    },
};

export default shoppingCartRepository;
