import React,{useState} from 'react';
import CustomButton  from "../../../reuseable/CustomButton.jsx";
import style from "./Login.module.css"
import { useLoginMutation} from "../../../services/UserAuthApi.jsx";
import {Link} from "react-router";
import styles from "../signUp/SignUp.module.css";

const Login = () => {

    const loginDetails = {
        email:"",
        password:""
    }

    const [loginData , setLoginData] = useState(loginDetails);
    const[isLoading, setIsLoading] = useState(false);
    const[backEndError, setBackEndError] = useState([]);

    const [login] = useLoginMutation(loginDetails);

    const handelChange  = (e) => {
        const {name,value} = e.target;
        setLoginData((pre) =>({...pre, [name]: value}));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setBackEndError([]);
        try {
            const response = await login(loginData).unwrap();
            console.log(response)
        }catch(error){
            console.log(error)
            if (error.data.message) {
                setBackEndError([error.data.message]);
            }
        }finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div onSubmit={submitHandler} className={styles.signUp}>
                <div id={style.form}>
                    <form action="">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               name="email"
                               onChange={handelChange}
                               required
                        />
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               name="password"
                               onChange={handelChange}
                               required
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={isLoading ? styles.loading : ""}
                        >
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>

                        {backEndError && <div className={styles.error} >{backEndError}</div>}
                        <div className={styles.link}>
                            Don't have an account? <Link to="/signup">SignUp</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Login;