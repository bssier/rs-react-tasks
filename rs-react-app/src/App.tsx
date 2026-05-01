import {Component} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css"
import {Header} from "./Components/Header/Header.tsx";
import {HomePage} from "./pages/home-page/HomePage.tsx";

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}
