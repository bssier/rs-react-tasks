import {type FC, useState} from 'react';
import './Header.css';
import {Search} from '../../assets/Search';
import Logo from '../../assets/pokemon-logo.svg';
import {Link} from "react-router-dom";

interface PropsHeader {
    handleSearch: (query: string) => void;
    searchQuery: string;
}

export const Header: FC<PropsHeader> = ({handleSearch, searchQuery}) => {
    const [inputValue, setInputValue] = useState(localStorage.getItem('input-value') || '')
    const [error, setError] = useState<Error | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regExpOnlyEngSym = /^[a-zA-Z\s]*$/;
        const value = e.target.value;

        if (regExpOnlyEngSym.test(value)) {
            setInputValue(value)
        }
    };

    const handleSearchClick = () => {
        const valueWithoutspace = inputValue.trim().trimStart();

        if (valueWithoutspace === searchQuery) {
            setInputValue(valueWithoutspace);
            return;
        }

        if (valueWithoutspace.length >= 3) {
            handleSearch(valueWithoutspace);
            setInputValue(valueWithoutspace)
            localStorage.setItem('input-value', valueWithoutspace);
        }
    }

    const handleEnterClick = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    if (error) {
        throw error;
    }

    const generateError = () => {
        setError(new Error('Special error'));
    };

    return (
        <header>
            <div className={'logo'}>
                <div className={'logo-container'}>
                    <img src={Logo} alt={"logo"} className={'logo'}/>
                </div>
            </div>
            <div className={'search-container'}>
                <input
                    type={'text'}
                    className={'search-input'}
                    placeholder={'Search pokemons... 👀'}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterClick}
                />
                <button className={'search-button'} onClick={handleSearchClick} aria-label={"search"}>
                    <div className={'search-icon-container'}>
                        <Search/>
                    </div>
                </button>
            </div>
            <div className={"button-container"}>
                <div className={"about-page-link"}>
                    <p><Link to={"/about"}>
                        About
                    </Link></p>
                </div>
                <div className={'error-generate-container'}>
                    <button onClick={generateError}>Generate Error</button>
                </div>
            </div>
        </header>
    );
}
