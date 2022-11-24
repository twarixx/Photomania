import "../App.css";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function RegisterPage() {

    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
        con_password: ""
    });
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(null);
    const {login} = useContext(AuthContext);

    const handleChange = event => {
        setInputs(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleClick = async event => {
        event.preventDefault();

        try {
            const data = await axios.post("http://localhost:8500/api/auth/register", inputs);
            await login(inputs, data);
            setError(null);
            setSuccessful("Account made... Redirecting!");
            setTimeout(() => window.location.assign("/"), 1000);
        } catch(error) {
            setError(error.response.data);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen bg-[#A855F7]">
                <div className="flex flex-col items-center bg-white w-[50vh]">
                    <div className="text-center text-[2.3rem] font-semibold p-[1rem] mt-[1rem]">
                        <h1>Register</h1>
                    </div>

                    {error && <div className="text-white text-lg font-semibold border-2 border-red-600 mt-2 mb-6 w-3/4 bg-red-500 p-3 rounded-lg text-center">{error}</div>}
                    {successful && <div className="text-white text-lg font-semibold border-2 border-green-600 mt-2 mb-6 w-3/4 bg-green-500 p-3 rounded-lg text-center">{successful}</div>}

                    <div className="mt-4 mb-10">
                        <form>
                            <div className="flex flex-col items-center space-y-[2rem]">

                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]" htmlFor="username">Username</label>
                                    <input className="login-input" type="text" name="username" placeholder="Enter your username." id="username" onChange={handleChange}></input>
                                </div>

                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]" htmlFor="email">Email</label>
                                    <input className="login-input" type="email" name="email" placeholder="Enter your email." id="email" onChange={handleChange}></input>
                                </div>

                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]" htmlFor="password">Password</label>
                                    <input className="login-input" type="password" name="password" placeholder="Enter your password." id="password" onChange={handleChange}></input>
                                </div>

                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]" htmlFor="con_password">Confirm Password</label>
                                    <input className="login-input" type="password" name="con_password" placeholder="Confirm your password." id="con_password" onChange={handleChange}></input>
                                </div>
                            </div>

                            <div className="flex justify-between mx-4 mt-[0.7rem] text-[small] no-underline">
                                <Link to="/login" className="">Already have an account?</Link>
                                <Link to="/login" className="">Sign in</Link>
                            </div>

                            <div className="submit-login">
                                <input id="login" type="submit" value="Register" onClick={handleClick}></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;