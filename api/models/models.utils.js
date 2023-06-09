const format = require("pg-format");
function formatReviewsQuery(
  orderCategory = "created_at",
  order = "DESC",
  defaultRequest = true
) {
  if (defaultRequest) {
    const queryString = format(
      `SELECT reviews.review_id,reviews.title,reviews.category,reviews.designer,reviews.owner,reviews.review_img_url,
    reviews.created_at,reviews.votes 
   , count(comments.review_id) AS comment_count
  FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_id 
  GROUP BY reviews.review_id 
  ORDER BY reviews.%I %s`,

      orderCategory,
      order
    );
    return queryString;
  }
  if (!defaultRequest) {
    const queryString = format(
      `SELECT reviews.review_id,reviews.title,reviews.category,reviews.designer,reviews.owner,reviews.review_img_url,
      reviews.created_at,reviews.votes 
     , count(comments.review_id) AS comment_count
    FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_id WHERE reviews.category=$1
    GROUP BY reviews.review_id 
    ORDER BY reviews.%I %s`,

      orderCategory,
      order
    );
    return queryString;
  }
}

function formatPostReview(reviewBody) {
  return format(
    `INSERT INTO reviews
  (title, designer, owner, review_img_url, review_body, category)
  VALUES
  (%L)
  RETURNING *;`,
    [
      reviewBody.title,
      reviewBody.designer,
      reviewBody.owner,
      reviewBody.review_img_url,
      reviewBody.review_body,
      reviewBody.category,
    ]
  );
}

module.exports = { formatReviewsQuery, formatPostReview };
