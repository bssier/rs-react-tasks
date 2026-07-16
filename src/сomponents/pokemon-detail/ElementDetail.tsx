import './ElementDetail.css';
import closeIcon from '../../assets/close.png';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
  useGetPokemonDetailQuery,
  type DetailedItem,
} from '../../redux/pokemonApi';

type LocationState = {
  item: DetailedItem;
};

const hasPokemonState = (state: unknown): state is LocationState => {
  return typeof state === 'object' && state !== null && 'item' in state;
};

export const ElementDetail = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const location = useLocation();

  const stateItem = hasPokemonState(location.state)
    ? location.state.item
    : null;

  const hasFullDetails = !!stateItem;

  const { data: apiItem, isFetching } = useGetPokemonDetailQuery(name ?? '', {
    skip: !name || hasFullDetails,
  });

  const item = stateItem ?? apiItem;

  const handleCloseClick = (): void => {
    void navigate(`/${location.search}`);
  };

  return (
    <article className="element-detail">
      <div className="close">
        <button type="button" onClick={handleCloseClick}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>

      <div className="info">
        {item ? (
          <div>
            <h1>
              {name
                ? (name.at(0)?.toUpperCase() ?? '') + name.slice(1)
                : 'Unknown Pokemon'}
            </h1>
            <section className="detailed-info">
              {isFetching && !item.height ? (
                <div className="loader">Loading details...</div>
              ) : (
                <>
                  <p>Height: {item.height}</p>
                  <p>Weight: {item.weight}</p>
                  <h3>Abilities:</h3>
                  {item.abilities.length > 0 ? (
                    <ul>
                      {item.abilities.map((abilityName: string) => (
                        <li key={abilityName} className="abilities">
                          {abilityName}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No abilities specified</p>
                  )}
                </>
              )}
            </section>
          </div>
        ) : isFetching ? (
          <div className="loader">Loading...</div>
        ) : (
          <p>Data not found. Please go back to the list.</p>
        )}
      </div>
    </article>
  );
};
