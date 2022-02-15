import React, {useEffect, useState} from "react";
import Post from "../Post/Post";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
    container:{
        display: "flex",
        flexDirection:"column",
        flexWrap:"wrap",
        justifyContent :"center",
        alignItems:"center",
        backgroundColor: '#cfe8fc',

    }
}));

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPosts();
    }, [])

    if(error){
        return <div>Error !!!</div>;
    }else if(!isLoaded){
        return <div>Loading...</div>
    }
    else {
        return (
            <div className={classes.container}>
                {localStorage.getItem("currentUser") == null ? "":
                    <PostForm userId={localStorage.getItem("currentUser")} username={localStorage.getItem("username")} refreshPosts={refreshPosts} />}

                {postList.map(post => (
                    <Post likes = {post.postLikes} postId={post.id} userId={post.userId} username={post.username}
                          title={post.title} text={post.text} />
                ))}
            </div>
        );
    }
}

export default Home;