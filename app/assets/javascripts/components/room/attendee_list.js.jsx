class AttendeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    let attendees = this.props.attendees.map((attendee) => {
      return this.renderAttendee(attendee);
    });
    return(
      <div className="col-sm-3 offset-sm-1 attendee-list">
        <h4>AttendeeList</h4>
        <ol className="attendees-list" >
          { attendees }
        </ol>
      </div>
    )
  }

  renderAttendee(attendee) {
    let cls = this.cls_name(attendee);
    let card_number = this.card_number(attendee);
    return (
      <li className={ cls } key={ attendee.id }>
        <div className="avatar">
          <img src={ attendee.avatar } />
        </div>
        { attendee.display_name }
        { card_number }
      </li>
    )
  }

  cls_name(attendee) {
    var result = attendee.status;
    if(attendee.id == this.props.current_user_id) {
      result += ' myself';
    }
    return result;
  }

  card_number(attendee) {
    if(this.props.room_status == 'finish'){
      return(
        <span className="badge card-number">
          { attendee.number }
        </span>
        )
    }
  }
}