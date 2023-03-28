const connection = require("../db/connection.js");
const request = require("supertest");
const app = require("../api/app.js");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed.js");
const { response } = require("../api/app.js");

beforeEach(() => {
  return seed(testData);
});

describe("GET /api/categories", () => {
  it("200:gets an array of catagories objects with slug and description properties", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        const body = response.body.categories;
        body.forEach((element) => {
          expect(element).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
        expect(body.length).not.toBe(0);
      });
  });
  it("404: status code 404 when url is not found", () => {
    return request(app).get("/api/catargories").expect(404);
  });
});

describe("GET /api/reviews/:review_id", () => {
  it("200: retrives a review with specific id", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((response) => {
        const review = response.body.review;
        expect(review[0].review_id).toBe(1);
        expect(review.length).toBe(1);
        expect(review[0]).toMatchObject({
          review_id: expect.any(Number),
          title: expect.any(String),
          category: expect.any(String),
          designer: expect.any(String),
          owner: expect.any(String),
          review_body: expect.any(String),
          review_img_url: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });
  it("404: returns message when id does not exsist", () => {
    return request(app)
      .get("/api/reviews/999")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          status: 404,
          msg: "id does not exsist",
        });
      });
  });
  it("400: returns message when bad request sent", () => {
    return request(app)
      .get("/api/reviews/2asd2")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Bad Request" });
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  it("200: returns an array of comments for the associated review", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then((response) => {
        const commentsArr = response.body.comments;
        expect(commentsArr).toBeInstanceOf(Array);
        if (commentsArr.length >= 1) {
          commentsArr.forEach((element) => {
            expect(element).toMatchObject({
              body: expect.any(String),
              votes: expect.any(Number),
              comment_id: expect.any(Number),
              review_id: expect.any(Number),
              author: expect.any(String),
            });
          });
        }
      });
  });
  it("404: return 404 and message when id not valid", () => {
    return request(app)
      .get("/api/reviews/99/comments")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          status: 404,
          msg: "id does not exsist",
        });
      });
  });
  it("400: returns 400 and message when bad request is made", () => {
    return request(app)
      .get("/api/reviews/dss/comments")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Bad Request" });
      });
  });
});

afterAll(() => {
  connection.end();
});
