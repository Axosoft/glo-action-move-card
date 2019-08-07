import * as core from '@actions/core';
import GloSDK from '@axosoft/glo-sdk';

interface ICard {
  boardId: string;
  cardId: string;
}

async function run() {
  const authToken = core.getInput('authToken');
  const cardsJson = core.getInput('cards');
  const columnName = core.getInput('column');

  try {
    const cards = JSON.parse(cardsJson);
    if (!cards) {
      return;
    }

    for (let i = 0; i < cards.length; i++) {
      const cardData = cards[i] as ICard;
      const {boardId, cardId} = cardData;

      // find the board { id, columns }
      const board = await GloSDK(authToken).boards.get(boardId, {
        fields: ['columns']
      });
      if (!board) {
        core.setFailed(`Board ${boardId} not found`);
        continue;
      }
      core.debug(JSON.stringify(board));

      // find the card { id, labels }
      const card = await GloSDK(authToken).boards.cards.get(boardId, cardId, {
        fields: ['column_id']
      });
      if (!card) {
        core.setFailed(`Card ${cardId} not found`);
        continue;
      }

      // find column
      if (board.columns) {
        const column = board.columns.find(c => c.name === columnName);
        if (column) {
          // move the card to new column
          card.column_id = column.id;

          // update card
          await GloSDK(authToken).boards.cards.edit(boardId, cardId, card);
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
