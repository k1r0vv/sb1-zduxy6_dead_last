export type ChampionClass = 'Cosmic' | 'Mutant' | 'Mystic' | 'Science' | 'Skill' | 'Tech';

export interface Champion {
  id: string;
  name: string;
  class: ChampionClass;
  starRating: '6' | '7';
  rankOptions: string[];
  fullImage?: string;
  portraitImage?: string;
}