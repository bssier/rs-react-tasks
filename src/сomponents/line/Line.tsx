'use client';

import './Line.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { Item } from '../../types/homePageTypes';

type Props = {
  item: Item;
  isChecked: boolean;
  handleCheckboxChange: () => void;
};

export const Line = ({ item, isChecked, handleCheckboxChange }: Props) => {
  const { hp, attack, defense, speed, img, title } = item;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLineClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', title);
    router.push(`${pathname}?${params.toString()}`);
  };

  const firstLetter = title.at(0)?.toUpperCase() ?? '';
  const restOfName = title.slice(1);
  const displayName =
    title.trim() === '' ? 'Unknown Pokemon' : firstLetter + restOfName;

  return (
    <article className="line" onClick={handleLineClick}>
      <div className="checkbox-container">
        <input
          type="checkbox"
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
      <h3 className="title">
        {displayName}
        <img className="image" src={img} alt={title} />
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
