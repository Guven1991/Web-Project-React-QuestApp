import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {makeStyles} from "@material-ui/core/styles";
import {List, ListItem, ListItemSecondaryAction, Modal, Radio} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 50,
    },
    modal: {
        display:"flex",
        maxWidth:200,
    },
});


function Avatar(props) {
    const {avatarId} = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt="User Avatar"
                    image={`/avatars/avatar${selectedValue}.png`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Username
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User info
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"onClick={handleOpen}>Change Avatar</Button>
                </CardActions>
            </Card>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <List dense>
                    {[1, 2, 3].map((key) => {
                        const labelId = `checkbox-list-secondary-label-${key}`;
                        return (
                            <ListItem key={key} button>
                                <CardMedia
                                    style = {{maxWidth: 100}}
                                    component="img"
                                    alt={`Avatar n°${key}`}
                                    image={`/avatars/avatar${key}.png`}
                                    title="User Avatar"
                                />
                                <ListItemSecondaryAction>
                                    <Radio
                                        edge="end"
                                        value= {key}
                                        onChange={handleChange}
                                        checked={""+selectedValue === ""+key}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Modal>
        </div>

    );
}

export default Avatar;