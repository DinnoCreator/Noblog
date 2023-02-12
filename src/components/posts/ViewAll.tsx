import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, } from "react";
import { api } from "../../link/API";
import moment from "moment";


export const ViewAll = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [posts, setPosts]: any = useState([]);
    let navigate = useNavigate();

    const getPosts = React.useCallback(async () => {
        try {
            await fetch(`${api}/posts`, {
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
                    setPosts(jsonData)
                    setIsAuthenticating(false);
                });
        } catch (err) {
            console.error(err);
        }
    }, [navigate])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        getPosts();
    }, [getPosts]);

    const handlesCreate = () => {
        return navigate("/createpost")
    }

    const span1 = "grid-col-span-1";
    const span2 = "grid-col-span-2";

    const display = posts.map((post: any, i:number) => {
        if (i > 1) {
            return (
                <>
                <article 
                onClick={() => {
                    navigate("/posts/view", {
                      state: {
                        postId: post.postId
                      },
                    });
                  }}
                className={`testimonial flow ${span2} bg-secondary-500 quote text-neutral-100`}>
                        <p>
                            {post.title}
                        </p>
                        <p>
                        {moment(post.updatedAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                        </p>
                    </article>
                </>
            );}
            else {
                return""
            }
        
        
    })
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
    } else if(!isAuthenticating && posts.length === 0){
        return (
            <div className="container">
            <div className="container mt-4">
                <div className="h1 hstack grid-container">
                    <div className="container">
                        <h1 className="">Notes</h1>
                    </div>
                    <div className="ms-auto">
                        <div className="icon btn roborobo" onClick={handlesCreate}>
                        <i className="fa-solid mb-2 mt-2 fa-pen-to-square"></i>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="h1 center mt-5">Nothing to show, you haven't made any post yet...</h1>
            </div>
        )
    }
    else{
    return (
        <div className="container">
            <div className="container mt-4">
                <div className="h1 hstack grid-container">
                    <div className="container">
                        <h1 className="">Notes</h1>
                    </div>
                    <div className="ms-auto">
                        <div className="icon btn roborobo" onClick={handlesCreate}>
                        <i className="fa-solid mb-2 mt-2 fa-pen-to-square"></i>
                        </div>
                    </div>
                </div>
            </div>
            <main className="testimonial-grid">
            <article 
                onClick={() => {
                    navigate("/posts/view", {
                      state: {
                        postId: posts[0].postId
                      },
                    });
                  }}
                 className={`testimonial flow ${span1} bg-primary-400 quote text-neutral-100`}>
                         <p>
                             {posts[0].title}
                         </p>
                         <p>
                         {moment(posts[0].updatedAt).format(
                       "MMMM Do YYYY, h:mm:ss a"
                     )}
                         </p>
                     </article>
                 <article 
                onClick={() => {
                    navigate("/posts/view", {
                      state: {
                        postId: posts[1].postId
                      },
                    });
                  }}
                 className={`testimonial flow ${span1} bg-secondary-400 quote text-neutral-100`}>
                         <p>
                             {posts[1].title}
                         </p>
                         <p>
                         {moment(posts[1].updatedAt).format(
                       "MMMM Do YYYY, h:mm:ss a"
                     )}
                         </p>
                     </article>
                {display}
                {/* <article className="testimonial flow bg-primary-400 quote text-neutral-100">
                    <p>
                        How to make your personal brand stand out online
                    </p>
                    <p>
                        May 20, 2023
                    </p>
                </article>
                <article className="testimonial flow bg-secondary-400 text-neutral-100">
                    <p>
                        Beautiful wether app UI we wish we had
                    </p>
                    <p>
                        May 18, 2023
                    </p>
                </article>
                <article className="testimonial grid-col-span-2 flow bg-secondary-500 text-neutral-100">
                    <p>
                        How to make your personal brand stand out online</p>
                    <p>
                        May 15, 2023
                    </p>
                </article>
                <article className="testimonial grid-col-span-2 flow bg-tetiary-600 text-neutral-100">
                    <p>
                        Beautiful wether app UI we wish we had
                    </p>
                    <p>
                        April 30, 2023
                    </p>
                </article>
                <article className="testimonial grid-col-span-2 flow bg-primary-400 text-neutral-100">
                    <p>
                        Beautiful wether app UI we wish we had
                    </p>
                    <p>
                        April 30, 2023
                    </p>
                </article>
                <article className="testimonial grid-col-span-2 flow bg-secondary-400 text-neutral-100">
                    <p>
                        Beautiful wether app UI we wish we had
                    </p>
                    <p>
                        April 30, 2023
                    </p>
                </article> */}
            </main>
        </div>
    );}
}