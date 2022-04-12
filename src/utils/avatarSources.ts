import icon_1 from '../img/avatars/icon_1.png';
import icon_2 from '../img/avatars/icon_2.png';
import icon_3 from '../img/avatars/icon_3.png';
import icon_4 from '../img/avatars/icon_4.png';
import icon_5 from '../img/avatars/icon_5.png';
import icon_6 from '../img/avatars/icon_6.png';
import icon_7 from '../img/avatars/icon_7.png';
import icon_8 from '../img/avatars/icon_8.png';
import icon_9 from '../img/avatars/icon_9.png';
import icon_10 from '../img/avatars/icon_10.png';
import icon_11 from '../img/avatars/icon_11.png';
import icon_12 from '../img/avatars/icon_12.png';
import icon_13 from '../img/avatars/icon_13.png';
import icon_14 from '../img/avatars/icon_14.png';
import icon_15 from '../img/avatars/icon_15.png';
import icon_16 from '../img/avatars/icon_16.png';

const avatars = [
  icon_1,
  icon_2,
  icon_3,
  icon_4,
  icon_5,
  icon_6,
  icon_7,
  icon_8,
  icon_9,
  icon_10,
  icon_11,
  icon_12,
  icon_13,
  icon_14,
  icon_15,
  icon_16,
];

export function stringToAvatar(value: string): string {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum += value.charCodeAt(i);
  }

  return avatars[sum % avatars.length];
}
