class PokerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return(
      <div className='col-sm-8 poker-table' >
        <PokerDesktop attendees={this.props.attendees} room_status={this.props.room_status} statistics_data={this.props.statistics_data} />
        <PokerEmitter owner={this.props.owner} room_status={this.props.room_status} onPlayCard={this.props.onPlayCard} onToggleStatus={this.props.onToggleStatus} />
      </div>
    )
  }


}