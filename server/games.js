let games = [];

// map of room names to interval IDs
let pendingRemovals = {};

const addGame = (room, users) => {
  
  console.log('room', room)
  console.log('find anything?', games.find((game) => game.id == room))
  if (games.find((game) => game.id == room)) {
    console.log('already started game with id', room)
    return;
  }
  const newCards = [];
  const newGame = {
    id: room,
    cards: newCards,
    newRound: false,
    finishedGame: false,
    split: false,
    currentRound: 0,
  }
  games.push(newGame)
  console.log('games', games);
  console.log('users', users)
  return games;
}

const restartGame = (room, users) => {
  const gameToRemove = games.findIndex((game) => game.id == room);
  console.log('game to remove', gameToRemove)
  if (gameToRemove === -1) {
    return
  }
  console.log('games length', games.length)
  games.splice(gameToRemove, 1);
  console.log('games length after', games.length)
  users.map((u) => {
    u.answerSubmitted = false;
  })
  return games;
}

const getGame = (id) => games.find((game) => game.id === id);

const updateCards = (room, cards) => {
  let game = games.find((game) => game.id === room);
  game.cards = cards.map((c) => {
    const randX = 1000 + Math.floor(Math.random() * 650);
    const randY = 1230 + Math.floor(Math.random() * 645);
    return {x: randX, y: randY, ...c}
  });
  return game;
}

const updateTile = (room, id, x, y, user, limbo) => {
  let game = games.find((game) => game.id === room);
  if (game && game.cards) {
    card = game.cards.find((card) => card.id === id);
    card.x = x;
    card.y = y;
    card.user = user;
    if (limbo) {
      card.limbo = true;
    } else {
      card.limbo = false;
    }
    return card;
  }
}

const endGame = (room) => {
  let game = games.find((game) => game.id === room);
  game.finishedGame = true;
  return game;
}

const splitGame = (room) => {
  let game = games.find((game) => game.id === room);
  game.split = true;
  return game;
}

const removeGame = (room) => {
  const index = games.findIndex((game) => game.id === room);

  if (index !== -1) {
    console.log('games before deleting', games)
    games.splice(index, 1)[0];
    console.log('games after deleting', games)
  }
}

const scheduleRemoveGame = (room, getUsersInRoom) => {
  let intervalId = setInterval(() => {
    console.log('deleting this room', room);
    const index = games.findIndex((game) => game.id === room);

    if (index !== -1) {
      const users = getUsersInRoom(room)
      if (users.length > 0) {
        console.log('there are still users in the room so do not delete it')
        return;
      } else {
        //delete the room for real
        console.log('games before deleting', games)
        games.splice(index, 1)[0];
        let intervalToStop = pendingRemovals[room];
        if (intervalToStop) {
          clearInterval(intervalToStop);
          delete pendingRemovals[room];
        }
        console.log('games after deleting', games)
      }
    }

  }, 5400000) // check 1.5 hours
  pendingRemovals[room] = intervalId;
}

module.exports = { addGame, getGame, restartGame, removeGame, scheduleRemoveGame, updateCards, updateTile, endGame, splitGame };