import React, {useEffect, useState} from "react";
import Post from "../Post/Post";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
    container:{
        display: "flex",
        flexWrap:"wrap",
        justifyContent :"center",
        alignItems:"center",
        backgroundColor: '#cfe8fc',

    }
}));

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
            .then(response => response.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsloaded(true);
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
                <PostForm userId={1} username={"ddd"} refreshPosts={refreshPosts} />
                {postList.map(post => (
                    <Post postId={post.id} userId={post.userId} username={post.username}
                          title={post.title} text={post.text} />
                ))}
            </div>
        );
    }
}

export default Home;