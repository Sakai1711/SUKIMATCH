import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Searching from './Searching'
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import 'firebase/firestore';
import { database } from '../../firebase/firebase';
import ButtonBase from '@material-ui/core/ButtonBase';


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
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  editButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    //width: '70%',
    marginLeft: theme.spacing(15),
    marginRight: theme.spacing(15),
    marginTop: theme.spacing(1),
    marginButtom: theme.spacing(1)
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
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  tagContent: {
    minWidth: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    minWidth: '150px',
    width: '25%',
    margin: theme.spacing(1)
  },
  advise: {
    fontSize: 15
  },
  loading: {
    margin: theme.spacing(5)
  }
}));


export default function StartSearch() {
  const classes = useStyles();

  const [selectedTag, setSelectedTag] = useState('');

  const [mytags, setMyTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [waitingChat, setWaitingChat] = useState([]);

  useEffect(() => {
    setIsLoading(true)
    database.collection("User")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.filter((doc) => doc.id === sessionStorage.getItem('user_id'));
        const tags = data[0].data().tags.toString() == [] ? [] : data[0].data().tags
        setMyTags(tags)
        sessionStorage.setItem("username", data[0].data().name)
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      })

    database.collection("Chatroom")
      .get()
      .then(querySnapshot => {
        let datas = querySnapshot.docs.map((doc) => doc.data());
        datas = datas.filter((data) => (data.user_ids.length < 4))
        datas = datas.map((data) => {
          return [data.tag_name, data.user_ids.length]
        });
        setWaitingChat(datas.slice(0, 5));
      })

  }, []);


  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleCardClick = (tag_name) => {
    setSelectedTag(tag_name);
  };

  const tagList = mytags.map((tag, index) => (
    <Card className={classes.card} key={index}>
      <ButtonBase
        onClick={() => handleCardClick(tag.tag_name)}>
        <CardContent className={classes.tagContent}>
          <Checkbox checked={tag.tag_name === selectedTag} />
          <Typography variant='h5' gutterBottom>
            {tag.tag_name}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  ))

  return (
    <div>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <div className={classes.main}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant='h3' color='textPrimary'>Start searching</Typography>

              <div className={classes.editButton}>
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
                <Typography varient='body' className={classes.advise}>Select Search Tag</Typography>
                {mytags.length === 0 &&
                  <>
                    <Typography varient='body' className={classes.advise}>Don't have one?</Typography>
                    <Typography varient='body' className={classes.advise}>Click the edit button and make one!</Typography>
                  </>
                }

                {isLoading ? <CircularProgress className={classes.loading} /> :
                  <div className={classes.tagList}>
                    {tagList}
                  </div>
                }
              </div>
              <Searching searchTag={selectedTag} />

            </Paper>
          </div>
        </Grid>
      </Grid >
      <div className="waiting-chat">
        <h2>Chats that are waiting for you!!</h2>
        {waitingChat.toString() !== [] ?
          waitingChat.map((value) => {
            return (
              <div className="chat">
                <div className="topic">
                  Topic <div className="topicName">{value[0]}</div>
                </div>
                <div className="numberofwait">
                  {value[1]}/4 People waiting
              </div>
              </div>
            )
          })
          :
          <div className="nothing">
            No chat is currently waiting...
          <br></br>
          Please start one!
        </div>
        }
      </div>
    </div>
  );
}