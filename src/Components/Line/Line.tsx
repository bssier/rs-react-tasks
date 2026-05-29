import './line.css';

export interface Item {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
}

interface Props {
  item: Item;
  isChecked: boolean;
  handleCheckboxChange: () => void;
}

export const Line = ({ item, isChecked, handleCheckboxChange }: Props) => {
  const { hp, attack, defense, speed, img, title } = item;
  return (
    <article className={'line'}>
      <div className={'checkbox-container'}>
        <input
          type={'checkbox'}
          checked={isChecked}
          id={`checkbox-${title}`}
          onChange={handleCheckboxChange}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.stopPropagation()
          }
          className="card-checkbox"
          aria-label={`select ${title}`}
        />
      </div>
      <div className={'title'}>
         {title === "" ? 'Unknown Pokemon': title[0].toUpperCase() + title.slice(1)}
        <img className={'image'} src={img} alt={title}></img>
      </div>
      <div className={'stats-wrapper'}>
        <div className={'stats'}>Speed: {speed}</div>
        <div className={'stats'}>Defense: {defense}</div>
        <div className={'stats'}>Attack: {attack}</div>
        <div className={'stats'}>Hp: {hp}</div>
      </div>
    </article>
  );
};
