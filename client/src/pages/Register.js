import React from 'react';
import { useForm } from 'react-hook-form';
import { registerAPI } from "../services/api/index";
import { useHistory } from 'react-router-dom';


const Register = () => {

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitForm = (formData) => {
        registerAPI(formData)
            .then(() => {
                history.push("/login");
            })
            .catch(error => {
                console.error(error.response.data.error);
            });
    };


    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => submitForm(data))}
                className="form-signin"
            >
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="firstname"
                        className="form-control"
                        {
                        ...register("firstName", {
                            required: "Entering your first name is required",
                            minLength: {
                                value: 4,
                                message: "First name should be more than 3"
                            }
                        })
                        }
                    />
                    {
                        errors.firstName &&
                        <div>
                            <p>{errors.firstName.message}</p>
                        </div>
                    }
                </div>

                <div>
                    <input
                        type="text"
                        name="familyName"
                        placeholder="familyname"
                        className="form-control"
                        {
                        ...register("familyName", {
                            required: "Entering your family name is required",
                            minLength: {
                                value: 4,
                                message: "Password should be more than 3"
                            }
                        })
                        }
                    />
                    {
                        errors.familyName &&
                        <div>
                            <p>{errors.familyName.message}</p>
                        </div>
                    }
                </div>

                <div>
                    <input
                        type="number"
                        name="age"
                        placeholder="age"
                        className="form-control"
                        {
                        ...register("age", {
                            required: "Entering your age is required",
                            valueAsNumber: true
                        })
                        }
                    />
                    {
                        errors.age &&
                        <div>
                            <p>{errors.age.message}</p>
                        </div>
                    }
                </div>


                <div>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="phone number"
                        className="form-control"
                        {
                        ...register("phoneNumber", {
                            required: "Entering your phone number is required",
                            minLength: {
                                value: 11,
                                message: "Phone number should contain 11 number"
                            },
                            maxLength: {
                                value: 11,
                                message: "Phone number should contain 11 number"
                            }
                        })
                        }
                    />
                    {
                        errors.phoneNumber &&
                        <div>
                            <p>{errors.phoneNumber.message}</p>
                        </div>
                    }
                </div>


                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        className="form-control"
                        {
                        ...register("email", {
                            required: "Entering your email is required"
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
                        name="password"
                        placeholder="Password"
                        className="form-control"
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

                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
        </div>

    );
};

export default Register;