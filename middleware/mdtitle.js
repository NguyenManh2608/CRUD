exports.checktitle = function (req, res, next) {
    if((!req.body.title) || (!req.body.author)) {
      return res.status(400).send({ message : " It must not null"});
    }
    next();
};

exports.checkTitlelength = function (req, res, next) {
    if(req.body.title.length > 40) {
      return res.status(400).send({message : " Title more less than 40 character "});
    }
    next();
};

exports.checkAuthortLength = function (req, res, next) {
    if(req.body.author.length > 100) {
      return res.status(400).send({message : "Error: author > 100 character"})
    }
    next();
};