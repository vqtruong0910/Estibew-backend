/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('review').insert([
    { comment: "Testing...", like: true, gameId: 1, userId: 1 },
    { comment: "Testing...", like: true, gameId: 1, userId: 3 },

    { comment: "Testing...\nTesting2\nTesting3", like: false, gameId: 2, userId: 4 },
    { comment: "Testing...", like: true, gameId: 2, userId: 3 },

    { comment: "Testing...", like: false, gameId: 3, userId: 5 },
    { comment: "Testing...", like: false, gameId: 3, userId: 9 },

    { comment: "Testing...\nTesting2\nTesting3...", like: true, gameId: 4, userId: 1 },
    { comment: "Testing...", like: true, gameId: 4, userId: 2 },

    { comment: "Testing...", like: true, gameId: 5, userId: 11 },
    { comment: "Testing...\nTesting2\nTesting3...", like: false, gameId: 5, userId: 5 },

    { comment: "Testing...", like: true, gameId: 6, userId: 5 },

    { comment: "Testing...", like: true, gameId: 7, userId: 1 },
    { comment: "Testing...", like: true, gameId: 7, userId: 10 },

    { comment: "Testing...", like: true, gameId: 8, userId: 2 },

    { comment: "Testing...", like: true, gameId: 9, userId: 13 },
    { comment: "Testing...\nTesting2\nTesting3...", like: false, gameId: 9, userId: 11 },
    { comment: "Testing...", like: false, gameId: 9, userId: 15 },

    { comment: "Testing...\nTesting2\nTesting3...", like: true, gameId: 10, userId: 3 },
    { comment: "Testing...", like: false, gameId: 10, userId: 2 },
    { comment: "Testing...", like: false, gameId: 10, userId: 1 },
    { comment: "Testing...", like: true, gameId: 10, userId: 4 },

    { comment: "Testing...", like: true, gameId: 11, userId: 5 },
    { comment: "Testing...\nTesting2\nTesting3...", like: false, gameId: 11, userId: 6 },
    { comment: "Testing...", like: true, gameId: 11, userId: 7 },
  ]);
};
