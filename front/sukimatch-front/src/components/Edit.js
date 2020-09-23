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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ApiClient } from '../utils/ApiClient';

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
  },
  tagContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));


export default function Edit() {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [addTagClick, setAddTagClick] = useState(false);
  const [form, setForm] = useState({
    username: '',
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

    ApiClient.get('/user/eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VraW1hdGNoLTIxNzUzIiwiYXVkIjoic3VraW1hdGNoLTIxNzUzIiwiYXV0aF90aW1lIjoxNjAwODIwMjY2LCJ1c2VyX2lkIjoidllsRUF4bkg2bVE2RU5hSFhValVwSXVraHFuMiIsInN1YiI6InZZbEVBeG5INm1RNkVOYUhYVWpVcEl1a2hxbjIiLCJpYXQiOjE2MDA4MjAyNjYsImV4cCI6MTYwMDgyMzg2NiwiZW1haWwiOiJ0ZXN0NEBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0NEBleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.CCrbSdZVcbncAmCb8Brr91vyzq139lMkaxaEeMbZC5e5zbDYr1AlWwGrdZE0iq6vxFwXf4Tgt4QEQ55cY-cZf3ZLf1QqT-i8SkMM0jZe1LDirgFN6Cpbl6NMCI9JpOqAYn6ibRHWV74CAdf_x9Fq58V6M8tQ3ee8MevZ-3y10KHIMxODjv8sa5KRwU04Vw6x3S8yqEOYuQBItAxT_cmDviH4u9g6a1XRM6zb4WS8_MK0lGQi5kUNwy2Rbv6pbFJbPaRvyT7qlXVVNIHz5bZKtkSFgAknFujVafRTwO-NPxf709jzVF8MizRZ-unqrBc7ubp6uoVZI9N9gjJOqguPbw'
    ).then(res => {
      setForm({
        ...form,
        username: res.data.username,
        tags: res.data.tags.map(tag => tag.tag_name)
      })
    }).catch(err => {
      console.log(err)
    });
  }, []);

  const updateUsername = (ev) => setForm({
    ...form,
    username: ev.target.value
  })

  const updateTags = (tags) => {
    setForm({
      ...form,
      tags: tags
    })
  }

  //新しいタグを作るときのフォームが変更されたとき
  const updateNewTagName = (ev) => setNewTagName(ev.target.value)

  const handleAddTag = () => {
    if (newTagName) {
      const newTags = form.tags
      newTags.push(newTagName)
      updateTags(newTags)
    }
    setNewTagName('')
    setAddTagClick(false)
  }

  const handleDeleteTag = (targetTagName) => {
    updateTags(form.tags.filter(name => name !== targetTagName))
    setAddTagClick(false)
  }

  const submit = () => {
    ApiClient.get('/user', {
      withCredentials: true
    }).then(res => {
      setForm({
        ...form,
        username: res.data.username,
        tags: res.data.tags.map(tag => tag.tag_name)
      })
    }).catch(err => {
      console.log(err)
    });
  }


  const tagList = form.tags.map((tag, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.tagContent}>
        <Typography variant='h5' color="textSecondary" gutterBottom>
          {tag}
        </Typography>
        <IconButton aria-label="add to shopping cart" onClick={() => handleDeleteTag(tag)}>
          <DeleteForeverIcon fontSize="large" />
        </IconButton>
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