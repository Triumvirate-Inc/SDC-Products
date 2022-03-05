DROP DATABASE IF EXISTS rp;
CREATE DATABASE rp;

-- USE rp;

DROP TABLE IF EXISTS productDetail;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS relatedProduct;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS styles;

CREATE TABLE IF NOT EXISTS productDetail (
  id BIGSERIAL,
  productName VARCHAR(150),
  slogan VARCHAR(250),
  description TEXT,
  category VARCHAR(250),
  defaultPrice VARCHAR(250),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS features (
  id INT,
  productId INT,
  feature VARCHAR(250),
  value VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES productDetail (id)
);

CREATE TABLE IF NOT EXISTS relatedProduct (
  id INT,
  productId INT,
  relatedId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES productDetail (id)
);

CREATE TABLE IF NOT EXISTS styles (
  id INT,
  productId INT,
  styleName VARCHAR(255),
  salePrice VARCHAR(50),
  originalPrice VARCHAR(50),
  defaultStyle Boolean,
  PRIMARY KEY(id),
  FOREIGN KEY (productId) REFERENCES productDetail (id)
);

CREATE TABLE IF NOT EXISTS skus (
  id INT,
  styleId INT,
  size VARCHAR(20),
  quantity INT,
  PRIMARY KEY(id),
  FOREIGN KEY (styleId) REFERENCES styles (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL,
  styleId INT,
  thumbnailUrl TEXT,
  url TEXT,
  FOREIGN KEY (styleId) REFERENCES styles (id)
);

-- THIS IS TO LOAD DATA FROM CSV FILES TO DB --
-- \COPY productDetail FROM '/Users/mowems/SDC-Project/csv/product.csv' DELIMITER ',' CSV HEADER;
-- \COPY features FROM '/Users/mowems/SDC-Project/csv/features.csv' DELIMITER ',' CSV HEADER;
-- \COPY relatedProduct FROM '/Users/mowems/SDC-Project/csv/related.csv' DELIMITER ',' CSV HEADER;
-- \COPY styles FROM '/Users/mowems/SDC-Project/csv/styles.csv' DELIMITER ',' CSV HEADER;
-- \COPY skus FROM '/Users/mowems/SDC-Project/csv/skus.csv' DELIMITER ',' CSV HEADER;
-- \COPY photos FROM '/Users/mowems/SDC-Project/csv/photos.csv' DELIMITER ',' CSV HEADER;
