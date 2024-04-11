import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Alert } from "react-bootstrap";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Index = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editAlert, setEditAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
    console.log("Edit contact:", contact);
  };

  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
    console.log("Delete contact:", contact);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedContact(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedContact(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/contacts/${selectedContact._id}`
      );
      // Update the state to reflect the changes
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== selectedContact._id)
      );
      // Close the delete modal
      handleCloseDeleteModal();

      // Show delete alert
      setDeleteAlert(true);
      // Hide delete alert after 3 seconds
      setTimeout(() => {
        setDeleteAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/contacts/${selectedContact._id}`,
        selectedContact
      );
      // Fetch the updated list of contacts
      fetchContacts();
      // Close the edit modal
      handleCloseEditModal();
      setEditAlert(true);
      // Hide edit alert after 3 seconds
      setTimeout(() => {
        setEditAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleChange = (e) => {
    setSelectedContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="container mt-5">
        <Link to="add">
          <button className="btn btn-primary btn-sm m-2 px-3">Add</button>
          
        </Link>
        <h3 className="bolder">Details of the customer</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Si.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  {/* Edit Button */}
                  <Button variant="link" onClick={() => openEditModal(contact)}>
                    <PencilSquare color="royalblue" size={15} />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  {/* Delete Button */}
                  <Button
                    variant="link"
                    onClick={() => openDeleteModal(contact)}
                  >
                    <Trash3Fill color="red" size={15} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control mb-3"
              value={selectedContact ? selectedContact.name : ""}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="text"
              name="email"
              className="form-control mb-3"
              value={selectedContact ? selectedContact.email : ""}
              onChange={handleChange}
            />
            <label>Message</label>
            <input
              type="text"
              name="message"
              className="form-control"
              value={selectedContact ? selectedContact.message : ""}
              onChange={handleChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this contact?</p>
          <p>Name: {selectedContact ? selectedContact.name : ""}</p>
          <p>Email: {selectedContact ? selectedContact.email : ""}</p>
          <p>Message: {selectedContact ? selectedContact.message : ""}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Alert */}
      <Alert show={editAlert} variant="success">
        Contact updated successfully!
      </Alert>
      {/* Delete Alert */}
      <Alert show={deleteAlert} variant="danger">
        Contact deleted successfully!
      </Alert>
    </div>
  );
};

export default Index;
