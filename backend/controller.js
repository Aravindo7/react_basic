const express = require("express");
const router = express.Router();
const UserModels = require("./model");

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Request Data:", { name, email, message });

    const newContact = new UserModels({ name, email, message });
    await newContact.save();
    res.json({ message: "Contact created successfully!", contact: newContact });
  } catch (error) {
    console.error("Error saving to database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await UserModels.find();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletecontactById = async (req, res) => {
  try {
    const contactid = req.params.id;

    console.log("Deleting contact with ID:", contactid); // Log the ID of the contact being deleted

    // Check if the contact with the specified ID exists
    const existingContact = await UserModels.findById(contactid);
    console.log("Existing contact:", existingContact); // Log the existing contact

    if (!existingContact) {
      console.log("Contact not found");
      return res.status(404).json({ error: "Contact not found" });
    }

    // Delete the contact
    await existingContact.deleteOne();

    // Respond with a success status code
    console.log("Contact deleted successfully");
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact by ID:", error);

    // Log the specific error message
    console.error("Error message:", error.message);

    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updatecontactById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, message } = req.body;

    const updatedcontact = await UserModels.findByIdAndUpdate(
      id,
      { email, name, message },
      { new: true } // This option returns the modified document
    );

    if (!updatedcontact) {
      return res.status(404).json({ error: "contact not found" });
    }

    console.log("contact updated successfully:", updatedcontact);
    res.json(updatedcontact);
  } catch (error) {
    console.error("Error updating contact:", error.message);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createContact,
  getAllContacts,
  deletecontactById,
  updatecontactById,
};
