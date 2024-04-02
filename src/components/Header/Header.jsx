import React, { useEffect } from "react";
import "./Header.css";
import Posts from "../Posts/Posts";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();
  const [postData, setPostData] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/posts').then(async (resp) => {
      const data = await resp.json();
      
      if (Array.isArray(data['posts'])) {
        setPostData(data['posts']);
      }
    });
  }, []);

  return (
    <>
      <div className="d-flex align-items-baseline">
        <div className="poster">
           <h3>React Poster</h3>
        </div>

        <div></div>

        <div className="post m-top-20">
        <button variant="primary" onClick={() => navigate('/create')}>
          Create New Post
        </button>
        </div>
      </div>

      <hr/>
      {postData.length > 0 && <Posts postData={postData} /> }
    </>
  );
}
