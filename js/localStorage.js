const STORAGE_KEY = 'cluck&catch_scores';

function saveScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([scores]));
}

function getScores() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function addPlayerScore(name, score) {
  const scores = getScores();

  scores.push({
    name: name,
    score,
    date: new Date().toISOString()
  });
  scores.sort((a, b) => b.score - a.score);
  saveScores(scores.slice(0, 5));
}

function getFinalScoreMessage(name, score) {
    const newHighScoreMessage = `Congratulations ${name}, you just created a new high score catching ${score} chicks!!!!`
    const equalledHighScoreMessage = `Congratulations ${name}, you just equalled the high score by catching ${score} chicks!!!`
    const gameOverScoreMessage = `Hi ${name}, you caught ${score} chicks.`
    const scores = getScores();
    if (scores.length === 0) {
        return newHighScoreMessage
    }
    const highestScore = scores[0]
    if (score > highestScore) {
        return newHighScoreMessage
    } else if (score === highestScore) {
        return equalledHighScoreMessage
    }
    return gameOverScoreMessage
}

