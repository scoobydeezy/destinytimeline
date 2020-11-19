import * as express from 'express';

import DB from './db';

const router = express.Router();

router.get('/api/lore', async (req, res) => {
  try {
    let lore = await DB.Lore.all();
    res.json(lore);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
})

export default router;
