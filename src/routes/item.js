const express = require('express');
const router = express.Router();
const { query } = require('../database/model');

router.post('/', async (req, res) => {
  let { title, description, price, category, storeLink, imageFileName } = req.body;
  if (!description) description = null;
  if (!price) price = null;
  if (!storeLink) storeLink = null;

  try {
    // category에 해당하는 id를 알아낸다.
    const sql = 'SELECT id FROM category WHERE name = ?';
    const results = await query(sql, [category]);
    const categoryId = results[0].id;

    // item_order 중 가장 큰 숫자를 찾아 1을 더한다.
    const sql2 = `
      SELECT MAX(item_order) AS maxOrder FROM item
      WHERE category_id = ?`;
    const results2 = await query(sql2, [categoryId]);
    let itemOrder = results2[0].maxOrder;
    if (itemOrder) itemOrder++;
    else itemOrder = 1;

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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM item WHERE id = ?';
    const results = await query(sql, [id]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { title, description, price, storeLink } = req.body;
    if (!description) description = null;
    if (!price) price = null;
    if (!storeLink) storeLink = null;
    
    const sql = `
      UPDATE item
      SET title = ?, description = ?, price = ?, smart_store = ?
      WHERE id = ?`;
    const results = await query(sql, [title, description, price, storeLink, id]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.put('/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { subImages } = req.body;
    
    const sql = 'UPDATE item SET sub_image_URLs = ? WHERE id = ?';
    const results = await query(sql, [subImages, id]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

module.exports = router;