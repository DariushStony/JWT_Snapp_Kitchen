import React from 'react';
import { useForm } from 'react-hook-form';
import { editProfileAPI } from "../services/api/index";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const EditProfile = () => {

    const history = useHistory();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitForm = (formData) => {
        console.log(id);
        const newUserData = { ...formData, id: id.toString() }
        editProfileAPI(newUserData)
            .then(() => {
                history.push("/profile");
            })
            .catch(error => {
                console.error(error.response.data.error);
            });
    };

    const handleCancelClick =() => {
        history.push("/profile");
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => submitForm(data))}
                className="form-signin"
            >
                <h1 className="h3 mb-3 fw-normal">Please edit user data</h1>

                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="firstname"
                        className="form-control"
                        {
                        ...register("firstName", {
                            required: "Enter your firstname is required"
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
                            required: "Enter your familyname is required"
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
                        placeholder="age"
                        {
                        ...register("age", {
                            required: "Enter your age is required"
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
                            required: "Enter your phone number is required"
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
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        {
                        ...register("password", {
                            required: "Enter your password is required"
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

                <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>

                <button onClick={handleCancelClick} style={{ marginTop: "5px" }} className="w-50 btn btn-lg btn-danger" type="button">Cancel</button>
            </form>
        </div>

    );
};

export default EditProfile;