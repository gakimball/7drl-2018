export function Drawable() {
  this.character = ' ';
  this.color = '#fff';
}

export function Location() {
  this.x = 0;
  this.y = 0;
}

export function Solid() {}

export function Living() {}

export function Playable() {
  this.life = 5;
  this.uncertainty = 0;
  this.kindness = 0;
  this.humor = 0;
  this.seriousness = 0;
}

export function Encounterable() {
  this.image = null;
  this.name = 'Unknown Thing';
}

export function Feline() {
  this.gender = 'female';
  this.breed = 'Himalayan';
  this.mood = 0;
  this.questionsAsked = 0;
}

export function Party() {
  this.contents = [];
}
