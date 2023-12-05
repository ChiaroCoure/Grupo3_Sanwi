const db = require('../dataBase/models');

const userController = {
  login: (req, res) => {
    res.render('users/login');
  },
  profile: (req, res) => {
    res.render('users/profile')
  },
  logout: (req, res) => {
    req.session.user = undefined;
    res.redirect('/')
  },
  register: (req, res) => {
    res.render('users/register', {
      error: undefined,
      errores: undefined
    });
  },
  store: (req, res) => {

    console.log({user: req.user});

    db.User.findAll()
      .then(results => {
        const email = results.find(value => value.dataValues.email === req.user.email);
        const username = results.find(value => value.dataValues.username === req.user.username);
        if (email || username) {
          res.render('users/register', {
            errores: 'El nombre de usuario o email ya se encuentran registrados',
            error: undefined,
            old: req.body,
          })
        } else {
          db.User.create({ ...req.user, role_id: 2 });
          res.redirect('/users/login');
        }
      });

  },
  edit: async function (req, res) {
    const user = await db.User.findByPk(req.params.id || res.locals.user.id);
    res.render('users/profile-edit', { user });
  },
  update: async function (req, res) {
    await db.User.update(
      { ...req.body, image: req.file?.filename },
      { where: { id: req.params.id } }
    )

    req.session.user = { ...req.session.user, ...req.body };
    res.locals.user = { ...res.locals.user, ...req.body };

    res.redirect('/users/profile');
  },
}

module.exports = userController;