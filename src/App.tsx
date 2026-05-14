import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import {Header} from './Components/Header/Header';
import {HomePage} from './pages/home-page/HomePage';
import {Footer} from './Components/Footer/Footer';
import {NotFoundPage} from './pages/not-found/NotFoundPage';
import {ErrorBoudary} from './Components/ErrorBoudary/ErrorBoudary';


export const App = () => {
    const [searchQuery, setSearchQuery] = useState(() => {
        return localStorage.getItem('input-value') || '';
    });

    useEffect(() => {
        try {
            const stored: string | null = window.localStorage?.getItem('input-value');
            if (stored) this.setState({searchQuery: stored});
        } catch (e) {
            console.log(e)
        }
    }, [])

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    return (
        <ErrorBoudary>
            <BrowserRouter>
                <Header
                    handleSearch={handleSearch}
                    searchQuery={searchQuery}
                />
                <Routes>
                    <Route
                        path={'/'}
                        element={<HomePage query={searchQuery}/>}
                    />
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </ErrorBoudary>
    )
}