import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore = create((set) => ({
    autUser: null,
    isSigningUp: false,


    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("auth/check")

            set({ autUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ autUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup:async () => {
        
    }   
}))