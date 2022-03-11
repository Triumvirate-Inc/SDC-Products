const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'mowems',
  database: 'postgres',
  port: 5432
})

module.exports = {
  getAllProducts: (callback) => {
    const queryStr = `SELECT * FROM productdetail LIMIT 20`;
    pool.query(queryStr, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data.rows);
      }
    })
  },

  getProduct: (id, callback) => {

    const queryStr = `SELECT productdetail.*, json_agg(
          json_build_object(
            'feature', features.feature,
            'value', features.value
          )
        ) AS features FROM productdetail JOIN features
        ON productdetail.id=features.productid WHERE productdetail.id=$1 GROUP BY productdetail.id`;
    //$ indicates which element it's taking in the qryArgs array starting at 1
    const queryArg = [id];
    pool.query(queryStr, queryArg, (err, data) => {
      if (err) {
        // console.log('Error executing query', err);
        callback(err);
      } else {
        // console.log('Get One Product Query: ', data)
        callback(null, data.rows)
      }
    })
  },

  getStyles: (id, callback) => {
    // console.log('id: ', id);
    const queryStr = `SELECT styles.productid,
    (SELECT json_agg
      (json_build_object
        ('id', styles.id,
        'name', styles.stylename,
        'originalprice', styles.originalprice,
        'saleprice', styles.saleprice,
        'default?', styles.defaultstyle,
        'photos', (SELECT
          json_agg(
            json_build_object(
              'thumbnailurl', photos.thumbnailurl,
              'url', photos.url)
            )FROM photos WHERE photos.styleid=styles.id
          ),
        'skus', (SELECT
          json_object_agg(
            skus.id,
            json_build_object(
              'quantity', skus.quantity,
              'size', skus.size)
            ) FROM skus WHERE skus.styleid=styles.id
          )
        )
       ) AS results FROM styles WHERE styles.productid=$1
     ) FROM styles WHERE styles.productid=$1`;
    const queryArg = [id];
    pool.query(queryStr, queryArg, (err, data) => {
      if (err) {
        // console.log('Error executing query', err);
        callback(err);
      } else {
        // console.log('Products Query: ', data)
        callback(null, data.rows)
      }
    })
  }

}

