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
import CircularProgress from '@material-ui/core/CircularProgress';
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
  },
  loading: {
    margin: theme.spacing(5)
  }
}));


export default function Edit() {
  const classes = useStyles();
  const [addTagClick, setAddTagClick] = useState(false);
  const [form, setForm] = useState({
    username: '',
    mytags: [],
    newTagNames: [],
    deleteTagNames: []
  })
  const [mytags, setMyTags] = useState([])
  const [newTagName, setNewTagName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    ApiClient.get('/user/load'
    ).then(res => {
      setForm({
        ...form,
        username: res.data.username,
      })
      setMyTags(res.data.tag)
      setIsLoading(false)
    }).catch(err => {
      console.log(err)
      setIsLoading(false)
    });
  }, []);

  const updateUsername = (ev) => setForm({
    ...form,
    username: ev.target.value
  })

  const updateTags = (tags) => setMyTags(tags)


  const updateNewTagNames = (newTagNames) => {
    setForm({
      ...form,
      newTagNames: newTagNames
    })
  }

  const updateDeleteTagNames = (deleteTagName) => {
    const deleteTagNames = form.deleteTagNames
    deleteTagNames.push(deleteTagName)
    setForm({
      ...form,
      deleteTagNames: deleteTagNames
    })
  }


  //新しいタグを作るときのフォームが変更されたとき
  const updateNewTagName = (ev) => setNewTagName(ev.target.value)

  const handleAddTag = () => {
    if (newTagName) {
      // mytagsの更新
      const newTags = mytags
      newTags.push({
        tag_name: newTagName
      })

      //newTagNames（新しく追加する予定のタグ名一覧）の更新
      const addedTagNames = form.newTagNames
      addedTagNames.push(newTagName)
      updateNewTagNames(addedTagNames)
      updateTags(newTags)
    }
    setNewTagName('')
    setAddTagClick(false)
  }

  const handleDeleteTag = (targetTag) => {
    if (targetTag.tag_name) {
      // DBに登録済みの場合
      updateDeleteTagNames(targetTag.tag_name)
    } else {
      // DBに登録されていないものを削除する場合（タグの追加→削除を一画面で行う場合）
      const newTagNames = form.newTagNames.filter(tagName => tagName !== targetTag.tag_name)
      updateNewTagNames(newTagNames)
    }
    updateTags(mytags.filter(tag => tag.tag_name !== targetTag.tag_name))
    setAddTagClick(false)
  }

  const submit = () => {
    setIsLoading(true)
    const editBody = {
      username: form.username,
      new_tag_names: form.newTagNames,
      delete_tag_ids: form.deleteTagNames
    }
    console.log(editBody)
    ApiClient.post('/user/edit', editBody
    ).then(res => {
      setForm({
        ...form,
        newTagNames: [],
        deleteTagNames: []
      })
      setIsLoading(false)
    }).catch(err => {
      console.log(err)
      setIsLoading(false)
    });
  }


  const tagList = mytags.map((tag, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.tagContent}>
        <Typography variant='h5' color="textSecondary" gutterBottom>
          {tag.tag_name}
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
            {isLoading ? <CircularProgress className={classes.loading} /> :
              <>
                <div className={classes.accountInfo}>
                  <AccountCircleIcon />
                </div>

                <TextField required id="standard-required" label="username" variant="outlined" value={form.username} onChange={updateUsername} className={classes.inputForm} />

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
                  onClick={submit}
                >
                  save
                </Button>
              </>
            }
          </Paper>
        </div>
      </Grid>
    </Grid >
  );
}