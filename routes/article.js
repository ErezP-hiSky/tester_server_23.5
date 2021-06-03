var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const ArticleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", ArticleSchema);

router.get("/", function(req, res) {
    Article.find(function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send("The error is: " + err);
        }
    });
})

router.post("/", function(req, res) {
    
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    console.log(newArticle)
    newArticle.save(function(err) {
        if(!err){
            res.send("successfully saved");
        } else {
            res.send("The error is: " + err);
        }
    });
});

module.exports = router;
