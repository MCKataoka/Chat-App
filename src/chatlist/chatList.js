import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

class ChatListComponent extends React.Component {
  render() {
    const { classes } = this.props;
    if (this.props.chats.length > 0) {
      return (
        <main className={classes.root}>
          <Button variant='contained' fullWidth color='primary' className={classes.newChatBtn} onClick={this.newChat}>
            New Message
          </Button>
          <List>
            {this.props.chats.map((_chat, _index) => {
              return (
                <div key={_index}>
                  <ListItem onClick={() => this.selectChat(_index)} className={classes.ListItem} selected={this.props.selectedChatIndex === _index} alignItems='flex-start'>
                    <ListItemAvatar>
                      <Avatar alt='Remy Sharp'>{_chat.users.filter((_user) => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={_chat.users.filter((_user) => _user !== this.props.userEmail)[0]}
                      secondary={
                        <React.Fragment>
                          <Typography component='span' color='textPrimary'>
                            {_chat.messages[_chat.messages.length - 1].message.substring(0, 30)}
                          </Typography>
                        </React.Fragment>
                      }></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                </div>
              );
            })}
          </List>
        </main>
      );
    } else {
      return (
        <main className={classes.root}>
          <Button variant='contained' fullWidth onClick={this.newChat} color='primary'>
            New Message
          </Button>
          <List></List>
        </main>
      );
    }
  }

  newChat = () => {
    console.log('new chat click');
  };
  selectChat = (index) => {
    console.log('select chat', index);
    this.props.selectChatFn(index);
  };
}

export default withStyles(styles)(ChatListComponent);
