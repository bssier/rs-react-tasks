'use client';

import './ElementDetail.css';
import Image from 'next/image';
import closeIcon from '../../assets/close.png';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

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

interface ElementDetailProps {
  name: string;
}

export const ElementDetail = ({ name }: ElementDetailProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState<PokemonDetailedInfo | null>(null);

  const t = useTranslations('PokemonDetail');

  const handleCloseClick = () => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.delete('pokemon');
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      setLoading(true);
      setItem(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Not found');
          }
          if (response.status >= 500) {
            throw new Error('Server error.');
          }
          throw new Error('GlobalError data loading');
        }

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return (
    <article className={'element-detail'}>
      <div className={'close'}>
        <button onClick={handleCloseClick} type="button">
          <Image src={closeIcon} alt="close" width={24} height={24} />
        </button>
      </div>
      <div className={'info'}>
        {isLoading && <div className={'loader'}>loading...</div>}
        {!isLoading && item && (
          <div>
            <h1>{name[0].toUpperCase() + name.slice(1)}</h1>
            <section className={'detailed-info'}>
              <p>
                {t('height')}: {item.height}
              </p>
              <p>
                {t('weight')}: {item.weight}
              </p>
              <h3>{t('abilities')}:</h3>
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
