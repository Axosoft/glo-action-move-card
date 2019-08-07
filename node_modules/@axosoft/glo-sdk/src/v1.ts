import a from 'axios';
import { Attachment, Board, Card, Column, Comment, GetAttachmentOptions, GetAllBoardOptions, GetBoardOptions, GetCardOptions, GetCommentOptions, GetUserOptions, PageOptions, User, BoardField } from './v1_types';

export default v1;

function v1(token: string) {
  const axios = a.create({
    baseURL: `https://gloapi.gitkraken.com/v1/`,
    headers: {
      'Authorization': token
    }
  });

  const defaultGetAllBoardOptions = {
    archived: false,
    page: 1,
    per_page: 50,
    sort: 'asc',
    fields: ['name'],
  }

  const getAllBoards = async (options?: GetAllBoardOptions): Promise<[Board]> => {
    const mergedOptions = {
      ...defaultGetAllBoardOptions,
      ...options
    }
    return (
      await axios.get(`/glo/boards?page=${mergedOptions.page}&per_page=${mergedOptions.per_page}&archived=${mergedOptions.archived}&sort=${mergedOptions.sort}&fields=${mergedOptions.fields.join('%2C')}`)
    ).data;
  }

  const boards = {
    get: async (board_id: string, options?: GetBoardOptions): Promise<Board> => {
      return (
        await axios.get(`/glo/boards/${board_id}?fields=${ ((options && options.fields) || ['name']).join('%2C')}`
        )
      ).data;
    },
    columns: {
      edit: async (board_id: string, column_id: string, { column_name, position }: { column_name?: string, position?: number }): Promise<Column> => {
        return (await axios.post(`/glo/boards/${board_id}/columns/${column_id}`, { name: column_name, position })).data;
      },
      delete: async (board_id: string, column_id: string): Promise<Column> => {
        return (await axios.delete(`/glo/boards/${board_id}/columns/${column_id}`)).data;
      },
      getCards: async (board_id: string, column_id: string, options?: GetCardOptions & PageOptions & { archived: boolean, sort: 'asc' | 'desc' }): Promise<[Card]> => {
        return (
          await axios.get(`/glo/boards/${board_id}/columns/${column_id}/cards?page=${ (options && options.page) || 1}&per_page=${ (options && options.per_page) || 50}&archived=${ (options && options.archived) || false}&sort=${ (options && options.sort) || 'asc'}&fields=${ ((options && options.fields) || ['name', 'board_id', 'column_id']).join('%2C')}`)
        ).data;
      },
      create: async (board_id: string, column_name: string, position = 0): Promise<Column> => {
        return (await axios.post(`/glo/boards/${board_id}/columns`, { name: column_name, position })).data;
      }
    },
    cards: {
      get: async (board_id: string, card_id: string, options?: GetCardOptions): Promise<Card> => {
        return (await axios.get(`/glo/boards/${board_id}/cards/${card_id}?fields=${(options ? options.fields : ['name', 'board_id', 'card_id']).join('%2C')}`)).data
      },
      edit: async (board_id: string, card_id: string, card: Card): Promise<Card> => {
        return (await axios.post(`/glo/boards/${board_id}/cards/${card_id}`, card)).data;
      },
      delete: async (board_id: string, card_id: string): Promise<any> => {
        return (await axios.delete(`/glo/boards/${board_id}/cards/${card_id}`)).data;
      },
      getAttachments: async (board_id: string, card_id: string, options?: GetAttachmentOptions & PageOptions & { sort: 'asc' | 'desc' }): Promise<[Attachment]> => {
        return (
          await axios.get(`/glo/boards/${board_id}/cards/${card_id}/attachments?page=${(options && options.page) || 1}&per_page=${(options && options.per_page) || 50}&sort=${(options && options.sort) || 'asc'}&fields=${((options && options.fields) || ['filename', 'mime_type']).join('%2C')}`)
        ).data;
      },
      comments: {
        edit: async (board_id: string, card_id: string, comment_id: string, comment: Comment): Promise<Comment> => {
          return (await axios.post(`/glo/boards/${board_id}/cards/${card_id}/comments/${comment_id}`, comment)).data;
        },
        delete: async (board_id: string, card_id: string, comment_id: string): Promise<any> => {
          return (await axios.delete(`/glo/boards/${board_id}/cards/${card_id}/comments/${comment_id}`)).data;
        },
        get: async (board_id: string, card_id: string, options?: GetCommentOptions & PageOptions & { sort: 'asc' | 'desc' }): Promise<[Comment]> => {
          return (
            await axios.get(`/glo/boards/${board_id}/cards/${card_id}/comments?page=${(options && options.page) || 1}&per_page=${(options && options.per_page) || 50}&sort=${(options && options.sort) || 'asc'}&fields=${((options && options.fields) || ['text']).join('%2C')}`)
          ).data;
        },
        create: async (board_id: string, card_id: string, comment: Comment): Promise<Comment> => {
          return (await axios.post(`/glo/boards/${board_id}/cards/${card_id}/comments`, comment)).data;
        }
      },
      getAll: async (board_id: string, options?: GetCardOptions & PageOptions & { archived: boolean, sort: 'asc' | 'desc' }): Promise<[Card]> => {
        return (
          await axios.get(`/glo/boards/${board_id}/cards?page=${ (options && options.page) || 1}&per_page=${ (options && options.per_page) || 50}&archived=${ (options && options.archived) || false}&sort=${ (options && options.sort) || 'asc'}&fields=${ ((options && options.fields) || ['name', 'board_id', 'column_id']).join('%2C')}
        `)
        ).data;
      },
      create: async (board_id: string, card: Card): Promise<Card> => {
        return (await axios.post(`/glo/boards/${board_id}/cards`, card)).data
      }
    },
    getAll: getAllBoards
  }

  const users = {
    getCurrentUser: async (options?: GetUserOptions): Promise<User> => {
      return (await axios.get(`/glo/user?fields=${((options && options.fields) || ['username']).join('%2C')}`)).data
    }
  };

  return {
    getAllBoards,
    boards,
    users
  }
}
