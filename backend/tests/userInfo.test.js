
const request = require('supertest');
const userInfoController = require('../controllers/userInfo.controller.js')
const {insertUserInfo,getUserInfo } = require('../models/userInfo.model.js')

jest.mock('../models/userInfo.model.js', () => ({
  insertUserInfo: jest.fn(),
  getUserInfo:jest.fn()
}));


// insert challengers - post api test
describe('insert challengers', () => {
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

    insertUserInfo.mockResolvedValueOnce(Data);

    await userInfoController.insertChallengers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "challengers are added successfully"
    });
  });
 
});

//get challengers - get api test
describe('get all challengers', ()=>{
  let req,res;
  beforeEach(() => {
    res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('success scenario', async () => {
    let Data = [{"id":1,"userName" : "sowndarya"}]
    getUserInfo.mockResolvedValueOnce(Data);

    await userInfoController.getChallengers(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
   
    expect(res.json).toHaveBeenCalledWith({
      status:"success",
      data: Data
    });
  });
})
