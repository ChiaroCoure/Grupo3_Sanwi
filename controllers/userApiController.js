const db = require('../dataBase/models');

const userApiController = {
  getOneUser: async function (req, res) {
    const { id } = req.params

    const user = await db.User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'image'],
      include: [
        {
          association: 'role',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.status(200).json({
      ...user.dataValues,
      image: `http://localhost:3000/img/users/${user.image}`
    });
  }
}

module.exports = userApiController;