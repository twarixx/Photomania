import "../App.css";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const {login} = useContext(AuthContext);

    const handleChange = event => {
        setInputs(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleLogin = async event => {
        event.preventDefault();

        try {
            await login(inputs);
            window.location.href = "/";
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen bg-[#A855F7]">
                <div className="flex flex-col items-center bg-white w-[50vh]">
                    <div className="text-center text-[2.3rem] font-semibold p-[1rem] mt-[1rem]">
                        <h1>Login</h1>
                    </div>

                    <div className="mt-4 mb-10">
                        <form>
                            <div className="flex flex-col items-center space-y-[2rem]">
                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]"
                                           htmlFor="username">Username</label>
                                    <input className="login-input" type="text" name="username"
                                           placeholder="Enter your username." id="username" onChange={handleChange}></input>
                                </div>

                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]"
                                           htmlFor="password">Password</label>
                                    <input className="login-input" type="password" name="password"
                                           placeholder="Enter your password." id="password" onChange={handleChange}></input>
                                </div>
                            </div>

                            <div className="flex justify-between mt-[0.7rem] mx-4 text-[small] no-underline">
                                <Link to="/register" className="">Create account</Link>
                                <Link className="">Forgot password?</Link>
                            </div>

                            {error && error}

                            <div className="submit-login">
                                <input onClick={handleLogin} id="login" type="submit" value="Login"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;