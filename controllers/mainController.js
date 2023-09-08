const mainController = {
  home: (req, res) => {
    res.render('home');
  },
  billing: (req, res) => {
    res.render('billing');
  }

}

module.exports =  mainController 
