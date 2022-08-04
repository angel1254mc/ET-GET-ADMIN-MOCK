import axios from '../axiosAPI/axios';
import {useContext} from 'react'
import AuthContext from '../Context/authProvider';;
const useRefreshToken = () => {
    const {setAuth} = useContext(AuthContext);
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true //allows us to send HTTPonly cookie to backend
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console,log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;