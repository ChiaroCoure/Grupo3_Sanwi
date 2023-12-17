const db = require('../dataBase/models');

const categoriesApiController = {
  getAll: async (req, res) => {
    const categories = await db.Category.findAll({
      include: [
        {
          association: 'products',
        }
      ]
    });
    res.json(categories);
  }
}

module.exports = categoriesApiController;