import axios from "axios";

const API_BASE_URL = "http://192.168.200.44:8080/api";

export const getEvents = async () => {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
};

export const createEvent = async (event: { title: string; description: string }) => {
    const response = await axios.post(`${API_BASE_URL}/events`, event);
    return response.data;
};
