import React from 'react';
import { useAuth } from "../context/Auth";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loginAPI } from '../services/api';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { toggleAuth, isAuth } = useAuth();

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitForm = (data) => {
        loginAPI(data)
            .then((res) => {
                localStorage.setItem("jwt_access_token", res.data.accessToken);
                localStorage.setItem("jwt_refresh_token", res.data.refreshToken);

                toggleAuth();

                history.push("/profile");
            })
            .catch(error => {
                console.error(error.response.data.error);
            });
    };

    useEffect(() => {
        if (isAuth.loggedIn) {
            history.push("/profile");
        }
    }, [isAuth]);

    return (

        <div>
            <form
                onSubmit={handleSubmit((data) => submitForm(data))}
                className="form-signin"
            >
                <h1 className="h3 mb-3 fw-normal">Please login</h1>
                <div>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        className="form-control"
                        {
                        ...register("email", {
                            required: "Entering your email is required",
                        })
                        }
                    />
                    {
                        errors.email &&
                        <div>
                            <p>{errors.email.message}</p>
                        </div>
                    }
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        placeholder="password"
                        {
                        ...register("password", {
                            required: "Entering your password is required",
                            minLength: {
                                value: 4,
                                message: "Password should be more than 3"
                            }
                        })
                        }
                    />
                    {
                        errors.password &&
                        <div>
                            <p>{errors.password.message}</p>
                        </div>
                    }
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;