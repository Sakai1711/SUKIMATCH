import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    height: '80%',
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalItem: {
    margin: theme.spacing(5),
    textAlign: 'center'
  },
  cancelButton: {
    minWidth: '40%',
    margin: theme.spacing(10),
  },
}));


export default function Searching(props) {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (props.searchTag) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div className={classes.paper}>
      <Typography variant='h4' className={classes.modalItem}>
        Searching friend who talk with you about {props.searchTag} ...
      </Typography>
      <LinearProgress />
      <Button
        variant="contained"
        startIcon={<CloseIcon />}
        className={classes.cancelButton}
        onClick={handleClose}
      >
        cancel
      </Button>
    </div>
  );

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        className={classes.finishButton}
        onClick={handleOpen}
      >
        start searching!
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {body}
      </Modal>
    </div>

  );
}