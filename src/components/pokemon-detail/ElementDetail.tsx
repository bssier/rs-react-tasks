import './ElementDetail.css';
import closeIcon from '../../assets/close.png';
import { useLocation, useNavigate, useParams } from 'react-router';
import type { Item } from '../../types/homePageTypes';

const hasPokemonState = (state: unknown): state is LocationState => {
  return typeof state === 'object' && state !== null && 'item' in state;
};

type LocationState = {
  item: Item;
};

export const ElementDetail = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const location = useLocation();
  const item = hasPokemonState(location.state) ? location.state.item : null;

  const handleCloseClick = (): void => {
    void navigate(`/${location.search}`);
  };

  if (!item) {
    return (
      <article className="element-detail">
        <div className="close">
          <button onClick={handleCloseClick}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        <div className="info">
          <p>Data not found. Please go back to the list.</p>
        </div>
      </article>
    );
  }

  return (
    <article className="element-detail">
      <div className="close">
        <button onClick={handleCloseClick}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
      <div className="info">
        <div>
          <h1>{name}</h1>
          <section className="detailed-info">
            <p>Height: {item.height}</p>
            <p>Weight: {item.weight}</p>
            <h3>Abilities:</h3>
            <ul>
              {item.abilities.map((abilityName: string) => (
                <li key={abilityName} className="abilities">
                  {abilityName}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
};
