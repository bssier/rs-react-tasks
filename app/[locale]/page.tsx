import '../../styles/HomePage.css';
import { Line } from '../../components/line/Line';
import { ElementDetail } from '../../components/element-detail/ElementDetail';
import { HomeClientWrapper } from '../../components/home-client-wrapper/HomeClientWrapper';
import { getTranslations } from 'next-intl/server';

export interface Item {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
}

interface ApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface ApiPokemonDetails {
  name: string;
  sprites: {
    front_default: string | null;
  };
  stats: ApiStat[];
}

interface ApiPokemonListItem {
  name: string;
  url: string;
}

interface ApiPokemonListResponse {
  results: ApiPokemonListItem[];
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function fetchPokemonDetails(url: string): Promise<Item> {
  const res = await fetch(url);
  if (!res.ok) throw new Error();

  const data: ApiPokemonDetails = await res.json();

  const statsMap: Record<string, number> = {};
  data.stats.forEach((s: ApiStat) => {
    statsMap[s.stat.name] = s.base_stat;
  });

  return {
    title: data.name,
    img: data.sprites.front_default ?? '',
    hp: statsMap['hp'] || 0,
    attack: statsMap['attack'] || 0,
    defense: statsMap['defense'] || 0,
    speed: statsMap['speed'] || 0,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const searchQuery =
    typeof resolvedSearchParams?.query === 'string'
      ? resolvedSearchParams.query
      : '';
  const activePokemonName =
    typeof resolvedSearchParams?.pokemon === 'string'
      ? resolvedSearchParams.pokemon
      : undefined;

  const offsetValue = (currentPage - 1) * 12;
  const isSearchMode = searchQuery.length >= 3;

  let pokemonItems: Item[] | null = null;
  let errorMessage = '';

  try {
    if (isSearchMode) {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
      );
      if (res.status === 404) {
        errorMessage = 'Pokemon not found. Please write another name';
      } else if (!res.ok) {
        errorMessage = 'Server error';
      } else {
        const singleData = await fetchPokemonDetails(
          `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
        );
        pokemonItems = [singleData];
      }
    } else {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offsetValue}`
      );
      if (!res.ok) throw new Error('Server error');

      const listData: ApiPokemonListResponse = await res.json();

      pokemonItems = await Promise.all(
        listData.results.map((p: ApiPokemonListItem) =>
          fetchPokemonDetails(p.url)
        )
      );
    }
  } catch {
    errorMessage = 'GlobalError when we fetching data';
  }

  const hasItems = !!(pokemonItems && pokemonItems.length > 0);

  return (
    <HomeClientWrapper
      refreshText={t('refresh-data')}
      currentPage={currentPage}
      hasItems={hasItems}
    >
      {errorMessage && (
        <div className="error-showing-container">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="list-wrapper">
        <section className="list">
          {pokemonItems?.map((pokemonItem: Item) => (
            <Line key={pokemonItem.title} item={pokemonItem} />
          ))}
        </section>
      </div>

      {activePokemonName && <ElementDetail name={activePokemonName} />}
    </HomeClientWrapper>
  );
}
