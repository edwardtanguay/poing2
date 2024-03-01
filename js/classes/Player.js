import Character from './Character.js';

export default class Player extends Character {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  score = 0;
}