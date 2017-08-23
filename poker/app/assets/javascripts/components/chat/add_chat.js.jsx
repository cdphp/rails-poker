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
    this.props.onChatSubmit({message: message, me: this.props.me});
    this.setState({ message: "" });
  }

  render() {
    return (
      <div>
        <form className="new_chat" role="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input type="text" className="form-control input-lg" name="message" placeholder="Type your chat here ..."
                value={this.state.message} onChange={this.handleChatChange.bind(this)} maxLength="140"/>
          </div>
          <button type="submit" className="btn btn-default">Send</button>
        </form>
      </div>
    );
  }
}

