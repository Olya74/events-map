import {create} from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

const useAuthStore = create((set)=> ({
    user: null,
    loading: true,
    fetchUser: async ()=> {
        try {
            const res = await axios.get("http://localhost:8834/api/me");
            set({user: res.data, loading: false,isAuthorized: true})
        } catch {
            set({user:null, loading: false})
        }
    },

    logout: async()=> {
        await axios.post("http://localhost:8834/api/logout");
        set({user: null});
    },
    setUser: (user) => set({user}),
}))

export default useAuthStore