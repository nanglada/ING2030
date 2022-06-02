const multer = require("multer");
const upload = multer({ dest: "img" });
const express = require("express");
const fs = require("fs");

function router(Model, modelName) {
    const router = express.Router();
    router.use(express.json());

    router.get("/all", async (req, res) => {
        try {
            let query = await Model.findAll();
            res.json(query);
        } catch (e) {
            console.log(e);
        }
    });

    router.get("/:id", async (req, res) => {
        let { id } = req.params;
        let query = await Model.findByPk(id);
        if (query) {
            query = query.toJSON();
            res.json(query);
        }
        else {
            res.status(404).send(`${modelName} no existe`);
        }

    });
    // TODO: 
    //  - permissions
    router.post("/", async (req, res) => {
        console.log("POST", req.body);
        try {
            let model = await Model.build(req.body);
            console.log("BUILT:", model);
            await model.save();
            res.json(model);
        } catch (e) {
            console.log("ERROR:", e);
            res.json({ error: e });
        }
    });
    // TODO: 
    //  - permissions
    router.delete("/:id", async (req, res) => {
        let { id } = req.params;
        let model = await Model.findByPk(id);
        if (model) {
            await model.destroy();
            res.json({ success: true });
        } else {
            res.json({ success: false, error: `${modelName} no se pudo encontrar.` });
        }
    });
    // TODO: 
    //  - permissions
    router.put("/:id", async (req, res) => {
        let { id } = req.params;
        let model = await Model.findByPk(id);
        console.log("MODEL", model); 
        delete req.body.createAt;
        delete req.updatedAt;
        model.set(req.body);
        model.save();
        res.json(model);
    });

    // TODO: 
    //  - permissions
    router.post("/:id/img/", upload.single("img"), async (req, res) => {
        let { id } = req.params;
        let model = await Model.findByPk(id);
        if (!req.file) {
            res.json({ error: "No se recibió la imagen." });
            return;
        } else if (!model) {
            res.json({ error: "No se pudo encontrar el modelo." });
            return;
        }
        model.imgs.push(req.file.filename);
        await model.save();
        res.json({
            success: true,
            img: req.file.filename
        });
    });

    router.delete("/:id/img/:file", async (req, res) => {
        let { id, file } = req.params;
        let model = await Model.findByPk(id);
        if (!model) {
            res.json({ error: "No se pudo encontrar el modelo." });
            return;
        }
        model.imgs = model.imgs.filter(img => img !== file);
        await model.save();
        try {
            await fs.unlink(file);
        } catch (e) {
            res.status(500).json({ error: "No se pudo borrar la imagen." });
        }
    });

    return router;
}

module.exports = router;  