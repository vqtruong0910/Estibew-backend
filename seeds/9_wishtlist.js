/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('wishlist').insert([
    { gameId: 1, userId: 3 },
    { gameId: 1, userId: 2 },
    { gameId: 1, userId: 9 },

    { gameId: 2, userId: 4 },
    { gameId: 2, userId: 3 },

    { gameId: 3, userId: 11 },

    { gameId: 4, userId: 3 },
    { gameId: 4, userId: 2 },

    { gameId: 5, userId: 3 },
    { gameId: 5, userId: 8 },

    { gameId: 6, userId: 5 },
    { gameId: 6, userId: 12 },
    { gameId: 6, userId: 6 },

    { gameId: 7, userId: 3 },
    { gameId: 7, userId: 10 },

    { gameId: 8, userId: 14 },

    { gameId: 9, userId: 13 },
    { gameId: 9, userId: 7 },
    { gameId: 9, userId: 15 },

    { gameId: 10, userId: 13 },
    { gameId: 10, userId: 9 },

    { gameId: 11, userId: 5 },
    { gameId: 11, userId: 6 },
  ]);
};
