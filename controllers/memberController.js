let memberController = module.exports;

memberController.home = (req, res) => {
    console.log("GET cont.home");
    res.send("You'r in home page");
};

memberController.signup = (req, res) => {
    console.log("POST cont.signup");
    res.send("You'r in signup page");
};

memberController.login = (req, res) => {
    console.log("POST cont.login");
    res.send("You'r in login page");
};

memberController.logout = (req, res) => {
    console.log("GET cont.logout");
    res.send("You'r in logout page");
};