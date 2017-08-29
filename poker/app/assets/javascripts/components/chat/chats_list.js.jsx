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
    let message_html = '<span class="label label-default display-name">'+chat.user+'</span>'+marked(chat.message);
    return (
      <li className={ cls } key={ chat.id } dangerouslySetInnerHTML={{__html: message_html}} />
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