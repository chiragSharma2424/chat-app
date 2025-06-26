import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data})
        } catch(err) {
            console.log("error in checkAuth", err);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigninUp : true});
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser:res.data});
            toast.success("Account created successfully");
        } catch(err) {
            toast.error(err.response.data.message);
        }finally {
            set({isSigninUp: false})
        }
    },

    logout: async() => {
        try {
            await axiosInstance().post('/auth/logout')
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }
}));