import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const AddPost = () => {
    const navigate = useNavigate();

    const [personName, setPersonName] = useState("");
    const [desc, setDesc] = useState("");

    const [postData, setPostData] = useState([]);

    const [errors, setErrors] = useState([]);

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
        if (validateForm()) {
            const newPost = {
            'author': personName,
            'body': desc
            };
            setPostData([...postData, newPost]);
            setPersonName("");
            setDesc("");

            fetch('http://localhost:8080/posts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json'
            }
            }).then(async (resp) => {
            const data = await resp.json();
            
            if (data['message']) {
            setPostData((existingPosts) => [...existingPosts, data['post']]);
            navigate('/');
            }
        });
        }
    }

    return (
        <Modal show={true} onHide={() => navigate('/')}>
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
          <Button variant="secondary" onClick={() => navigate('/')}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="m-left-1 bg-salmon">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddPost;