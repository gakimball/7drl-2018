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

export function Playable() {}

export function Encounterable() {
  this.image = null;
  this.name = 'Unknown Thing';
}
