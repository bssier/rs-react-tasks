import './Line.css';

export type Item = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
};

type Props = {
  item: Item;
  isChecked: boolean;
  handleCheckboxChange: () => void;
  onClick?: () => void;
};

export const Line = ({ item, onClick }: Props) => {
  const { hp, attack, defense, speed, img, title } = item;
  const firstLetter = title.at(0)?.toUpperCase() ?? '';
  const restOfName = title.slice(1);
  const displayName =
    title.trim() === '' ? 'Unknown Pokemon' : firstLetter + restOfName;

  return (
    <article className="line" onClick={onClick}>
      <h3 className="title">
        {displayName}
        <img className="image" src={img} alt={title}></img>
      </h3>
      <div className="stats-wrapper">
        <div className="stats">Speed: {speed}</div>
        <div className="stats">Defense: {defense}</div>
        <div className="stats">Attack: {attack}</div>
        <div className="stats">Hp: {hp}</div>
      </div>
    </article>
  );
};
