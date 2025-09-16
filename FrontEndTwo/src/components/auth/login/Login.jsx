import React, { useState } from "react";
import style from "./Login.module.css";
import { useLoginMutation } from "../../../services/UserAuthApi.jsx";
import { Link, useNavigate } from "react-router";
import styles from "../signUp/SignUp.module.css";
import Header from "../../header/Header.jsx";

const Login = () => {
    const loginDetails = {
        email: "",
        password: "",
    };

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState(loginDetails);
    const [isLoading, setIsLoading] = useState(false);
    const [backEndError, setBackEndError] = useState([]);

    const [login] = useLoginMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((pre) => ({ ...pre, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setBackEndError([]);

        try {
            const response = await login(loginData).unwrap();
            console.log(response);
            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.userId);

            // ✅ navigate immediately
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            if (error?.data?.message) {
                setBackEndError([error.data.message]);
            }
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <>
            <Header />
            <div className={style.loginPage}>
                <div className={styles.signUp}>
                    <div id={style.form}>
                        <form onSubmit={submitHandler}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={handleChange} required />

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={handleChange} required />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={isLoading ? styles.loading : ""}
                            >
                                {isLoading ? "Logging In..." : "Log In"}
                            </button>

                            {backEndError.length > 0 && (
                                <div className={styles.error}>
                                    {backEndError.map((err, i) => (
                                        <p key={i}>{err}</p>
                                    ))}
                                </div>
                            )}

                            <div className={styles.link}>
                                Don&apos;t have an account? <Link to="/signup">SignUp</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
