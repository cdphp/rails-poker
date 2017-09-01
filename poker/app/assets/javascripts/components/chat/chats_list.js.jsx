class ChatList extends React.Component {

  render() {
    let chats = this.props.chats.map((chat) => {
      return this.renderChat(chat);
    });
    return (
      <div className="card chat-box" data-background-color="black">
        <div className="media-area chat-list">
          {chats}
          <a style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </a>
        </div>
      </div>
    );
  }

  renderChat(chat) {
    let cls = "media" + " " + chat.type;
    if(chat.user == this.props.mename) cls += " me";
    return (
      <div className={cls} key={ chat.id }>
        <a className="pull-left head" href="#header-image" onClick={this.clickHead}>
            <span className="display-name">{chat.user}</span>
        </a>
        <div className="media-body" dangerouslySetInnerHTML={{__html: marked(chat.message)}} />
      </div>
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

  clickHead(e) {
    e.preventDefault();
  }
}