import "../App.css";
import {Link} from "react-router-dom";

function RegisterPage() {
    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen bg-[#A855F7]">
                <div className="flex flex-col items-center bg-white w-[50vh]">
                    <div className="text-center text-[2.3rem] font-semibold p-[1rem] mt-[1rem]">
                        <h1>Register</h1>
                    </div>

                    <div className="mt-4 mb-10">
                        <form>
                            <div className="flex flex-col items-center space-y-[2rem]">
                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]" htmlFor="email">Email</label>
                                    <input className="login-input" type="email" name="email" placeholder="Enter your email." id="email" required></input>
                                </div>

                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]" htmlFor="username">Username</label>
                                    <input className="login-input" type="text" name="username" placeholder="Enter your username." id="username" required></input>
                                </div>

                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]" htmlFor="password">Password</label>
                                    <input className="login-input" type="password" name="password" placeholder="Enter your password." id="password" required></input>
                                </div>

                                <div>
                                    <label className="block text-[0.8rem] font-[400] mb-[0.3.rem]" htmlFor="con_password">Confirm Password</label>
                                    <input className="login-input" type="password" name="con_password" placeholder="Confirm your password." id="con_password" required></input>
                                </div>
                            </div>

                            <div className="flex justify-between mx-4 mt-[0.7rem] text-[small] no-underline">
                                <Link to="/login" className="">Already have an account?</Link>
                                <Link to="/login" className="">Sign in</Link>
                            </div>

                            <div className="submit-login">
                                <input id="login" type="submit" value="Register"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;