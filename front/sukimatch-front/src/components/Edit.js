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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
    margin: theme.spacing(5),
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
    flexWrap: 'wrap'
  }
}));


export default function Edit() {
  const classes = useStyles();

  const [userId, setUserId] = useState('');
  const [edit, setEdit] = useState(false);
  const [addTagClick, setAddTagClick] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    tags: [],
  })
  const [newTagName, setNewTagName] = useState('')

  useEffect(() => {
    // TODO: /user/:id でユーザー情報取得
    setForm({
      username: 'test user',
      email: 'test@example.com',
      tags: ['movie', 'soccer'],
    })
  }, []);

  const updateUsername = (ev) => setForm({
    ...form,
    username: ev.target.value
  })

  const updateEmail = (ev) => setForm({
    ...form,
    email: ev.target.value
  })

  const updateTags = (tag) => {
    const newTags = form.tags
    newTags.push(tag)
    setForm({
      ...form,
      tags: newTags
    })

  }

  //新しいタグを作るときのフォームが変更されたとき
  const updateNewTagName = (ev) => setNewTagName(ev.target.value)

  const handleAddTag = () => {
    if (newTagName) {
      updateTags(newTagName)
      setNewTagName('')
      setAddTagClick(false)
    }
  }

  const submit = () => {
    console.log(form)
  }

  console.log(form.tags)


  const tagList = form.tags.map((tag, index) => (
    <Card className={classes.card} key={index}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {tag}
        </Typography>
      </CardContent>
    </Card>
  ))

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={8}>
        <div className={classes.main}>
          <Paper className={classes.paper}>
            <Typography variant='h3'>My page</Typography>

            <div className={classes.accountInfo}>
              <AccountCircleIcon />
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                disabled={edit}
                onClick={() => setEdit(true)}
              >
                Edit
              </Button>
            </div>

            <TextField required id="standard-required" label="username" variant="outlined" InputProps={{ readOnly: !edit }} value={form.username} onChange={updateUsername} className={classes.inputForm} />

            <TextField required id="standard-required" label="email" variant="outlined" InputProps={{ readOnly: !edit }} value={form.email} onChange={updateEmail} className={classes.inputForm} />

            <Typography>my tags</Typography>

            <div className={classes.tagList}>
              {tagList}
              {addTagClick ?
                <Card className={classes.card}>
                  <CardContent>
                    <TextField
                      required
                      id="standard-required"
                      value={newTagName}
                      onChange={updateNewTagName}
                    />
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handleAddTag()}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </CardContent>
                </Card> :
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => setAddTagClick(true)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              }

            </div>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              className={classes.finishButton}
              disabled={!edit}
              onClick={() => {
                setEdit(false)
                submit()
              }}
            >
              finish
            </Button>

          </Paper>
        </div>
      </Grid>
    </Grid >
  );
}