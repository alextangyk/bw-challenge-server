const request = require("supertest");
const app = require("../app");
const axios = require("axios")
const {StatusCodes} = require('http-status-codes');

jest.mock("axios");

describe("Test GET /api/topics", () => {
  test("have success response", async () => {
    const responseData = {
      topics: [
        {
          "id": "1751295897__Berlin",
          "label": "Berlin",
          "volume": 165,
          "type": "topic",
          "sentiment": {
            "negative": 3,
            "neutral": 133,
            "positive": 29
          },
          "sentimentScore": 65,
          "burst": 13,
          "days": [
            {
              "date": "2014-06-06T00:00:00.000+0000",
              "volume": 22
            },
            {
              "date": "2014-06-04T00:00:00.000+0000",
              "volume": 43
            },
            {
              "date": "2014-06-09T00:00:00.000+0000",
              "volume": 0
            },
            {
              "date": "2014-06-07T00:00:00.000+0000",
              "volume": 12
            },
            {
              "date": "2014-06-08T00:00:00.000+0000",
              "volume": 11
            },
            {
              "date": "2014-06-03T00:00:00.000+0000",
              "volume": 39
            },
            {
              "date": "2014-06-05T00:00:00.000+0000",
              "volume": 38
            }
          ],
          "pageType": {
            "blog": 17,
            "facebook": 56,
            "forum": 22,
            "general": 5,
            "image": 0,
            "news": 26,
            "review": 1,
            "twitter": 35,
            "video": 3
          },
          "queries": [
            {
              "id": 1751295897,
              "name": "Berghain",
              "volume": 165
            }
          ]
        },
      ]
    };
    axios.get.mockImplementation(() => Promise.resolve({ data: responseData }));

    const response = await request(app).get("/api/topics");
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.get('Content-Type')).toBe('application/json');
    expect(response.body).toEqual(responseData.topics);
  });

  test("have success response with empty data", async () => {
    const responseEmptyData = {};
    axios.get.mockImplementation(() => Promise.resolve({ data: responseEmptyData }));

    const response = await request(app).get("/api/topics");
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.get('Content-Type')).toBe('application/json');
    expect(response.body).toEqual([]);
  });

  test("have error response", async () => {
    const message = 'test';
    axios.get.mockImplementation(() => Promise.reject(new Error(message)));
    
    const response = await request(app).get("/api/topics");
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({message});
  });
});
