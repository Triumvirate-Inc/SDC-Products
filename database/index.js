const postgres = require('postgres');
const sql = postgres({
  host: 'localhost',
  port: 5432,
  path: '/tmp',
  username: '',
  database: 'postgres'
});

//Get all products list
//Pull product list from DB with limit to avoid server crashing
module.exports.getProducts = async function(params, callback) {
  const data = await sql`
  SELECT * FROM productdetail
  `;
  callback(null, data);
}

module.exports.getSingleProduct = async function(params, callback) {
  const data = await sql`
  SELECT
  p.id,
  p.productname,
  p.slogan,
  p.description,
  p.category,
  p.defaultPrice,
  json_agg(json_build_object(
    'feature', f.feature,
    'value', f.value
  )) as features
  FROM productdetail p LEFT OUTER JOIN features f on p.id = f.productId WHERE p.id=${product_id} GROUP BY p.id
  `;
  callback(null, data);
}

module.exports.getSingleProductStyles = async function(params, callback) {
  const data = await sql`
  select style_id, name, original_price, sale_price, "default?" FROM styles where
    product_id = ${params.product_id}
    and not reported
  `;
  callback(null, data);
}

module.exports.getRelatedItems = async function(params, callback) {
  const data = await sql`SELECT *
    FROM relatedProduct WHERE relatedProduct.productId = ${productId}`;
    callback(null, data);
}
