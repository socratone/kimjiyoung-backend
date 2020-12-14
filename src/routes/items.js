const express = require('express');
const router = express.Router();
const { query } = require('../database/model');

router.get('/', async (req, res) => {
  try {
    const sql = 'SELECT name FROM category ORDER BY id';
    const categorys = await query(sql);

    const sacredThings = {};
    categorys.forEach(category => sacredThings[category.name] = { items: [] });

    const sql2 = `
      SELECT i.id, title, description, price, 
        main_image_URL AS mainImage, sub_image_URLs AS subImages,
        smart_store AS smartStore, created_at AS createdAt,
        c.name AS category, item_order AS 'order' 
      FROM item i
      JOIN category c ON category_id = c.id
      ORDER BY category_id, item_order`;
    const items = await query(sql2);

    for (let key in sacredThings) {
      sacredThings[key].items = items.filter(item => key === item.category);
    }

    res.status(200).send(sacredThings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;