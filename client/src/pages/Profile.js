import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { useAuth } from '../context/Auth';
import { profileAPI, logoutAPI } from '../services/api';


const Profile = () => {

    const { toggleAuth } = useAuth();
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [id, setID] = useState("");


    useEffect(() => {

        (
            async () => {
                const response = await profileAPI();

                const userData = response.data.user;
                setFirstName(userData.firstName);
                setFamilyName(userData.familyName);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setID(userData.id);
            }
        )();

    }, []);

    const handleClick = (event) => {
        logoutAPI()
            .then(() => {
                localStorage.setItem("jwt_access_token", "");
                localStorage.setItem("jwt_refresh_token", "");

                toggleAuth();

                history.push("/");
            });
    };

    return (
        <Link to={`/edit-profile/${id}`} style={{textDecoration: "none"}}>
            <div style={{ margin: "0 auto" }}>
                <div className="card-preview">
                    <div>
                        <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="user" style={{ width: "100%" }} />
                        <h2>{firstName} {familyName}</h2>
                    </div>

                    <div>
                        <span>Age: {age}</span>
                    </div>
                    <div>
                        <span>Phone: {phoneNumber}</span>
                    </div>
                    <div>
                        <span>Email: {email}</span>
                    </div>

                    <button style={{
                        backgroundColor: "#f44336",
                        color: "white"
                    }} className="" type="button" onClick={handleClick}>Logout</button>
                </div>
            </div>
        </Link>
    );
};

export default Profile;