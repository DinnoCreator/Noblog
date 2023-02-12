import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { api } from "../../link/API";
import moment from "moment"

export const ViewOne = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [post, setPost]: any = useState([]);
  const getPosts = React.useCallback(async () => {
      try {
          await fetch(`${api}/posts/${location.state.postId}`, {
              method: "GET",
              headers: { "Authorization": `${sessionStorage.getItem("token")}` },
          })
              .then((res) => {
                  if (res.status !== 200) {
                      return navigate("/login");
                  } else {
                      return res.json();
                  }
              })
              .then(function (jsonData) {
                  setPost(jsonData)
                  setIsAuthenticating(false);
              });
      } catch (err) {
          console.error(err);
      }
  }, [navigate, location.state.postId])

  useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      getPosts();
  }, [getPosts]);

  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // values inputed in the form
    const [title, setTitle] = useState("");
    const [post1, setPost1] = useState("");

  const handlePostBack = () => {
    return navigate("/");
  }

  if (isAuthenticating) {
    return (
        <div className="center">
            <div></div>
            <div
                style={{ display: "inline-block" }}
                className="loaderBig mt-5"
            ></div>
        </div>
    )
} else {
    return (
      <>
        <div className="container">
      <div>
        <div className="container zero mt-4">
          <div className="h1 hstack grid-container">
            <div className="iconpost btn roborobo" onClick={handlePostBack}>
              <i className="fa-solid mt-2 mb-2 fa-chevron-left"></i>
            </div>
            <div className="iconpost btn roborobo ms-auto" onClick={handleShow}>
              <i className="fa-solid mb-2 mt-2 fa-pen-to-square"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h1 className="h1">{post.title}</h1>
        <h3 className="h3 mt-3 mb-2">{
        moment(post.updatedAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}</h3>
        <p className="p">
          {post.post}
        </p>
      </div>
    </div>

    <Modal show={show} fullscreen={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make changes to your post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="mb-3">
                            <h3>Post Title:</h3>
                        </div>
                        <div>
                        <div className="mb-5">
                            <label htmlFor="exampleInputtitle1" className={`form-label h3 label`}>
                                Your link
                            </label>
                            <input
                                type="title"
                                className="form-control"
                                id="exampleInputtitle1"
                                autoComplete="off"
                                aria-describedby="titleHelp"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        </div>
                        <div className="mb-3">
                            <h3>Post Title:</h3>
                        </div>
                        <div>
                        <div className="mb-5">
                            <label htmlFor="exampleInputtitle1" className={`form-label h3 label`}>
                                Your link
                            </label>
                            <input
                                type="title"
                                className="form-control"
                                id="exampleInputtitle1"
                                autoComplete="off"
                                aria-describedby="titleHelp"
                                value={post1}
                                onChange={(e) => setPost1(e.target.value)}
                                required
                            />
                        </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
          <Button variant="secondary" onClick={async () => {
                try {
                    await fetch(`${api}/posts/${location.state.postId}`, {
                        method: "DELETE",
                        headers: { "Authorization": `${sessionStorage.getItem("token")}` }
                    })
                        .then((res) => {
                                return res.json()
                        }).then((data) => {
                          return navigate ("/");
                        })
            } catch (error) {
              console.log(error);
              
            }
          }}>
            Delete Post
          </Button>
          <Button variant="primary" onClick={async () => {
                try {
                    await fetch(`${api}/posts/${location.state.postId}`, {
                        method: "PATCH",
                        headers: { "Authorization": `${sessionStorage.getItem("token")}` },
                        body: JSON.stringify({
                          title,
                          post1,
                        }),
                    })
                        .then((res) => {
                                return res.json()
                        }).then((data) => {
                          return navigate ("/");
                        })
            } catch (error) {
              console.log(error);
              
            }
          }}>
            Update Post
          </Button>
        </Modal.Footer>
            </Modal>
            </>
    )
  }
}
