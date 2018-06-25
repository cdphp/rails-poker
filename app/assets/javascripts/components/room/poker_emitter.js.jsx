class PokerEmitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { card_number: '' }
  }

  render() {
    let owner_button = this.renderOwnerButton();
    let input_disable = this.is_disabled();
    return(
      <form onSubmit={this._onSubmit.bind(this)}>
        <div className="row col-sm-8 poker-emitter form-inline from-control">
          <div className="col-md-4">
            <div className="input-group-lg">
              <input type="number" name="card_number" disabled={input_disable} className="form-control" placeholder="Enter Your Number..." onChange={this._onChange.bind(this)} value={this.state.card_number} />
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-secondary btn-lg" type="submit">Send</button>
          </div>
          { owner_button }
        </div>
      </form>
    )
  }

  renderOwnerButton () {
    let button_text = this.button_text();
    let class_name = "btn btn-info btn-lg "+this.props.room_status;
    if(this.props.owner){
      return(
        <div className="col-sm-2 offest-sm-3">
          <button className={class_name} type="button" onClick={this.handelStart.bind(this)} >{ button_text }</button>
        </div>
      )
    }
  }

  is_disabled(){
    return (this.props.room_status != "ready");
  }

  button_text() {
    switch (this.props.room_status) {
      case 'open':
        return 'Start Poking';
        break;
      case 'ready':
        return 'Draw Result';
        break;
      case 'finish':
      default:
        return 'New Poking';
    }
  }

  handleChatChange(event) {
    this.setState({ message: event.target.value });
  }

  _onChange(e) {
    var state = {};
    state[e.target.name] = $.trim(e.target.value);
    this.setState(state);
  }

  _onSubmit(e) {
    e.preventDefault();
    this.handlePlay(e);
  }

  handlePlay() {
    var card_number = this.state.card_number.trim();
    if (!card_number) return;
    this.props.onPlayCard({card_number: card_number});
    this.setState({ card_number: "" });
  }

  handelStart(event){
    event.preventDefault();
    this.props.onToggleStatus();
  }
}