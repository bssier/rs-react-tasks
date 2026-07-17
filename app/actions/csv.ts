'use server';

type CsvItem = {
  title: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
};

export async function generateCsvString(items: CsvItem[]): Promise<string> {
  await Promise.resolve();

  const headers = ['Name', 'HP', 'Attack', 'Defense', 'Speed'];

  const rows = items.map(
    (item) =>
      `"${item.title}",${String(item.hp)},${String(item.attack)},${String(item.defense)},${String(item.speed)}`,
  );

  return [headers.join(','), ...rows].join('\n');
}
