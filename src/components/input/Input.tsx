import classes from "../input/Input.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { api } from "../../link/API";

type InputValue = {
    valueOfIn: string
}

export const Input = (props: InputValue) => {
    const navigate = useNavigate();
    // values inputed in the form
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [linkName, setLinkName] = useState<string | undefined>(undefined);
    const [link, setLink] = useState<string | undefined>(undefined);
    // handle loading on submit
    const [loading, setLoading] = useState(false);

    // error messages and status
    const [loginError, setLoginError] = useState("You can only save one link per post, put your link in a { } to save it");
    const [dip, setDip] = useState("block");


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDiscard = () => window.location.reload();

    const handlePost = async () => {
        setLoading(true)
        try {
            await fetch(`${api}/posts`, {
                method: "POST",
                headers: ({ 
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionStorage.getItem("token")}`, 
                }) ,
                body: JSON.stringify({
                  title,
                  post,
                  link,
                  linkName,
                }),
              }).then((res) => {
                if (res.status === 201) {
                  setLoading(false);
                  return res.json();
                } else if (res.status === 403) {
                  setDip("block");
                  setLoading(false);
                  return setLoginError("Incorrect email or password");
                } else {
                  setDip("block");
                  setLoading(false);
                  return setLoginError("Something went wrong...");
                }
              })
              .then(function (data) {
                return navigate("/");
              });

        } catch (error) {
            return console.error(error);
        }
    }

    const onCreate = async (e: { preventDefault: () => void; }) => {
        setLoading(true);
        e.preventDefault();
        let path = `${post}`;
        const paramsPattern = /[^{}]+(?=})/g;
        const extractParams = path.match(paramsPattern);

        try {
            if (extractParams !== null) {
                const arrayer = extractParams?.[0];

                setLinkName(arrayer)

                return handleShow();


            } else {
                await fetch(`${api}/posts`, {
                    method: "POST",
                    headers: ({ 
                        'Content-Type': 'application/json',
                        'Authorization': `${sessionStorage.getItem("token")}`, 
                    }) ,
                    body: JSON.stringify({
                      title,
                      post
                    }),
                  }).then((res) => {
                    if (res.status === 201) {
                      setLoading(false);
                      return res.json();
                    } else if (res.status === 403) {
                      setDip("block");
                      setLoading(false);
                      return setLoginError("Incorrect email or password");
                    } else {
                      setDip("block");
                      setLoading(false);
                      return setLoginError("Something went wrong...");
                    }
                  })
                  .then(function (data) {
                    return navigate("/");
                  });

            }
        } catch (error) {
            console.error(error);
        }
    }

    const handlePostBack = () => {
        return navigate("/");
      }
    

    return (
        <>
         <div className="container">
      <div>
        <div className="container zero mt-4">
          <div className="h1 hstack grid-container">
            <div className="iconpost btn roborobo" onClick={handlePostBack}>
              <i className="fa-solid mt-2 mb-2 fa-chevron-left"></i>
            </div>
          </div>
        </div>
      </div>
            <div className={` ${classes.bod}`}>
                <h1 className={`text-neutral-300 `}>NoBlog</h1>
                <h3 className={`h3`}>Articulate your thoughts...</h3>
                <div className={`container`}>
                    <h3 className={`h3`}>Title: {title}</h3>
                </div>
                <div className="container">
                    {loginError && ( // then if changed flag is false show error message.
                        <div className="container" style={{ color: "red", display: `${dip}` }}>
                            <span>{loginError}</span>
                        </div>
                    )}
                    <form className="container" onSubmit={onCreate}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputtitle1" className={`form-label h3 ${classes.label}`}>
                                Title
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
                        <div className="mb-3">
                            <label htmlFor="exampleInputpost1" className={`form-label h3 ${classes.label}`}>
                                Post
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleInputpost1"
                                autoComplete="off"
                                value={post}
                                onChange={(e) => setPost(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mt-5 ">
                            <button className={`btn ${classes.signup}`} type="submit">
                                {loading ? (
                                    <>
                                        <div
                                            style={{ display: "inline-block" }} className="load"></div>
                                    </>
                                ) : (
                                    <>{props.valueOfIn} post</>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            </div>

            <Modal show={show} fullscreen={true} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Link in post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="mb-3">
                            <h3>{linkName}:</h3>
                        </div>
                        <div>
                        <div className="mb-5">
                            <label htmlFor="exampleInputtitle1" className={`form-label h3 ${classes.label}`}>
                                Your link
                            </label>
                            <input
                                type="title"
                                className="form-control"
                                id="exampleInputtitle1"
                                autoComplete="off"
                                aria-describedby="titleHelp"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                        </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
          <Button variant="secondary" onClick={handleDiscard}>
            Discard Post
          </Button>
          <Button variant="primary" onClick={handlePost}>
            Post
          </Button>
        </Modal.Footer>
            </Modal>
        </>
    );
};
