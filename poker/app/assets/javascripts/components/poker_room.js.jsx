class PokerRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {attendees: [], current_topic: this.props.subject, statistics_data: this.props.statistics_data.statistics, room_status: this.props.room_status}
  }

  render() {
    return(
      <div>
        <PokerTable statistics_data={this.state.statistics_data} owner={this.props.owner} attendees={this.state.attendees} room_status={this.state.room_status} onPlayCard={this.handlePlayCard.bind(this)} onToggleStatus={this.handleToggleStatus.bind(this)} />
        <AttendeeList room_status={this.state.room_status} attendees={this.state.attendees} current_user_id={this.props.current_user} current_user_name={this.props.current_user_name} />
        <SubjectPopup current_topic={this.state.current_topic} onSubjectUpdate={this.handleSubjectUpdate.bind(this)} />
      </div>
    )
  }

  componentDidMount() {
    // this.loadAttendees();
    this.setupSubscription();
    $(".room-subject").on('click', 'button', function(event) {
      event.preventDefault();
      $("#subjectPopup").modal( 'show' );
    });
  }

  handlePlayCard(card_number) {
    App.channel.perform('play', card_number);
  }

  handleToggleStatus(){
    if(this.state.room_status == 'finish'){
      $("#subjectPopup input").val(this.state.current_topic);
      $("#subjectPopup").modal( 'show' );
    }
    App.channel.perform('toggle_status');
  }

  handleSubjectUpdate(topic){
    console.log("updating topic");
    $("#subjectPopup").modal( 'hide' );
    App.channel.perform('update_subject', topic);
  }

  updateSubject(data){
    console.log('update Subject');
    this.setState({current_topic: data.subject})
    $('h1.room-subject span').html(data.subject);
  }

  loadAttendees() {
    $.ajax({
      url: "/attendees",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({attendees: data.attendees});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Cannot load data.");
      }.bind(this)
    });
  }

  appendAttendee(data){
    console.log('new attendee');
    if(data.attendee){
      this.setState({attendees: this.state.attendees.concat([data.attendee])});
    }
  }

  dropAttendee(data){
    console.log('attendee offline');
    if(data.attendee){
      this.setState({attendees: this.state.attendees.filter(function(i){return (i.id != data.attendee.id)})});
    }
  }

  updateAttendee(attendee){
    console.log('attendee update');
    this.setState({attendees: this.state.attendees.map(function(obj){
      if(obj.id == attendee.user_id){
        obj.status = "online "+attendee.status;
      }
      return obj;
    })});
  }

  updateChart(data){
    console.log('update statistics');
    this.setState({statistics_data: data.statistics})
  }

  newPlay(data){
    console.log('play_card');
    this.updateAttendee(data.record)
  }
  updateRoomStatus(data){
    console.log('update room status');
    this.loadAttendees();
    this.setState({room_status: data.status_name});
    $('input[name="card_number"]').focus();
  }
  setupSubscription(){
    const { current_room, current_user, room_status } = this.props;
    App.channel = App.cable.subscriptions.create({channel: "RoomChannel", room_id: current_room, user_id: current_user}, {
      connected() {
        setTimeout(() => this.perform('subscribed'), 888 );
        setTimeout(() => this.loadAttendees(), 1000 );
        // if(room_status == 'finish'){
        //   setTimeout(() => this.perform('statistics'), 999 );
        // }
      },
      disconnected() {
        this.perform('unsubscribed');
      },
      received(data) {
        result = JSON.parse(data);
        console.log("receiving .. ");
        switch (result.action) {
          case 'new_attendee':
            return this.appendAttendee(result);
            break;
          case 'drop_attendee':
            return this.dropAttendee(result);
            break;
          case 'play_card':
            return this.newPlay(result);
            break;
          case 'update_status':
            return this.updateRoomStatus(result);
            break;
          case 'statistics':
            return this.updateChart(result);
            break;
          case 'update_subject':
            return this.updateSubject(result);
            break;
        }
      },
      loadAttendees: this.loadAttendees.bind(this),
      appendAttendee: this.appendAttendee.bind(this),
      dropAttendee: this.dropAttendee.bind(this),
      newPlay: this.newPlay.bind(this),
      updateRoomStatus: this.updateRoomStatus.bind(this),
      updateChart: this.updateChart.bind(this),
      updateSubject: this.updateSubject.bind(this)
      })
  }


}