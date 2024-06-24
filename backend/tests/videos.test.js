
const request = require('supertest');
const videoController = require('../controllers/videos.controller.js')
const {insertVideos,getVideos } = require('../models/videos.model.js');
const { query } = require('express');

jest.mock('../models/videos.model.js', () => ({
    insertVideos: jest.fn(),
    getVideos:jest.fn()
}));


// insert challenges - post api test
describe('insert videos', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: 
        {
            "date" : "2024-03-06",
            "videos": [
                {"id" : 3,
                "userName" : "srini",
                "video" : "hdskdhkduakda" 
                },
                {"id" : 4,
                "userName" : "shanmu",
                "video" : "dodhwoieowifw"
                }
           ]
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

    insertVideos.mockResolvedValueOnce();

    await videoController.postChallenges(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "videos are posted successfully"
    });
  });
 
});

//get challenges - get api test
describe('get all challengers', ()=>{
    let req,res;
    req = {
        query: "2024-05-06"
      };
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
      let Data = [
        {
        "id" : 1,
        "userName" : "sownd",
        "vide0" : "xxxxxx",
        "uploadedDate":"2024-05-06"
        }
    ]
      getVideos.mockResolvedValueOnce(Data);
  
      await videoController.getChallenges(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
     
      expect(res.json).toHaveBeenCalledWith({
        status:"success",
        data: Data
      });
    });
  })

