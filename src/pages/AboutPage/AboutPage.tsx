import './about-page.css'
import {Link} from "react-router-dom";

export const AboutPage = ()=>{
    return(
        <div className={"about-page"}>
                <div className={'greeting-menu'}>
                    <p>
                        Hi, dear user! As you might have guessed, this is a app about
                        search pokemons. If you want to find something, enter the pokemon
                        name but it must be strictly in English.
                    </p>
                    <p>
                        Author Git Hub:  <Link to={"https://github.com/bssier"}>Link</Link>
                    </p>
                    <p>
                        RS React course: <Link to={"https://rs.school/courses/reactjs"}>Link</Link>
                    </p>
                </div>
        </div>
    )
}