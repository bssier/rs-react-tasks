'use server';

interface CsvItem {
  title: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export async function generateCsvString(items: CsvItem[]): Promise<string> {
  const headers = ['Name', 'HP', 'Attack', 'Defense', 'Speed'];

  const rows = items.map(
    (item) =>
      `"${item.title}",${item.hp},${item.attack},${item.defense},${item.speed}`
  );

  return [headers.join(','), ...rows].join('\n');
}
