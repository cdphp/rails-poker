class AddChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  handleChatChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var message = this.state.message.trim();
    if (!message) return;
    this.props.onChatSubmit({message: message, me: this.props.meid});
    this.setState({ message: "" });
  }

  handleClickEmoji(emoji) {
    this.setState({ message: this.state.message + emoji });
    this.focus();
  }

  render() {
    return (
      <div>
        <form className="new_chat" role="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="add-chat input-group form-group-no-border input-lg">
            <span className="input-group-addon dropup emoji-container">
                <a href="#" role="button" id="emojiBtn" className="emoji-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-smile-o"></i>
                </a>
                <EmojiBox onClickEmoji={this.handleClickEmoji.bind(this)} />
            </span>
            <input  type="text" autoComplete="off" className="form-control"
                    name="message" placeholder="Typing here ..."
                    value={this.state.message} onChange={this.handleChatChange.bind(this)}
                    maxLength="255" ref={(input) => { this.textInput = input; }}/>
          </div>
        </form>
      </div>
    );
  }

  focus() {
    this.textInput.focus();
  }

}

