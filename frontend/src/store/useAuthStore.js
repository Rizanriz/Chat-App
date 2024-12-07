import { create }from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({

    authUser: null,
    isSigningUp: false,
    isLogging: false,
    isUpdatingProfile: false,


    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("auth/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ autUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup:async (data,navigate) => {
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("auth/signup",data)
            console.log(res.data);
            set({ authUser: res.data })
            toast.success("Account created successfully ")
            navigate("/login") 
        } catch (error) {   
            console.log(error);
            toast.error(error.response?.data?.message)
        }finally{
            set({ isSigningUp:false })
        }
    }   
}))