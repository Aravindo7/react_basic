const express = require("express");
const router = express.Router();
const contactController = require("./controller");

router.post("/contacts", contactController.createContact);
router.get("/contacts", contactController.getAllContacts);
router.delete("/contacts/:id", contactController.deletecontactById);
router.put("/contacts/:id", contactController.updatecontactById);
module.exports = router;
