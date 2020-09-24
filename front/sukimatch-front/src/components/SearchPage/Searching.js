import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from '@material-ui/icons/Close';
import { ApiClient } from '../../utils/ApiClient';
import { Link } from 'react-router-dom';


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
    minWidth: '40%',
    margin: theme.spacing(10),
  },
}));


export default function Searching(props) {
  const classes = useStyles();

  const [search, setSearch] = useState(false);
  const [isFind, setIsFind] = useState(false);
  const [open, setOpen] = useState(false);
  // 検索中に現在集まっている人数
  const [currentMemberNum, setCurrentMemberNum] = useState(1)


  useEffect(() => {
    // 検索中の場合は3秒に一回 /chatrooms/:chatrood_id を叩く
    if (search) {
      const chatroomId = sessionStorage.getItem('chatroom_id');
      const interval = setInterval(() => {
        ApiClient.get(`/chatrooms/${chatroomId}`).then(res => {
          setCurrentMemberNum(res.data.num_of_users)
          if (res.status == 200) {
            setIsFind(true)
            setSearch(false)
          }
        }).catch(err => {
          console.log(err)
        });
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
      ApiClient.post('/chatrooms', {
        tag_name: props.searchTag
      }).then(res => {
        console.log(res)
        sessionStorage.setItem('chatroom_id', res.data.chatroom_id);
      }).catch(err => {
        console.log(err)
      });
    }
  };

  const handleClose = () => {
    // 閉じるときはchatroomのメンバーから削除
    const chatroomId = sessionStorage.getItem('chatroom_id');
    ApiClient.post(`/chatrooms/${chatroomId}/delete`).then(res => {
      setSearch(false)
    }).catch(err => {
      console.log(err)
      setSearch(false)
    });
    setOpen(false)
  };
  const body = (
    <div className={classes.paper}>
      {isFind ?
        <>
          <Typography variant='h4' className={classes.modalItem}>
            Found some people to talk with you!
          </Typography>

          <Link to="/chat">
            <Button
              variant="contained"
              startIcon={<CloseIcon />}
              className={classes.cancelButton}
            >
              go to chatroom
            </Button>
          </Link>
        </>
        :
        <>
          <Typography variant='h4' className={classes.modalItem}>
            Searching friend who talk with you about #{props.searchTag}. <br />
            Found {currentMemberNum} / 4 now. Please wait a moment ...
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
        </>
      }
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