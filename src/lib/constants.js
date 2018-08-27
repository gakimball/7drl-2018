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
  Weird: 'Weird',
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
    likes: responseTypes.Weird,
    dislikes: [
      responseTypes.Serious,
      responseTypes.Funny,
    ],
  },
  [catPersonalities.Shy]: {
    likes: responseTypes.Kind,
    dislikes: [
      responseTypes.Weird,
      responseTypes.Funny,
    ],
  },
  [catPersonalities.Aloof]: {
    likes: responseTypes.Funny,
    dislikes: [
      responseTypes.Serious,
      responseTypes.Weird,
    ],
  },
  [catPersonalities.Angsty]: {
    likes: responseTypes.Serious,
    dislikes: [
      responseTypes.Weird,
      responseTypes.Kind,
    ],
  },
}

export const statGains = {
  [responseTypes.Serious]: 'seriousness',
  [responseTypes.Kind]: 'kindness',
  [responseTypes.Funny]: 'humor',
  [responseTypes.Weird]: 'weirdness',
};

export const statLosses = {
  [responseTypes.Serious]: 'weirdness',
  [responseTypes.Kind]: 'humor',
  [responseTypes.Funny]: 'seriousness',
  [responseTypes.Weird]: 'kindness',
};

export const statNames = {
  seriousness: 'Seriousness',
  kindness: 'Kindness',
  humor: 'Humor',
  weirdness: 'Weirdness',
};

export const catClasses = {
  Warrior: 'Warrior',
  Wizard: 'Wizard',
  Cleric: 'Cleric',
  Defender: 'Defender',
  Illusionist: 'Illusionist',
  Tactician: 'Tactician',
};

export const catClassMaxHealth = {
  [catClasses.Warrior]: 5,
  [catClasses.Wizard]: 3,
  [catClasses.Cleric]: 4,
  [catClasses.Defender]: 4,
  [catClasses.Illusionist]: 4,
  [catClasses.Tactician]: 1,
}

export const angryCatSendoffs = {
  [catPersonalities.Dreary]: 'I\'m a fragile bird. Please go away. I\'ll tell you a secret: to win the heart of a dreary, oddball cat, you have to be an oddball yourself. Be weird.',
  [catPersonalities.Shy]: 'Why are you so mean?! Can\'t you be nicer? Making friends is hard enough as it is. Be kind to others.',
  [catPersonalities.Aloof]: 'You need to chill out, friend. Don\'t be so serious all the time. Live on the lighter side of life and be funny.',
  [catPersonalities.Angsty]: 'Ugh, you are the worst. Why can\'t people just say what they\'re thinking? Be serious.',
}

export const angryCatPenaltyTypes = {
  Attack: 'Attack',
  Insult: 'Insult',
  Steal: 'Steal',
};

export const angryCatPenaltyProbabilities = {
  [angryCatPenaltyTypes.Attack]: 50,
  [angryCatPenaltyTypes.Insult]: 25,
  [angryCatPenaltyTypes.Steal]: 25,
};

export const angryCatPenaltyMessages = {
  [angryCatPenaltyTypes.Attack]: '%s swipes at you. You take %s damage.',
  [angryCatPenaltyTypes.Insult]: '%s %s. You lose -1 %s.',
  [angryCatPenaltyTypes.Steal]: '%s steals your %s.',
};

export const angryCatInsults = {
  seriousness: 'opens your mind to the existence of chemtrails',
  kindness: 'threatens to close down the local community center',
  humor: 'lectures you on the rise of facism',
  weirdness: 'connects with you telepathically and sets your ego on fire',
};

export const floorNames = {
  names: [
    'Palace',
    'Floor',
    'Hall',
    'Place',
    'Sandbox',
    'Castle',
    'Lair',
    'Building',
    'Bulding',
    'Playground',
    'Keep',
    'Dungeon',
    'Jail',
    'Prison',
    'Labrynth',
  ],
  descriptors: [
    'Happyness',
    'Sadness',
    'Angst',
    'Absurdity',
    'Pleasure',
    'Death',
    'Life',
    'Existential Crises',
    'Breakfast',
    'Eggplants',
    'Cats',
    'Kittens',
    'Relationships',
    'Authoritarianism',
    'Biting',
    'People You Can\'t Unfriend',
    'Parties',
    'Birthdays',
    'the Full Moon',
    'the Half Moon',
    'the Cat\'s Meow',
    'the Eternal September',
    'the Cat',
  ],
};

export const pronouns = {
  female: 'Her',
  male: 'His',
  nonbinary: 'Their',
};

export const hints = [
  'Cats with an angsty personality want you to be straight with them. Give them serious, no-nonsense answers to questions.',
  'Cats with an aloof personality want you to joke around with them. Give them funny, absurd answers to questions.',
  'Cats with a dreary personality are on the esoteric side. Give them strange answers and non-sequiters.',
  'Cats with a shy personality are sensitive. Show them empathy by giving kind answers to questions.',
  'In battle, a Warrior cat can deal damage to the enemy gang. However, a Warrior\'s attacks can be blocked by an opposing Defender.',
  'In battle, a Defender cat can reduce incoming damage to allies from the incoming gang. They have high HP, but they take the full amount of damage themselves.',
  'In battle, a Wizard cat can cast spells that deal damage to the enemy gang, ignoring any enemy Defenders. However, they have the lowest HP of any front line class.',
  'In battle, an Illusionist can cast spells to help your gang or harm the enemy gang. These cats are absent-minded, so the spell they cast is completely random.',
  'In battle, a Cleric cat can heal your gang. The healing happens before the enemy gang attacks, so make sure you don\'t kill your healer in the process.',
  'In battle, a Tactician cannot be assigned to the front lines. Instead, merely having them in your gang adds an extra slot to your front line.',
  'Burn (Illusionist spell): applies a burn effect to the enemy gang. Each turn, they have a chance to take 1 damage at the end of the round, even if they\'ve retreated.',
  'Sleep (Illusionist spell): lulls the enemy gang into a catnap. The enemy\'s front line won\'t change next turn.',
  'Barrier (Illusionist spell): mitigates 1 damage of any type against your gang next turn.',
  'Energize (Illusionist spell): next turn, the cat in the top slot of your gang\'s front line will act twice or have double the normal effect.',
];

export const smells = [
  'a greasy ankle',
  'a garish frown',
  'an aged banana',
  'burning flesh',
  'wet sheets',
  'an old car engine',
  'an elderly man\'s memories',
  'a dying snake',
  'a powerful musk ox',
];
