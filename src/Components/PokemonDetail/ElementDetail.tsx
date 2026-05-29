import './element-detail.css';
import closeIcon from '../../assets/close.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface pokemonDetailedInfo {
  height: number;
  weight: number;
  abilities: string[];
}

interface PokemonApiAbilityItem {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
}

export const ElementDetail = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState<pokemonDetailedInfo | null>(null);
  const location = useLocation();

  const handleCloseClick = () => {
    navigate(`/${location.search}`);
  };

  useEffect(() => {
    if (!name) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Not found');
          }
          if (response.status >= 500) {
            throw new Error('Server error. We try fix problem, please wait');
          }
          throw new Error('Error data loading');
        }

        setLoading(false);
        const data = await response.json();

        const mappedData = {
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((item: PokemonApiAbilityItem) => {
            return item.ability.name;
          }),
        };
        setItem(mappedData);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return (
    <article className={'element-detail'}>
      <div className={'close'}>
        <button onClick={handleCloseClick}>
          <img src={closeIcon} alt={'close'} />
        </button>
      </div>
      <div className={'info'}>
        {isLoading && <div className={'loader'}>loading...</div>}
        {!isLoading && item && (
          <div>
            <h1>{name}</h1>
            <section className={'detailed-info'}>
              <p>Height: {item?.height}</p>
              <p>weight: {item?.weight}</p>
              <h3>Abilities:</h3>
              <ul>
                {item?.abilities.map((ability) => (
                  <li key={ability} className={'abilities'}>
                    {ability}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </article>
  );
};
