import axiosInstance from "../axios/axios.js";

const paymentRepository = {
    checkoutOrder: async (orderId) => {
        return await axiosInstance.post(`/payment/checkout/${orderId}`);
    }
};

export default paymentRepository;