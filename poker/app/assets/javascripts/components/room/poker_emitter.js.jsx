class PokerEmitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { card_number: '' }
  }

  render() {
    let owner_button = this.renderOwnerButton();
    let input_disable = this.is_disabled();
    return(
      <div className="col-sm-8 poker-emitter form-inline">
        <div className="row">
          <div className="input-group col-md-8">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-piggy-bank"></i>
            </span>
            <input type="number" name="card_number" disabled={input_disable} className="form-control input-lg" placeholder="Enter Your Number..." onChange={this._onChange.bind(this)} value={this.state.card_number} />
            <span className="input-group-btn">
              <button className="btn btn-default btn-lg" type="button" onClick={this.handlePlay.bind(this)}>Send</button>
            </span>
          </div>
          { owner_button }
        </div>
      </div>
    )
  }

  renderOwnerButton () {
    let button_text = this.button_text();
    let class_name = "btn btn-info btn-lg "+this.props.room_status;
    if(this.props.owner){
      return(
        <div className="input-group col-md-2 col-md-offset-1">
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

  handlePlay(event) {
    event.preventDefault();
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