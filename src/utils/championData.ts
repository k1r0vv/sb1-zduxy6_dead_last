import { Champion, ChampionClass } from '../types/champion';

// Initialize champion data structure
const championData: Record<ChampionClass, { sixStar: Champion[], sevenStar: Champion[] }> = {
  Cosmic: {
    sixStar: [
      { name: 'Adam Warlock', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Air-Walker', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Angela', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Annihilus', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Black Bolt', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Captain Marvel', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Captain Marvel (Movie)', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Carnage', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Corvus Glaive', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Cosmic Ghost Rider', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Cull Obsidian', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Drax', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Galan', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Gamora', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Gladiator', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Gorr', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Groot', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Heimdall', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Hela', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Hercules', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Hulkling', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Hyperion', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Ikaris', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'King Groot', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'King Groot (Deathless)', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Knull', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Maestro', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Medusa', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Ms. Marvel', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Ms. Marvel (Kamala Khan)', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Nova', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Odin', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Phoenix', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Proxima Midnight', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Red Goblin', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Ronan', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Sersi', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Silver Surfer', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Spider-Man (Symbiote)', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Super Iron Man', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Super-Skrull', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Terrax', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'The Champion', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'The Serpent', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Thanos', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Thor', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Venom', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Venom the Duck', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Venompool', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Vision', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Vox', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Beta Ray Bill', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] },
      { name: 'Scream', class: 'Cosmic', rankOptions: ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)'] }
    ],
    sevenStar: []
  },
  Mutant: {
    sixStar: [],
    sevenStar: []
  },
  Mystic: {
    sixStar: [],
    sevenStar: []
  },
  Science: {
    sixStar: [],
    sevenStar: []
  },
  Skill: {
    sixStar: [],
    sevenStar: []
  },
  Tech: {
    sixStar: [],
    sevenStar: []
  }
};

export const getChampions = (championClass: ChampionClass) => championData[championClass];

export const getChampionCount = (championClass: ChampionClass, starRating: '6' | '7'): number => {
  return starRating === '6' 
    ? championData[championClass].sixStar.length 
    : championData[championClass].sevenStar.length;
};

export const addChampion = (
  championClass: ChampionClass,
  starRating: '6' | '7',
  champion: Champion
) => {
  if (starRating === '6') {
    championData[championClass].sixStar.push(champion);
  } else {
    championData[championClass].sevenStar.push(champion);
  }
};

export const removeChampion = (
  championClass: ChampionClass,
  starRating: '6' | '7',
  championName: string
) => {
  const list = starRating === '6' 
    ? championData[championClass].sixStar 
    : championData[championClass].sevenStar;
    
  const index = list.findIndex(c => c.name === championName);
  if (index !== -1) {
    list.splice(index, 1);
  }
};

export const updateChampion = (
  championClass: ChampionClass,
  starRating: '6' | '7',
  oldName: string,
  updatedChampion: Champion
) => {
  const list = starRating === '6' 
    ? championData[championClass].sixStar 
    : championData[championClass].sevenStar;
    
  const index = list.findIndex(c => c.name === oldName);
  if (index !== -1) {
    list[index] = updatedChampion;
  }
};