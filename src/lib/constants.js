export const catBreeds = [
  'Abyssinian',
  'Aegean',
  'American Curl',
  'American Bobtail',
  'American Shorthair',
  'Aphrodite\'s Giant',
  'Arabian Mau',
  'Australian Mist',
  'Asian',
  'Asian Semi-longhair',
  'Balinese',
  'Bambino',
  'Bengal',
  'Birman',
  'Bombay',
  'Barazilian Shorthair',
  'British Semi-longhair',
  'British Shorthair',
  'British Longhair',
  'Burmese',
  'California Spangled',
  'Chantilly-Tiffany',
  'Chartreux',
  'Chausie',
  'Cheetoh',
  'Colourpoint Shorthair',
  'Cornish Rex',
  'Cymric',
  'Cyprus',
  'Devon Rex',
  'Donskoy',
  'Dragon Li',
  'Dwarf',
  'Egyptian Mau',
  'European Shorthair',
  'Exotic Shorthair',
  'Foldex',
  'German Rex',
  'Havana Brown',
  'Highlander',
  'Himalayan',
  'Japanese Bobtail',
  'Javanese',
  'Khao Manee',
  'Korat',
  'Kurilian Bobtail',
  'LaPerm',
  'Lykoi',
  'Maine Coon',
  'Manx',
  'Mekong Bobtail',
  'Minskin',
  'Munchkin',
  'Nebelung',
  'Napoleon',
  'Norwegian Forest',
  'Ocicat',
  'Ojos Azules',
  'Oregon Rex',
  'Oriental Bicolor',
  'Oriental Shorthair',
  'Oriental Longhair',
  'PerFold',
  'Modern Persian',
  'Traditional Persian',
  'Peterbald',
  'Pixie-bob',
  'Raas',
  'Ragamuffin',
  'Ragdoll',
  'Russian Blue',
  'Russian White',
  'Russian Black',
  'Russian Tabby',
  'Sam Sweet',
  'Savannah',
  'Scottish Fold',
  'Selkirk Rex',
  'Serengeti',
  'Serrande petit',
  'Siamese',
  'Siberian',
  'Singapura',
  'Snowshoe',
  'Sokoke',
  'Somali',
  'Sphynx',
  'Suphalak',
  'Thai',
  'Thai Lilac',
  'Tonkinese',
  'Toyger',
  'Turkish Angora',
  'Turkish Van',
  'Ukranian Levkoy',
  'York Chocoalte',
];

export const catGenders = [
  'male',
  'female',
  'nonbinary',
];

export const responseTypes = {
  Vague: 'Vague',
  Kind: 'Kind',
  Funny: 'Funny',
  Serious: 'Serious',
};

export const catPersonalities = {
  Dreary: 'Dreary',
  Shy: 'Shy',
  Aloof: 'Aloof',
  Angsty: 'Angsty',
};

export const catResponses = {
  [catPersonalities.Dreary]: {
    likes: responseTypes.Vague,
    dislikes: [
      responseTypes.Serious,
      responseTypes.Funny,
    ],
  },
  [catPersonalities.Shy]: {
    likes: responseTypes.Kind,
    dislikes: [
      responseTypes.Vague,
      responseTypes.Funny,
    ],
  },
  [catPersonalities.Aloof]: {
    likes: responseTypes.Funny,
    dislikes: [
      responseTypes.Serious,
      responseTypes.Vague,
    ],
  },
  [catPersonalities.Angsty]: {
    likes: responseTypes.Serious,
    dislikes: [
      responseTypes.Vague,
      responseTypes.Kind,
    ],
  },
}

export const sampleQuestion = {
  text: `I'm thinking about buying a boat. Would that be a waste of money?`,
  answers: {
    [responseTypes.Serious]: 'Yes, that would be a complete waste of money.',
    [responseTypes.Kind]: 'If a boat would make you happy, you should buy a boat!',
    [responseTypes.Funny]: 'Only if you take me with you so we can sail off into the sunset together.',
    [responseTypes.Vague]: 'What is waste? What is money?',
  },
};

export const statGains = {
  [responseTypes.Serious]: 'seriousness',
  [responseTypes.Kind]: 'kindness',
  [responseTypes.Funny]: 'humor',
  [responseTypes.Vague]: 'uncertainty',
};

export const statLosses = {
  [responseTypes.Serious]: 'uncertainty',
  [responseTypes.Kind]: 'humor',
  [responseTypes.Funny]: 'seriousness',
  [responseTypes.Vague]: 'kindness',
};

export const statNames = {
  seriousness: 'Seriousness',
  kindness: 'Kindness',
  humor: 'Humor',
  uncertainty: 'Vague',
};

export const catClasses = {
  Warrior: 'Warrior',
  Wizard: 'Wizard',
  Cleric: 'Cleric',
  Defender: 'Defender',
  Illusionist: 'Illusionist',
  Tactician: 'Tactician',
};
