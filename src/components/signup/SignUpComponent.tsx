import classes from "../signup/SignUpComponent.module.css";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { api } from "../../link/API";

export const SignUpComponent = () => {
  // values inputed in the form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // handle loading on submit
  const [loading, setLoading] = useState(false);

  //password visibility state
  const [show, setshow] = useState(false);
  const [eye, setEye] = useState("fa-eye-slash")

  // error messages and status
  const [loginError, setLoginError] = useState("");
  const [dip, setDip] = useState("none");

  const navigate = useNavigate();

  //password visibility handler
  const showPassword = () => {
    setshow(!show);
    show ? setEye("fa-eye-slash") : setEye("fa-eye");
  };

  const onSubmitForm = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setLoading(true);
      //api call for sending the user data to the backend
      await fetch(`${api}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        }),
      }).then((res) => {
        if (res.status === 201) {
            setLoading(false);
            return res.json();
        } else if (res.status === 403) {
          setDip("block");
          setLoading(false);
          return setLoginError("User already exists...");
        } else {
          setDip("block");
          setLoading(false);
          return setLoginError("Something went wrong...");
        }}) 
      .then(function (data) {
        return navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={` mt-5 ${classes.bod}`}>
        <h1 className={`text-neutral-300 `}>NoBlog</h1>
        <h3 className={`h3`}>Articulate your thoughts...</h3>
        <div className="container">
        {loginError && ( // then if changed flag is false show error message.
            <div className="container" style={{ color: "red", display: `${ dip }`}}>
              <span>{loginError}</span>
            </div>
          )}
          <form className="container" onSubmit={onSubmitForm}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className={`form-label h3 ${classes.label}`}>
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                autoComplete="off"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className={`form-label h3 ${classes.label}`}>
                Password
              </label>
              <span className={`d-flex`}>
              <input
                type={ show ? "text" :  "password"}
                className="form-control me-2"
                id="exampleInputPassword1"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className={`btn ${classes.eye}`} onClick={showPassword} type="button">
              <i className={`fa-regular ${eye}`}></i>
              </button>
              </span>
              <div id="emailHelp" className="form-text">min. 8 characters</div>
            </div>
            <div className="d-grid gap-2 ">
            <button className={`btn ${classes.signup}`} type="submit">
              {loading ? (
                <>
                  <div
                  style={{ display: "inline-block" }} className="load"></div>
                </>
              ) : (
                <>Signup</>
              )}
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
};