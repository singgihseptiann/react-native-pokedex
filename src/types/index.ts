export interface Pokemon {
  name: string;
  url: string;
  image?: string;
  imageBack?: string;
  types: string[];
  id: number;
  stats: { hp: number; attack: number; speed: number };
}
