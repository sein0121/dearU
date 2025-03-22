import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const API_BASE_URL = "http://localhost:8080/api";

export const getEvents = async () => {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
};

export const createEvent = async (event: { title: string; description: string }) => {
    const response = await axios.post(`${API_BASE_URL}/events`, event);
    return response.data;
};

export const getClsfTitles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/clsf`);
        return response.data;
    } catch (error) {
        console.error("Error fetching clsf titles:", error);
        return [];
    }
};

export const saveInvitation = async (invitationData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/invitations/save`, invitationData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true  // ✅ CORS 문제 해결
        });
        return response.data;
    } catch (error) {
        console.error("Error saving invitation:", error);
        throw error;
    }
};


export const updateInvitation = async (id: string, updates: any) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/invitations/update/${id}`, updates, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true  // ✅ CORS 문제 해결
        });
        return response.data;
    } catch (error) {
        console.error("Error updating invitation:", error);
        throw error;
    }
};

// 회원가입
export const registerUser = async (userData: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, userData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// 로그인
export const loginUser = async (userData: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, userData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// 초대장 목록 전체 조회
export const getInvitationAll = async () =>{
  try{
      const response = await axios.get(`${API_BASE_URL}/invitations`);
      return response.data;

  } catch (e) {
      console.error("Error logging in: ", error);
      throw error;
  }
};
