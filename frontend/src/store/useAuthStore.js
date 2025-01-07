import { create }from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
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
            toast.error(error)
        }finally{
            set({ isSigningUp:false })
        }
    },

    logout:async()=> {
        try {
            await axiosInstance.post("auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully ")
        } catch (error) {
            console.log("Error in logout", error);
            toast.error(error.response.data.message)
        }
    },

    login:async(data)=>{
        set({isLogging:true})
        try {
            const res = await axiosInstance.post("auth/login",data)
            set({ authUser: res.data })
            toast.success("Logged in successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }finally{
            set({ isLogging:false })
        }
    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.patch("auth/update-profile",data)
            set({ authUser: res.data })
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }finally{
            set({ isUpdatingProfile:false })
        }
    }
}))