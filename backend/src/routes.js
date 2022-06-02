const multer = require("multer");
const upload = multer({ dest: "img" });
const express = require("express");
const fs = require("fs");
const Review = require("./model");


const router = express.Router();
router.use(express.json());

router.get("/all", async (req, res) => {
    try {
        let query = await Review.findAll();
        res.json(query);
    } catch (e) {
        console.log(e);
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    let query = await Review.findByPk(id);
    if (query) {
        query = query.toJSON();
        res.json(query);
    }
    else {
        res.status(404).send(`la reseña no existe`);
    }

});
// TODO: 
//  - permissions
router.post("/", async (req, res) => {
    try {
        let review = await Review.build(req.body);
        await review.save();
        res.json(review);
    } catch (e) {
        res.json({ error: e });
    }
});
// TODO: 
//  - permissions
router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let review = await Review.findByPk(id);
    if (review) {
        await model.destroy();
        res.json({ success: true });
    } else {
        res.json({ success: false, error: `No se pudo encontrar la reseña` });
    }
});
// TODO: 
//  - permissions
router.put("/:id", (req, res) => {
    let { id } = req.params;
    let review = Review.findByPk(id);
    delete req.body.createAt;
    delete req.updatedAt;
    review.set(req.body);
    review.save();
    res.json(review);
});

// TODO: 
//  - permissions
router.post("/:id/img/", upload.single("img"), async (req, res) => {
    let { id } = req.params;
    let review = await Review.findByPk(id);
    if (!req.file) {
        res.json({ error: "No se recibió la imagen." });
        return;
    } else if (!review) {
        res.json({ error: "No se pudo encontrar la reseña." });
        return;
    }
    review.imgs.push(req.file.filename);
    await review.save();
    res.json({
        success: true,
        img: req.file.filename
    });
});

router.delete("/:id/img/:file", async (req, res) => {
    let { id, file } = req.params;
    let review = await Review.findByPk(id);
    if (!review) {
        res.json({ error: "No se pudo encontrar la reseña." });
        return;
    }
    review.imgs = review.imgs.filter(img => img !== file);
    await review.save();
    try {
        await fs.unlink(file);
    } catch (e) {
        res.status(500).json({ error: "No se pudo borrar la imagen." });
    }
});


module.exports = router;  