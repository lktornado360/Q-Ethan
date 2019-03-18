export function degToRad(deg) {
  return deg * Math.PI / 180;
}

export class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  swap() {
    this.y = [this.x, (this.x = this.y)][0];
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
}
