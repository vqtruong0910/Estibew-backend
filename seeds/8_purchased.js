/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const _ = require('lodash');
  const moment = require('moment/moment');

  await knex('purchased').insert([
    { gameId: 1, userId: 1 },
    { gameId: 1, userId: 2 },
    { gameId: 1, userId: 3 },
    { gameId: 1, userId: 4 },
    { gameId: 1, userId: 5 },
    { gameId: 1, userId: 6 },
    { gameId: 1, userId: 7 },
    { gameId: 1, userId: 8 },
    { gameId: 1, userId: 9 },

    { gameId: 2, userId: 4 },
    { gameId: 2, userId: 3 },
    { gameId: 2, userId: 6 },
    { gameId: 2, userId: 5 },
    { gameId: 2, userId: 11 },

    { gameId: 3, userId: 5 },
    { gameId: 3, userId: 8 },
    { gameId: 3, userId: 9 },
    { gameId: 3, userId: 4 },
    { gameId: 3, userId: 11 },

    { gameId: 4, userId: 1 },
    { gameId: 4, userId: 5 },
    { gameId: 4, userId: 11 },
    { gameId: 4, userId: 2 },

    { gameId: 5, userId: 1 },
    { gameId: 5, userId: 5 },
    { gameId: 5, userId: 11 },
    { gameId: 5, userId: 8 },

    { gameId: 6, userId: 5 },
    { gameId: 6, userId: 12 },
    { gameId: 6, userId: 6 },

    { gameId: 7, userId: 1 },
    { gameId: 7, userId: 10 },

    { gameId: 8, userId: 2 },
    { gameId: 8, userId: 5 },
    { gameId: 8, userId: 9 },
    { gameId: 8, userId: 13 },
    { gameId: 8, userId: 14 },

    { gameId: 9, userId: 13 },
    { gameId: 9, userId: 7 },
    { gameId: 9, userId: 15 },

    { gameId: 10, userId: 13 },
    { gameId: 10, userId: 2 },
    { gameId: 10, userId: 16 },
    { gameId: 10, userId: 9 },

    { gameId: 11, userId: 5 },
    { gameId: 11, userId: 2 },
    { gameId: 11, userId: 6 },
  ]);

  for (let i = 1; i <= 20; i++) {
    await knex('purchased').insert({
      gameId: _.random(1, 10),
      userId: _.random(1, 20),
      created: moment().subtract(1, 'days')
    })

    await knex('purchased').insert({
      gameId: _.random(1, 10),
      userId: _.random(1, 20),
      created: moment().subtract(30, 'days')
    })
  }
};
