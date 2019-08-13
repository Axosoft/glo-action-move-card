import GloSDK from '../../src/index';
import axios, { getMock, postMock, deleteMock } from '../../__mocks__/axios';
jest.mock('axios');

describe('Board tests', () => {

    beforeEach(() => {
        getMock.mockClear();
        postMock.mockClear();
        deleteMock.mockClear();
    })

    test('Get boards', async () => {
      const response = await GloSDK('fake token').boards.getAll();
      expect(response).toEqual('data')

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(getMock).toHaveBeenCalledWith(`/glo/boards?page=1&per_page=50&archived=false&sort=asc&fields=name`);
    });

    test('Get boards with parameters', async () => {
      const response = await GloSDK('fake token').boards.getAll({
        archived: true,
        page: 2,
        per_page: 25,
        sort: 'desc',
        fields: ['id']
      });

      expect(response).toEqual('data')

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(getMock).toHaveBeenCalledWith(`/glo/boards?page=2&per_page=25&archived=true&sort=desc&fields=id`);
  });

  test('Get board by id', async () => {
    const response = await GloSDK('fake token').boards.get('1234');

    expect(response).toEqual('data');

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(`/glo/boards/1234?fields=name`);
  });

  test('Get board by id with parameters', async () => {
    const response = await GloSDK('fake token').boards.get('1234', { fields: ['members', 'labels'] });

    expect(response).toEqual('data');

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(`/glo/boards/1234?fields=members%2Clabels`);
  });
})
