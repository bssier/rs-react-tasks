import './line.css';

interface Item {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
}

interface Props {
  item: Item;
}

export const Line = ({ item }: Props) => {
  const { hp, attack, defense, speed, img, title } = item;
  return (
    <div className={'line'}>
      <div className={'title'}>
        {title[0].toUpperCase() + title.slice(1)}
        <img className={'image'} src={img} alt={'image'}></img>
      </div>
      <div className={'stats-wrapper'}>
        <div className={'stats'}>Speed: {speed}</div>
        <div className={'stats'}>Defense: {defense}</div>
        <div className={'stats'}>Attack: {attack}</div>
        <div className={'stats'}>Hp: {hp}</div>
      </div>
    </div>
  );
};
