class ChatList extends React.Component {

  render() {
    let chats = this.props.chats.map((chat) => {
      return this.renderChat(chat);
    });
    return (
      <div className="well well-lg chat-box">
        <ul className="chat-list list-group">
          {chats}
          <li style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </li>
        </ul>
      </div>
    );
  }

  renderChat(chat) {
    let cls = "list-group-item" + " " + chat.type;
    if(chat.user == this.props.mename) cls += " me";
    return (
      <li className={ cls } key={ chat.id }>
        <span className="label label-default display-name">{ chat.user }</span>
        { chat.message }
      </li>
    );
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

}