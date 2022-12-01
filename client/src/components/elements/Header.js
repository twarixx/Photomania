import '../../App.css';
import {Link, useNavigate} from "react-router-dom";
import {UploadDialog} from "../dialogs/UploadDialog";
import {UserDropdown} from "../dropdowns/UserDropdown";
import {SearchBar} from "../requirements/SearchBar";
import {SearchDialog} from "../dialogs/SearchDialog";
import {NotificationsDropdown} from "../dropdowns/NotificationsDropdown";
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";

function Header() {
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <nav
                className="absolute bg-black text-white bg-opacity-30 h-14 sm:h-20 w-full flex items-center px-1.5 sm:px-5 justify-between shadow-sm">
                <div className="flex space-x-2 items-center">
                    <Link to="/"><h1 className="hidden sm:block font-semibold text-lg tracking-widest">PHOTOMANIA</h1>
                    </Link>
                    <Link to="/"><h1 className="block sm:hidden font-semibold text-lg tracking-widest">PM</h1></Link>

                    <SearchDialog navigate={navigate} />
                </div>

                <div className="hidden sm:block flex-grow max-w-xl">
                    <SearchBar navigate={navigate}/>
                </div>


                <div className="flex items-center">
                    <Link to="/"><img className="w-8 sm:w-9 mr-3 sm:mr-5 h-full" src="/icons/home.svg"
                                      alt="Home" title="Home"/></Link>

                    <UploadDialog />

                    <NotificationsDropdown/>
                    <UserDropdown navigate={navigate}/>
                </div>
            </nav>

            <div className="w-full h-3/5 object-fit w-ful z-0">
                <img className="h-3/5 w-full z-0" src="/images/header.jpg" alt="Header"/>
            </div>
        </>
    )

}

export default Header;