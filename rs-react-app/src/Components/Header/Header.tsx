import {Component} from "react";
import './Header.css'

export class Header extends Component {
    render() {
        return (
            <header>
                <div className={"search-container"}>
                    <input type={"text"} className={"search-input"} placeholder={"Search... 👀"}/>
                </div>
            </header>
        )
    }
}
