import { Input } from "../../components/input/Input"
import React, { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../link/API";

const CreatePost = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    let navigate = useNavigate();

    const getUser = React.useCallback(async () => {
        try {
            await fetch(`${api}/users/me`, {
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
                    setIsAuthenticating(false);
                });
        } catch (err) {
            console.error(err);
        }
    }, [navigate])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        getUser();
    }, [getUser]);


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
            <Input valueOfIn="Create" />
        )
    }
}

export default CreatePost;