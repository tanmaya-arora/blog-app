import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./Header.css";
import Posts from "../Posts/Posts";

export default function Header() {
  const [showModal, setShowModal] = React.useState(false);
  const [personName, setPersonName] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const [postData, setPostData] = React.useState([]);
  const [errors, setErrors] = React.useState([]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const validateForm = () => {
    let err = {};

    if (!personName) {
      err['personName'] = "Person name cannot be empty";
    }

    if (!desc) {
      err['desc'] = "Description cannot be empty";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  }

  const handleSubmit = () => {

    // if (personName === "" || desc === "") {
    //   alert("Please fill all the fields");
    //   return;
    // }

    if (validateForm()) {
      const newPost = {
        'author': personName,
        'body': desc
      };
      setPostData([...postData, newPost]);
      setPersonName("");
      setDesc("");
      handleClose();
    }
  }

  return (
    <>
      <div className="d-flex align-items-baseline">
        <div className="poster">
           <h3>React Poster</h3>
        </div>

        <div></div>

        <div className="post m-top-20">
        <button variant="primary" onClick={handleShow}>
          Create New Post
        </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="m-left-1">
          <Modal.Title><b>Create New Post</b></Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-left-1">
          <form className="m-top-20">
            <div className="form-group">
              <label>Name</label>
            </div>
            <div className="form-group">
            <input type="text" className="form-control fix-input-width" value={personName} onChange={(e) => setPersonName(e.target.value)} />
            {errors.personName && <p className="text-red">{errors.personName}</p>}
            </div>

            <div className="form-group m-top-10">
              <label>Text</label>
            </div>

            <div className="form-group">
            <textarea type="text" className="form-control fix-input-width" value={desc} onChange={(e) => setDesc(e.target.value)} />
            {errors.desc && <p className="text-red">{errors.desc}</p>}
            </div>
          
          </form>
        </Modal.Body>
        <Modal.Footer className="m-top-20 m-left-1">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="m-left-1 bg-salmon">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <hr/>
      {postData.length > 0 && <Posts postData={postData} /> }
    </>
  );
}
