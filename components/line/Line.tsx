'use client';

import './Line.css';
import Image from 'next/image';
import { useRouter, usePathname } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { toggleItem } from '../../store/itemSlice';
import { useTranslations } from 'next-intl';

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
}

export const Line = ({ item }: Props) => {
  const { hp, attack, defense, speed, img, title } = item;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const t = useTranslations('PokemonCard');

  const isChecked = useSelector((state: RootState) =>
    state.pokemons.selectedItems.some((selected) => selected.title === title)
  );

  const handleCardClick = () => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('pokemon', title);
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return (
    <article className={'line'} onClick={handleCardClick}>
      <div className={'checkbox-container'}>
        <input
          type="checkbox"
          checked={isChecked}
          id={`checkbox-${title}`}
          onChange={() => dispatch(toggleItem(item))}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.stopPropagation()
          }
          className="card-checkbox"
          aria-label={`select ${title}`}
        />
      </div>
      <h3 className={'title'}>
        {title === ''
          ? 'Unknown Pokemon'
          : title[0].toUpperCase() + title.slice(1)}
        <Image
          className={'image'}
          src={img}
          alt={title}
          width={96}
          height={96}
          unoptimized
        />
      </h3>
      <div className={'stats-wrapper'}>
        <div className={'stats'}>
          {t('speed')}: {speed}
        </div>
        <div className={'stats'}>
          {t('defense')}: {defense}
        </div>
        <div className={'stats'}>
          {t('attack')}: {attack}
        </div>
        <div className={'stats'}>
          {t('hp')}: {hp}
        </div>
      </div>
    </article>
  );
};
