import React from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: "left"
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white"
    }
}));

function Navbar() {
    let userId = 5;
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="link" to="/">Home</Link>
                    </Typography>
                    <Typography variant="h6" >
                        <Link className={classes.link} to={{pathname: "/users/" + userId}}>User</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )

}

export default Navbar;