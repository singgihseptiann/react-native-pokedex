import { Pokemon } from '../types';

export const getPokemons = async (limit: number): Promise<Pokemon[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  const detailed = await Promise.all(
    data.results.map(async (p: { name: string; url: string }) => {
      const res = await fetch(p.url);
      const d = await res.json();
      return {
        name: d.name,
        url: p.url,
        id: d.id,
        image: d.sprites.front_default,
        imageBack: d.sprites.back_default,
        types: Array.isArray(d.types) ? d.types.map((t: any) => t.type.name) : [],
        stats: {
          hp: d.stats?.[0]?.base_stat ?? 0,
          attack: d.stats?.[1]?.base_stat ?? 0,
          speed: d.stats?.[5]?.base_stat ?? 0,
        },
      };
    }),
  );
  return detailed;
};
