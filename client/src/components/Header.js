import '../App.css';
import {Link} from "react-router-dom";

let searchValue = '';

function Header() {
    return (
        <>
            <nav className="bg-black bg-opacity-30 h-20 w-full flex fixed items-center px-5">
                <h1 className="text-white font-semibold text-lg tracking-widest">PHOTOMANIA</h1>
            </nav>
            <div className="w-full h-full object-fit w-full">
                <img className="h-3/5 w-full" src="/images/header.jpg" alt="Header"/>
            </div>
        </>
    )
}


export default Header;