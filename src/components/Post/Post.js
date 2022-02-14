import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Comment from "../Comment/Comment";
import CommentIcon from '@material-ui/icons/Comment';
import clsx from "clsx";
import CommentForm from "../Comment/CommentForm";



const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        textAlign: "left",
        margin: 20,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white"
    }
}));


function Post(props) {
    const {title, text, username, userId, postId, likes} = props;
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const [commentList, setCommentList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes.length);
    const isInitialMount = useRef(true);
    const [likeId, setLikeId] = useState(null);
    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            saveLike();
            setLikeCount(likeCount +1)
        }
        else{
            deleteLike();
            setLikeCount(likeCount - 1)
        }


    }

    const refreshComments = () => {
        fetch("/comments?postId="+postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result)
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }

    const saveLike = () => {
        fetch("/likes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        fetch("/likes/"+likeId, {
            method: "DELETE",
        })
            .catch((err) => console.log(err))
    }

    const checkLikes =() => {
        var likeControl = likes.find((like => like.userId === userId));
        if(likeControl != null){
            setLikeId(likeControl.id)
            setIsLiked(true);
        }

    }
    useEffect(() => {
        if(isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    }, [])

    useEffect(() => {
        checkLikes()
    }, [])

    return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Link className={classes.link} to={{pathname: "/users/" + userId}}>
                            <Avatar className={classes.avatar} aria-label="recipe">
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites">
                        <FavoriteIcon style={isLiked ? {color: "red"} : null}/>
                    </IconButton>
                    {likeCount}
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed className = {classes.container}>
                        {error? "error" :
                            isLoaded? commentList.map(comment => (
                                <Comment userId = {1} username = {"USER"} text = {comment.text}></Comment>
                            )) : "Loading"}
                        <CommentForm userId = {1} username = {"USER"} postId = {postId}></CommentForm>
                    </Container>
                </Collapse>
            </Card>
    )


}

export default Post;