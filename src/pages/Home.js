import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Spinner } from "react-bootstrap";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [delPost, setDeletePost] = useState(true);

  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setDeletePost(!delPost);
  };
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);
  return (
    <div className="homePage">
      {!postLists.length && (
        <div
          style={{
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="grow" />
          <h5>Preparing Data</h5>
        </div>
      )}
      {postLists.map((post) => {
        return (
          <>
            <div className="post">
              <div className="postHeader">
                <div className="title">
                  <h1> {post.title}</h1>
                </div>
                <div className="deletePost">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      {" "}
                      &#128465;
                    </button>
                  )}
                </div>
              </div>
              <div className="postTextContainer"> {post.postText} </div>
              <h3>@{post.author.name}</h3>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Home;



 