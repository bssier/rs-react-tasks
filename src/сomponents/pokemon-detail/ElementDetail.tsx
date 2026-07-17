'use client';

import './ElementDetail.css';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useGetPokemonDetailQuery } from '../../../redux/pokemonApi';

export const ElementDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const name = searchParams.get('details');

  const { data: item, isFetching } = useGetPokemonDetailQuery(name ?? '', {
    skip: !name,
  });

  if (!name) {
    return null;
  }

  const handleCloseClick = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <article className="element-detail">
      <div className="close">
        <button type="button" onClick={handleCloseClick}>
          <img src="/close.png" alt="close" />
        </button>
      </div>

      <div className="info">
        {isFetching ? (
          <div className="loader">Loading...</div>
        ) : item ? (
          <div>
            <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
            <section className="detailed-info">
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
            </section>
          </div>
        ) : (
          <p>Data not found.</p>
        )}
      </div>
    </article>
  );
};
