import React from 'react';
// import NewChatComponent from '../NewChat/newChat';
import ChatListComponent from '../chatlist/chatList';
import ChatViewComponent from '../chatview/chatView';
// import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
const firebase = require('firebase');

class DashboardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: []
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ChatListComponent
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        />
        {this.state.newChatFormVisible ? null : <ChatViewComponent user={this.state.email} chat={this.state.chats[this.state.selectedChat]} />}
        <Button onClick={this.signOut} className={classes.signOutBtn}>
          Sign Out
        </Button>
      </div>
    );
  }

  signOut = () => firebase.auth().signOut();

  selectChat = (chatIndex) => {
    this.setState({ selectChat: chatIndex });
  };

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) {
        this.props.history.push('/login');
      } else {
        await firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', _usr.email)
          .onSnapshot(async (res) => {
            const chats = res.docs.map((_doc) => _doc.data());
            await this.setState({
              email: _usr.email,
              chats: chats
            });
            console.log(this.state);
          });
      }
    });
  };
}

export default withStyles(styles)(DashboardComponent);
