import {child, get, getDatabase, ref, set} from 'firebase/database';
import {HighScore} from '../models/HighScore';

function writeScore(highScore: HighScore) {
  const db = getDatabase();
  set(ref(db, 'users/' + highScore.id), {
    name: highScore.name,
    score: highScore.score,
  });
}

function readScores(): Promise<HighScore[]> {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const snapshotScores = snapshot.val();
        console.log(snapshotScores);
        const scores: HighScore[] = [];
        for (let key of Object.keys(snapshotScores)) {
          const snapshotScore = snapshotScores[key];
          scores.push({
            id: key,
            name: snapshotScore.name,
            score: snapshotScore.score,
          });
        }
        return scores.sort(compareTo);
      } else {
        console.log('No data available');
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

function compareTo(a: HighScore, b: HighScore): number {
  return b.score - a.score;
}

export const highScoresRepository = {
  writeScore: writeScore,
  readScores: readScores,
} as const;
