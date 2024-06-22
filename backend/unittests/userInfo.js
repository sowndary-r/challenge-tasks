
const request = require('supertest');
const userInfoController = require('../controllers/userInfo.controller.js')
const {getAllChallengers , insertChallengers} = require('../models/userInfo.model.js')

jest.mock('../backend/models/userInfo.model.js', () => ({
    insertChallengers: jest.fn(),
    getAllChallengers: jest.fn()
}));

describe('userinfo api', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
      challengers : ["shanmu","sowndarya"]
      }
    };

    res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('success scenario', async () => {
    
    const Data = ["sowndarya","shanmu"];

    insertChallengers.mockResolvedValueOnce(Data);

    await userInfoController.insertChallengers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      data: {
        status: "success",
        message: "challengers are added successfully"
      }
    });
  });

});
