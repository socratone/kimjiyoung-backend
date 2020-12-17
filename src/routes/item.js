const express = require('express');
const router = express.Router();
const { query } = require('../database/model');

router.post('/', async (req, res) => {
  let { title, description, price, category, storeLink, imageFileName } = req.body;
  if (!description) description = null;
  if (!price) price = null;
  if (!storeLink) price = null;

  try {
    // category에 해당하는 id를 알아낸다.
    const sql = 'SELECT id FROM category WHERE name = ?';
    const results = await query(sql, [category]);
    const categoryId = results[0].id;

    // item_order 중 가장 큰 숫자를 찾아 1을 더한다.
    const sql2 = 'SELECT MAX(item_order) AS maxOrder FROM item';
    const results2 = await query(sql2);
    const itemOrder = results2[0].maxOrder + 1;

    // insert
    const sql3 = `
      INSERT INTO item (title, description, price, category_id, main_image_URL, 
        smart_store, item_order, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
    const results3 = await query(sql3, [title, description, price, categoryId, imageFileName, storeLink, itemOrder]);

    res.status(200).send(results3);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

module.exports = router;