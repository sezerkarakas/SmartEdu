const getIndexPage = (req, res) => {
  console.log(req.session.userID)
  res.status(200).render("index", {
    page_name: "index"
  });
}

const getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about"
  });
}

const getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  })
}

const getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login"
  })
}

module.exports = {
  getAboutPage,
  getIndexPage,
  getRegisterPage,
  getLoginPage
}