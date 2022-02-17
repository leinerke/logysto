const db = require('mongoose');

db.Promise = global.Promise;
async function connect(url) {
  try {
    await db.connect(url);
    console.log('[db] Conectada con éxito');
  } catch (e) {
    console.error('[db]', e);
  }
}

module.exports = { connect };