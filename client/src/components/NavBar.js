import '../App.css';
import {Link} from "react-router-dom";

let searchValue = '';

function NavBar() {
    return (
        <div className="flex w-full bg-white p-3 pl-5 pr-5">
            <div className="flex w-full justify-between items-center">

                <a href="/"><h1 className="flex justify-start font-bold">PHOTOMANIA</h1></a>
                <form onSubmit={onSubmit} action="">
                    <input id="search" onChange={onChange} type="text" className="w-full border-solid border-2 ease-in focus:border-purple-900 hover:border-purple-900 border-black rounded-lg p-1 pl-3 pr-3 duration-100" placeholder="Search"/>
                </form>

                <ul className="flex">
                    <li className="pr-4"><Link to="/"> <button className="bg-black hover:bg-purple-900 rounded-xl ease-in duration-100"><img src="/icons/home.svg" title="Home" alt="Home"/></button></Link></li>
                    <li><Link to="/upload"> <button className="bg-black hover:bg-purple-900 rounded-xl ease-in duration-100"><img src="/icons/upload.svg" title="Upload" alt="Upload"/></button></Link></li>
                </ul>
            </div>
        </div>
    )
}

function onChange(event) {
    searchValue = event.target.value;

    event.target.style.borderColor = null;
    event.target.setAttribute('placeholder', 'Search');
}

function onSubmit(event) {
    event.preventDefault();

    if (searchValue === '') {
        const input = document.getElementById('search');
        input.setAttribute('placeholder', 'Noh, not empty :(');
        input.style.borderColor = 'red';
        return;
    }

    window.location.assign(`/${searchValue}`)
}


export default NavBar;