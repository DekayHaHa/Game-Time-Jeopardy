import Game from './Game.js'
import $ from 'jquery';

// import index from './index.js'

export default {
  grabNames () {
    let players = ([$('#player1').val(), $('#player2').val(), $('#player3').val()]);
    return players;
  },
  loadGameBoard (arr) {
    $('.game').removeClass('none');
    $('.intro-page').addClass('none');
    arr.forEach((player, ind) => {
      $('#player' + ([ind + 1]) + '-name-text').text(player.name);
    })
  },
  displayCategories (round) {
    const topics = [
      'U.S. History',
      'Life Sciences',
      'Public Health',
      'Education Jargon',
      'Name That Board Game',
      'American Literature',
      'Biographies',
      'American Cities',
      'Food',
      'Cable TV'];
    round.roundClues.forEach((cat, ind) => {
      let catId = cat[0].categoryId - 1;
      $(`.cat-${ind}`).text(topics[catId])
    });
  },
  gameBoardListener(event, game) {
    if (event.target.tagName.toLowerCase() === 'h2') {
      event.target = event.target.parentElement
    }
    console.log('switch')
    let classItem = event.target.className;
    let currentQuestion; 
    let categoryIndex = event.target.classList[1];
    switch (true) {
    case classItem.includes('100-val'):
      currentQuestion = game.round.roundClues[categoryIndex][0];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      break;
    case classItem.includes('200-val'):
      currentQuestion = game.round.roundClues[categoryIndex][1];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      break;
    case classItem.includes('300-val'):
      currentQuestion = game.round.roundClues[categoryIndex][2];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      break;
    case classItem.includes('400-val'):
      currentQuestion = game.round.roundClues[categoryIndex][3];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      break;
    }
  },
  addQuestionDom(currentQuestion) {
    console.log('add question')

    $('.game').addClass('none');
    $('.clue').removeClass('none');
    var currentClue = `
          <section class="question-display">
           <h1 class="question-title">"${currentQuestion.question} "</h1>
            <label>Answer:</label>
            <input class="guess-text">
            <br>
            <button class="guess-button">Submit Answer</button>
          </section>`;
    $(".clue").html(currentClue);
  },
  checkGuess(round, player, wager) {
    var clue = round.currentClue;
    var correctAnswer = `
            <section class="question-display">
            <h2 class="correct-answer">You are correct!<br>Woot!</h2>
            <label>Next Player?</label>
            <br>
            <button class="next-player">Continue</button>
            </section>`;
    var wrongAnswer = `
            <section class="question-display">
            <h1 class="question-title">You guessed wrong!</h1>
            <h2 class="correct-answer">The correct answer was: <br><span>${clue.answer}</span></h2>
            <label>Next Player?</label>
            <br>
            <button class="next-player">Continue</button>
            </section>`;
    var questionAnswer = clue.answer.toLowerCase();
    if (questionAnswer === $('.guess-text').val().toLowerCase()) {
      $('.clue').html(correctAnswer);
      player.score += wager || clue.pointValue;
    } else {
      $('.clue').html(wrongAnswer);
      player.score -= wager || clue.pointValue;
    }
    this.updateScores(round)
  },
  returnBoard() {
    $('.game').removeClass('none');
    $('.clue').addClass('none');
  },
  updateScores(round) {
    round.players.forEach((player, ind) => {
      $(`#player-${ind}-total`).html(`
        <h4 class="player-score" id="player-${ind}-total">Score: ${player.score} </h4>
        `);
    })
  },
  newRound () {
    $('.box').removeClass('question-used');
  },
  dailyDouble (e, game) {
    console.log('dom dd')

    $('.game').addClass('none');
    $('.clue').removeClass('none');
    var wagerBubble = `
          <section class="question-display">
           <h1 class="daily-double">DAILY DOUBLE!</h1>
            <label>Your Wager:</label>
            <input type="number" class="wager-text">
            <br>
            <button class="wager-button">Submit Wager</button>
          </section>`;
    $(".clue").html(wagerBubble);
    game.round.wager = $('.wager-text').val();
    // $('.wager-button').on('click', this.wagerWait(e, game, game.round.wager))
    let that = this;
    $('.wager-button').on('click', () => {
      return that.wagerWait(e, game, game.round.wager)
    })
    // setTimeout(this.wagerWait, 10000, e, game)
  },
  wagerWait (e, game, wager) {
    console.log('ww')
    // game.round.wager = $('.wager-text').val();
    $('.clue').addClass('none');
    $('.game').removeClass('none');
    console.log(game.round.wager)
    console.log(this)
    this.gameBoardListener(e, game, wager);
  },
  updateGameInfo (game) {
    let counter = `<button class="turn-button">Turns Left:${(game.round.turn - 1)}</button>`;
    $('.turn-area').html(counter);
    let roundBtn = `<button class="round-button">Current Round ${game.roundCount}</button></section>`;
    $('.current-round').html(roundBtn);

  }, 
  resetGame () {
    location.reload();
  }
}


