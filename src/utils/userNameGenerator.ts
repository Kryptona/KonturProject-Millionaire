import {adjectives, nouns} from '../resources/userName';

export function generateUserName(): string {
  return (
    adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' + nouns[Math.floor(Math.random() * nouns.length)]
  );
}
