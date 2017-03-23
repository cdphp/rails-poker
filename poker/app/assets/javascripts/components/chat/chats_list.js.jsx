class ChatList extends React.Component {

  render() {
    let chats = this.props.chats.map((chat) => {
      return this.renderChat(chat);
    });
    return (
      <ul className="chat-list list-group">
        {chats}
      </ul>
    );
  }

  renderChat(chat) {
    return (
      <li className="list-group-item" key={ chat.id }>
        <span className="badge author">{ chat.user }</span>
        { chat.message }
      </li>
    );
  }
}