export function Drawable() {
  this.character = ' ';
  this.color = '#fff';
}

export function Location() {
  this.x = 0;
  this.y = 0;
}

export function Solid() {}

export function Living() {
  this.health = 1;
  this.maxHealth = 1;
}

export function Playable() {
  this.weirdness = 0;
  this.kindness = 0;
  this.humor = 0;
  this.seriousness = 0;
}

export function Inventory() {
  this.limit = 2;
  this.contents = [];
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

export function Item() {
  this.name = 'Unknown Item';
  this.effect = () => {};
  this.message = null;
}

export function Alluring() {}

export function Gang() {
  this.name = 'Tuffbois';
}
