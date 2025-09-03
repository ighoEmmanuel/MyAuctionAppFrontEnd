import React, { useState } from 'react';
import styles from "./SignUp.module.css";
import {useSignUpMutation} from "../../../services/UserAuthApi.jsx"
import { Link, useNavigate } from "react-router";
import Header from "../../header/Header.jsx";

const SignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [signUpUser] = useSignUpMutation();

    const [passwordError, setPasswordError] = useState("");
    const [backendErrors, setBackendErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUserData(prev => {
            const newData = { ...prev, [name]: value.trim() };

            if (name === "confirmPassword" || name === "password") {
                if (newData.password !== newData.confirmPassword) {
                    setPasswordError("Passwords do not match");
                } else {
                    setPasswordError("");
                }
            }

            return newData;
        });


        if (backendErrors.length > 0) {
            setBackendErrors([]);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setBackendErrors([]);
        setSuccessMessage("");

        if (userData.password !== userData.confirmPassword) {
            setPasswordError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const payload = {
            userName: userData.userName,
            email: userData.email,
            password: userData.password
        };

        try {
            let response;
            response = await signUpUser(payload).unwrap()

            const token = response.token;
            localStorage.setItem("token", token);
            setSuccessMessage(response.message || "Registration successful! Redirecting...");

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error("Registration error:", error);

            if (error.data) {
                if (error.data.errors) {
                    const errorMessages = Object.values(error.data.errors).flat();
                    setBackendErrors(errorMessages);
                } else if (error.data.message) {
                    setBackendErrors([error.data.message]);
                }
            } else if (error.status === 400) {
                setBackendErrors(["Invalid input data"]);
            } else {
                setBackendErrors(["An unexpected error occurred. Please try again."]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header/>
            <div className={styles.signUp}>
                    <form  id={styles.form} onSubmit={submitHandler}>
                        <h2>Create Account</h2>

                        <label>Username</label>
                        <input
                            type="text"
                            name="userName"
                            onChange={handleInput}
                            required
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleInput}
                            required
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleInput}
                            required
                            minLength="6"
                        />

                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleInput}
                            required
                        />
                        {passwordError && <div className={styles.error}>{passwordError}</div>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={isLoading ? styles.loading : ""}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        {backendErrors.length > 0 && (
                            <div className={styles.error}>
                                {backendErrors.map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </div>
                        )}


                        {successMessage && (
                            <div className={styles.success}>
                                {successMessage}
                            </div>
                        )}

                        <div className={styles.link}>
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>

            </div>
        </>
    );
};

export default SignUp;