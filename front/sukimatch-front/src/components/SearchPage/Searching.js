// Author Iimori MasaMichi - styles, html, to firebase connection(handleClose,handleSearchClick) and tohers
// Author Makoto Shiraishi - to firebase connecition (handleClose,handleSearchClick)


import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import 'firebase/firestore';
import { database } from '../../firebase/firebase';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    height: '80%',
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
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
    width: '40%',
    margin: theme.spacing(10),
  },
  gotoButton: {
    minWidth: '40%',
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
  }
}));


export default function Searching(props) {
  const classes = useStyles();

  const [search, setSearch] = useState(false);
  const [isFind, setIsFind] = useState(false);
  const [open, setOpen] = useState(false);
  // 検索中に現在集まっている人数
  const [waitingNumber, setWaitingNumber] = useState(1);


  useEffect(() => {
    // 検索中の場合は3秒に一回 /chatrooms/:chatrood_id を叩く
    if (search) {
      const interval = setInterval(() => {
        database.collection("Chatroom")
          .get()
          .then(querySnapshot => {
            const chatroomId = sessionStorage.getItem('chatroom_id');
            const data = querySnapshot.docs.filter((doc) => doc.id === chatroomId);
            setWaitingNumber(data[0].data().user_ids.length);
            if (data[0].data().user_ids.length >= 4) {
              setIsFind(true);
              setSearch(false);
              clearInterval(interval);
            }
          })
      }, 3000)

      return function cleanUp() {
        clearInterval(interval);
      }
    }
  }, [search]);

  const handleSearchClick = () => {
    // タグが選択されていれば検索開始
    if (props.searchTag) {
      setOpen(true)
      setSearch(true);
      database.collection("Chatroom")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.filter((doc) => (doc.data().tag_name === props.searchTag) && (doc.data().user_ids.length < 4));
          console.log(data);
          if (data.toString() == []) {
            const doc_id = new Date().getTime().toString()
            database.collection("Chatroom")
              .doc(doc_id)
              .set({ tag_name: props.searchTag, user_ids: [sessionStorage.getItem('user_id')] })
              .then(() => {
                sessionStorage.setItem('chatroom_id', doc_id);
                console.log('success making chatroom');
              });
          } else {
            database.collection("Chatroom")
              .doc(data[0].id)
              .set({
                tag_name: props.searchTag,
                user_ids: [...data[0].data().user_ids, sessionStorage.getItem('user_id')]
              })
              .then(() => {
                sessionStorage.setItem('chatroom_id', data[0].id)
                // ４人揃ってなければ検索開始時に待機人数をインクリメント
                if (!isFind) {
                  setWaitingNumber(data[0].data().user_ids.length + 1)
                }
                console.log('success updating chatroom')
              })
          }
        })
    }
  };

  const handleClose = () => {
    // 閉じるときはchatroomのメンバーから削除
    const chatroomId = sessionStorage.getItem('chatroom_id');
    const userId = sessionStorage.getItem('user_id')
    setSearch(false);
    setOpen(false);
    setIsFind(false)

    database.collection("Chatroom")
      .get()
      .then(querySnapshot => {
        const doc = querySnapshot.docs.find((doc) => doc.id === chatroomId);
        const chatroomInfo = doc.data()
        if (chatroomInfo.user_ids.length === 1) {
          // 他に検索中の人がいないchatroomだったとき、そのchatroomは削除
          doc.ref.delete().then(() => {
            console.log("deleted chatroom")
          })
        } else {
          // 他に検索中の人がいるchatroomだったとき、自分をuser_idsから削除
          chatroomInfo.user_ids.splice(chatroomInfo.user_ids.indexOf(userId), 1)
          doc.ref.set({
            tag_name: props.searchTag,
            user_ids: chatroomInfo.user_ids
          }).then(() => {
            console.log("eliminated from chatroom")
          }).catch((err) => {
            console(err)
          })
        }
      })
  };
  const body = (
    <div className={classes.paper}>
      {isFind ?
        <>
          <Typography variant='h4' className={classes.modalItem}>
            Found some people to talk with you!
          </Typography>

          <Link to="/chat" className={classes.link}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ExitToAppIcon />}
              className={classes.gotoButton}
            >
              go to chatroom
            </Button>
          </Link>


        </>
        :
        <>
          <Typography variant='h4' className={classes.modalItem}>
            Searching friend who talk with you about #{props.searchTag}. <br />
            Found {waitingNumber} / 4 now. Please wait a moment ...
          </Typography>
          <LinearProgress />
          <div className="numberWaiting">
            {`${waitingNumber}/4 has been matched so far`}
          </div>
        </>
      }
      <div className={classes.link}>
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          className={classes.cancelButton}
          onClick={handleClose}
        >
          cancel
      </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        className={classes.finishButton}
        onClick={handleSearchClick}
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