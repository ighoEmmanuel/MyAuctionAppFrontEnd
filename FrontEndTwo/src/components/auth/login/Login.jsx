import React,{useState} from 'react';
import style from "./Login.module.css"
import { useLoginMutation} from "../../../services/UserAuthApi.jsx";
import {Link, useNavigate} from "react-router";
import styles from "../signUp/SignUp.module.css";
import Header from "../../header/Header.jsx";

const Login = () => {

    const loginDetails = {
        email:"",
        password:""
    }

    const navigate = useNavigate();

    const [loginData , setLoginData] = useState(loginDetails);
    const[isLoading, setIsLoading] = useState(false);
    const[backEndError, setBackEndError] = useState([]);

    const [login] = useLoginMutation();

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
            const token = response.token;
            localStorage.setItem("token", token);
            if (response.status === 200) {
                navigate("/dashboard")
            }
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
            <Header/>
            <div className={style.loginPage}>
                <div onSubmit={submitHandler} className={styles.signUp}>
                    <div id={style.form}>
                        <form>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={handelChange} required />

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={handelChange} required />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={isLoading ? styles.loading : ""}
                            >
                                {isLoading ? "Logging In..." : "Log In"}
                            </button>

                            {backEndError && <div className={styles.error}>{backEndError}</div>}
                            <div className={styles.link}>
                                Don't have an account? <Link to="/signup">SignUp</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Login;