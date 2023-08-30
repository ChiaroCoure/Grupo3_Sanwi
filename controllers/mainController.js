const mainController = {
  home: (req, res) => {
    res.render('home');
  },
  login: (req, res) => {
    res.render('users/login');
  },
  register: (req, res) => {
    res.render('users/register');
  },
  billing: (req, res) => {
    res.render('billing');
  },
  redirect: (req, res) => {
    res.redirect('/');
  }
}

module.exports = { mainController }

