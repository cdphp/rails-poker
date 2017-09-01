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
          <div className="add-chat input-group form-group-no-border input-lg">
            <input type="text" autoComplete="off" className="form-control" name="message" placeholder="Typing here ..."
                value={this.state.message} onChange={this.handleChatChange.bind(this)} maxLength="255"/>
          </div>
        </form>
      </div>
    );
  }
}

