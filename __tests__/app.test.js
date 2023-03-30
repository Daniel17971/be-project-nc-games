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

describe("GET /api/reviews", () => {
  it("200: gets an array of all the reviews in order descending with an additional comment count property", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        const reviews = response.body.reviews;
        expect(reviews.length).toBe(testData.reviewData.length);
        reviews.forEach((element) => {
          expect(element).toMatchObject({
            review_id: expect.any(Number),
            title: expect.any(String),
            category: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
        expect(reviews).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
      });
  });
  it("404:returns status code when no url found", () => {
    return request(app).get("/api/reveeeeiews").expect(404);
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  it("200: returns an empty array of comments for the associated review", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then((response) => {
        const commentsArr = response.body.comments;

        expect(commentsArr).toEqual([]);
      });
  });
  it("200: returns an array of comments for the associated review", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((response) => {
        const commentsArr = response.body.comments;
        expect(commentsArr).toBeInstanceOf(Array);
        commentsArr.forEach((element) => {
          expect(element.review_id).toBe(2);
          expect(element).toMatchObject({
            body: expect.any(String),
            votes: expect.any(Number),
            comment_id: expect.any(Number),
            review_id: expect.any(Number),
            author: expect.any(String),
            created_at: expect.any(String),
          });
        });
      });
  });
  it("404: return 404 and message when id is not found", () => {
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

describe("POST /api/reviews/:review_id/comments", () => {
  it("201: creates and posts a new comment for a particular review", () => {
    const newComment = { username: "dav3rid", body: "it was ok!" };

    return request(app)
      .post("/api/reviews/2/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        const comment = response.body.comment;
        expect(comment.author).toBe("dav3rid");
        expect(comment.body).toBe("it was ok!");
        expect(comment.review_id).toBe(2);
        expect(comment).toMatchObject({
          author: expect.any(String),
          created_at: expect.any(Number),
          votes: expect.any(Number),
          body: expect.any(String),
          review_id: expect.any(Number),
          created_at: expect.any(String),
          comment_id: expect.any(Number),
        });
      });
  });
  it("400: bad request sent incorrect property name", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ author: "dav3rid", body: "it was ok!" })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Bad Request" });
      });
  });
  it("201: post even with addition non-important properties", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "dav3rid", body: "it was ok!", cat: "tom" })
      .expect(201)
      .then((response) => {
        const comment = response.body.comment;
        expect(comment.author).toBe("dav3rid");
        expect(comment.body).toBe("it was ok!");
        expect(comment.review_id).toBe(1);
        expect(comment).toMatchObject({
          author: expect.any(String),
          created_at: expect.any(Number),
          votes: expect.any(Number),
          body: expect.any(String),
          review_id: expect.any(Number),
          created_at: expect.any(String),
          comment_id: expect.any(Number),
        });
      });
  });
  it("404: valid id but not found", () => {
    return request(app)
      .post("/api/reviews/99/comments")
      .send({ username: "dav3rid", body: "it was ok!" })
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          status: 404,
          msg: "id does not exsist",
        });
      });
  });
  it("400: bad request invalid id", () => {
    return request(app)
      .post("/api/reviews/s3d/comments")
      .send({ username: "dav3rid", body: "it was ok!" })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "Bad Request",
        });
      });
  });
  it("404: username not in database", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "daniel2324", body: "it was ok!" })
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          status: 404,
          msg: "username does not exsist",
        });
      });
  });
  it("400: bad request no body property", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "dav3rid" })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "Bad Request",
        });
      });
  });
});

describe("PATCH /api/review/:review_id, updates votes", () => {
  it("200: updates the votes on a review and returns the updated review", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: 3 })
      .expect(200)
      .then((response) => {
        const review = response.body.review;
        expect(review.votes).toBe(4);
      });
  });
  it("200: updates votes if negative", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: -3 })
      .expect(200)
      .then((response) => {
        const review = response.body.review;
        expect(review.votes).toBe(-2);
      });
  });
  it("400: bad request the incriment votes object has invalid value ", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: "alpha" })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "Bad Request",
        });
      });
  });
  it("400: bad request the incriment votes object has key name", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votttes: 12 })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "Bad Request",
        });
      });
  });
  it("404: returns id not found for valid but missing id", () => {
    return request(app)
      .patch("/api/reviews/90")
      .send({ inc_votes: 2 })
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          status: 404,
          msg: "id does not exsist",
        });
      });
  });
  it("400: returns bad request when invalid id entered", () => {
    return request(app)
      .patch("/api/reviews/sads4")
      .send({ inc_votes: 2 })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "Bad Request",
        });
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  it("204: deletes a comment and responsds with 204 and no content", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });
  it("404: responds with not found when id valid but not present", () => {
    return request(app)
      .delete("/api/comments/99")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          status: 404,
          msg: "id does not exsist",
        });
      });
  });
  it("400: responds with bad request when invalid id input", () => {
    return request(app)
      .delete("/api/comments/9fas32")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          msg: "Bad Request",
        });
      });
  });
});

afterAll(() => {
  connection.end();
});
