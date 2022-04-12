import {child, get, getDatabase, ref, set} from 'firebase/database';
import {User} from '../models/User';
import {HighScore} from '../models/HighScore';

function writeScore(user: User, score: HighScore) {
  const db = getDatabase();
  set(ref(db, 'users/' + user.id), {
    name: user.name,
    score: score.amount,
  });
}

function readScores() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export const appRepository = {
  writeScore: writeScore,
  readScores: readScores,
} as const;
