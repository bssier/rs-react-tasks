import {type FC, useEffect, useState} from 'react';
import {Line} from '../../Components/Line/Line';
import './home-page.css';
import {useSearchParams} from "react-router-dom";

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
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1;

    const fetchData = async (searchQuery: string) => {
        setItems(null)
        setErrorMessage('')

        setLoading(true)
        const offset = (page - 1) * 12;

        const savedValue = localStorage.getItem('input-value') || '';
        const isSearchMode = savedValue.trim().length >= 3;

        const url = localStorage.getItem('input-value') ? `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}` : `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`;
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

            if (isSearchMode) {
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
            } else {
                const detailedItems = await Promise.all(
                    data.results.map(async (pokemon: { url: string }) => {
                        const detailRes = await fetch(pokemon.url);
                        const d = await detailRes.json();
                        return {
                            title: d.name,
                            img: d.sprites.front_default || '',
                            hp: d.stats[0].base_stat,
                            attack: d.stats[1].base_stat,
                            defense: d.stats[2].base_stat,
                            speed: d.stats[5].base_stat,
                        };
                    })
                );

                setItems(detailedItems)
                setLoading(false)
            }

        } catch (err) {
            let errorMessage: string = '';

            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setErrorMessage(errorMessage)
            setLoading(false)
        }
    }

    const handlePrevPageClick = () => {
        if (page === 1) {
            return
        }

        const nextPage = page - 1;
        setSearchParams({ page: String(nextPage) })
    }

    const handleNextPageClick = () => {
        const nextPage = page + 1;
        setSearchParams(String(nextPage))
        setSearchParams({ page: String(nextPage) })
    }

    useEffect(() => {
        const localStorageValue = localStorage.getItem('input-value') || ''
        if (localStorageValue.trim().length >= 3 && page !== 1){
            setSearchParams({ page: '1' });
        }

        fetchData(query);
    }, [query, page]);

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
                    {items?.map((item: Item) => {
                        return <Line key={item.title} item={item}></Line>
                    })}
                </div>
            </div>
            {
                !isLoading && items && items.length > 0 && (<div className={"pagination"}>
                    <p className={"switch-page"} onClick={handlePrevPageClick}>prev</p>
                    <p>{page}</p>
                    <p className={'switch-page'} onClick={handleNextPageClick}>next</p>
                </div>)
            }
        </main>
    )
}