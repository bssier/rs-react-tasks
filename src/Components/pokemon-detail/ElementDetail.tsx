import './ElementDetail.css';
import closeIcon from '../../assets/close.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface PokemonDetailedInfo {
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

interface MappedData {
  height: number;
  weight: number;
  abilities: string[];
}

interface PokemonApiResponse {
  height: number;
  weight: number;
  abilities: PokemonApiAbilityItem[];
}

export const ElementDetail = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState<PokemonDetailedInfo | null>(null);
  const location = useLocation();

  const handleCloseClick = () => {
    navigate(`/${location.search}`);
  };

  useEffect(() => {
    if (!name || name === 'undefined') {
      navigate(`/${location.search}`, { replace: true });
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
        const data: PokemonApiResponse = await response.json();

        const mappedData: MappedData = {
          height: typeof data.height === 'number' ? data.height : 0,
          weight: typeof data.weight === 'number' ? data.weight : 0,
          abilities: data.abilities
            .filter(
              (abilityItem: PokemonApiAbilityItem) => abilityItem?.ability?.name
            )
            .map(
              (abilityItem: PokemonApiAbilityItem) => abilityItem.ability.name
            ),
        };
        setItem(mappedData);
      } catch {
        setLoading(false);
      }
    };

    fetchData();
  }, [name, navigate, location.search]);

  return (
    <article className={'element-detail'}>
      <div className={'close'}>
        <button onClick={handleCloseClick}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
      <div className={'info'}>
        {isLoading && <div className={'loader'}>loading...</div>}
        {!isLoading && item && (
          <div>
            <h1>{name}</h1>
            <section className={'detailed-info'}>
              <p>Height: {item.height}</p>
              <p>weight: {item.weight}</p>
              <h3>Abilities:</h3>
              <ul>
                {item.abilities.map((ability) => (
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
