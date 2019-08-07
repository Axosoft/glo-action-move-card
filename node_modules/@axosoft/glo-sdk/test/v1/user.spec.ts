import GloSDK from '../../src/index';
import axios, { getMock, postMock, deleteMock } from '../../__mocks__/axios';
jest.mock('axios');


describe('User tests', () => {

    beforeEach(() => {
        getMock.mockClear();
        postMock.mockClear();
        deleteMock.mockClear();
    })

    test('Get user, no parameters', async () => {
        const response = await GloSDK('fake token').users.getCurrentUser();
        expect(response).toEqual('data')

        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith(`/glo/user?fields=username`);
    });

    test('Get user, with parameters', async () => {
        const response = await GloSDK('fake token').users.getCurrentUser({
            fields: ["username", "email", "id", "name"]
        });
        expect(response).toEqual('data')

        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith(`/glo/user?fields=username%2Cemail%2Cid%2Cname`);
    });
})
