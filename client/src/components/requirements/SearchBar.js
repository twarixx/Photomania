import {useState} from "react";

export const SearchBar = ({navigate, closeModal}) => {
    const [search, setSearch] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        document.querySelectorAll('.searchbar').forEach(bar => {
            if (bar.value !== '') {
                bar.value = '';
                bar.blur();
                if (closeModal) closeModal();

                navigate(`/${search}`);
            } else {
                bar.setAttribute('placeholder', 'What do you want to search');
                bar.style.borderColor = 'red';
            }
        });
    };

    const handleChange = event => {
        setSearch(event.target.value);
        event.target.setAttribute('placeholder', 'Search');
        event.target.style.borderColor = null;
    };

    return (
        <div className="mt-2 flex-grow relative">
            <div className="absolute flex items-center w-5 ml-2 h-full">
                <img src="/icons/search.svg" alt="Search"/>
            </div>
            <form onSubmit={handleSubmit}>
                <input id="mobilesearch" onChange={handleChange}
                       className="searchbar text-[#8f8f8f] placeholder-[#8f8f8f] rounded-md h-10 px-2 pl-9 w-full bg-[#cccccc] outline-none border-solid border-2 border-[#8f8f8f]"
                       type="text" placeholder="Search"/>
            </form>
        </div>
    )
}