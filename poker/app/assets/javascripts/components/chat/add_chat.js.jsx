class AddChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
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

  render() {
    return (
      <div>
        <form className="new_chat" role="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <input type="text" autocomplete="off" className="form-control input-lg" name="message" placeholder="Typing here ..."
                value={this.state.message} onChange={this.handleChatChange.bind(this)} maxLength="255"/>
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default btn-lg">Send</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

