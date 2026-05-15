import { type FC, useEffect, useState} from 'react';
import {Line} from '../../Components/Line/Line';
import './home-page.css';

interface HomePageProps {
    query: string;
}

interface Item {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    img: string;
    title: string;
}

export const HomePage: FC<HomePageProps> = ({query}) => {
    const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [items, setItems] = useState<Item[] | null>(null)

    const fetchData = async (searchQuery: string) => {
        setItems(null)
        setErrorMessage('')

        if (!searchQuery || searchQuery.trim().length < 3) {
            setLoading(false)
            return
        };

        setLoading(true)

        const url = `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Not found');
                }
                if (response.status >= 500) {
                    throw new Error('Server error. We try fix problem, please wait');
                }
                throw new Error('Error data loading');
            }
            const data = await response.json();

            const mappedItem: Item = {
                title: data.name,
                img: data.sprites.front_default || '',
                hp: data.stats[0]?.base_stat || 0,
                attack: data.stats[1]?.base_stat || 0,
                defense: data.stats[2]?.base_stat || 0,
                speed: data.stats[5]?.base_stat || 0,
            };

            setItems([mappedItem])
            setLoading(false)
        } catch (err) {
            let errorMessage = '';

            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setErrorMessage(errorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(query);
    }, [query]);

    return (
        <main>
            {isLoading && <div className={'loader'}>loading...</div>}
            {errorMessage && (
                <div className={'error-showing-container'}>
                    <p>{errorMessage}</p>
                </div>
            )}
            <div className={'list-wrapper'}>
                <div className={'list'}>
                    {items && <Line item={items[0]}/>}
                </div>
            </div>
            <div className={"pagination"}>
                <p className={"switch-page"}>prev</p>
                <p>1</p>
                <p className={'switch-page'}>next</p>
            </div>
        </main>
    )
}