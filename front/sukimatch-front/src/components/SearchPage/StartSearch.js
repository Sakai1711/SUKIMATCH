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
import Searching from './Searching'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  button: {
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  main: {
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
  },
  accountInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    //width: '70%',
    marginLeft: theme.spacing(15),
    marginRight: theme.spacing(15),

  },
  inputForm: {
    width: '70%',
    margin: theme.spacing(5),
  },
  profile: {
    width: '70%',
    margin: theme.spacing(5),
  },
  finishButton: {
    width: '40%',
    margin: theme.spacing(5),
  },
  card: {
    minWidth: '20%',
    margin: theme.spacing(1)
  },
  tagList: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  tagContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));


export default function StartSearch() {
  const classes = useStyles();

  useEffect(() => {
    // TODO: /user/:id でユーザー情報取得
    setForm({
      username: 'test user',
      tags: ['movie', 'soccer'],
    })

  }, []);

  const [edit, setEdit] = useState(false);
  const [addTagClick, setAddTagClick] = useState(false);
  const [form, setForm] = useState({
    username: '',
    tags: [],
  })
  const [newTagName, setNewTagName] = useState('')
  const [selectedTag, setSelectedTag] = useState('');


  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={8}>
        <div className={classes.main}>
          <Paper className={classes.paper}>
            <Typography variant='h3'>Start searching</Typography>

            <div className={classes.accountInfo}>
              <AccountCircleIcon />
              <Link to="/user/edit">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                >
                  Edit
              </Button>
              </Link>
            </div>

            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Select Search Tag</FormLabel>
                <RadioGroup className={classes.tagList} aria-label="gender" name="gender1" value={selectedTag} onChange={handleTagChange} row>
                  {form.tags.map((tag, index) => (
                    <FormControlLabel key={index} value={tag} control={<Radio />} label={tag} />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Searching searchTag={selectedTag} />

          </Paper>
        </div>
      </Grid>
    </Grid >
  );
}