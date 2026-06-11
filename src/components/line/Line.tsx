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
  return (
    <article className="line" onClick={onClick}>
      <h3 className="title">
        {title === ''
          ? 'Unknown Pokemon'
          : title[0].toUpperCase() + title.slice(1)}
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
