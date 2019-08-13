export const getMock = jest.fn().mockImplementation((url: string) => new Promise(function (resolve, reject) { resolve({ data: 'data' }) }))
export const postMock = jest.fn().mockImplementation((url: string, body: any) => new Promise(function (resolve, reject) { resolve({ data: 'data' }) }))
export const deleteMock = jest.fn().mockImplementation((url: string, body: any) => new Promise(function (resolve, reject) { resolve({ data: 'data' }) }))

export default {
    create: jest.fn().mockImplementation((options: {
        baseURL: string,
        headers: {
            Authorization: string
        }
    }) => ({
        get: getMock,
        post: postMock,
        delete: deleteMock
    }))
};
