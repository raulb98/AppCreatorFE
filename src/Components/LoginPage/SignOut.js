
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';


export default function SignOut() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    
    cookies.remove('app_key');
    cookies.remove('email');
    cookies.remove('jwt');
    cookies.remove('n');
    cookies.remove('p');
    navigate("/Login");
}