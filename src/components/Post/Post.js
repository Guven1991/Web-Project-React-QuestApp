import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {makeStyles} from "@material-ui/core/styles";
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Container from '@material-ui/core/Container';
import Comment from "../Comment/Comment";


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
    const {title, text, username, userId, postId} = props;
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const [liked, setLiked] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const isInitialMount = useRef(true);


    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setLiked(!liked);

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


    useEffect(() => {
        if(isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
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
                        <FavoriteIcon style={liked ? {color: "red"} : null}/>
                    </IconButton>
                    <IconButton
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <InsertCommentIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed className = {classes.container}>
                        {error? "error" :
                            isLoaded? commentList.map(comment => (
                                <Comment userId = {comment.userId} username = {comment.username} text = {comment.text}></Comment>
                            )) : "Loading"}
                    </Container>
                </Collapse>
            </Card>
    )


}

export default Post;