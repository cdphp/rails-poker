class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {display_name: '', room_id: this.props.room_id}
  }
  render(){
    return(
      <form className="form-signin form-horizontal well"  onSubmit={this.handdleJoinIn.bind(this)}>
        <fieldset>
          <legend>Please Join in</legend>
        </fieldset>
        <div className="form-group">
          <input autoFocus="true" className="form-control" name="display_name" placeholder="Display name.." required="" type="text" onChange={this._onChange.bind(this)} />
        </div>
        <div className="form-group">
          <input className="form-control" name="room_id" value={this.state.room_id} placeholder="Room Id.." required="" type="text" onChange={this._onChange.bind(this)} />
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-success btn-block right" type="submit">Join in</button>
          <p className="help-block">
            <span>I am the orgnizer,<em className="btn-link btn" onClick={this.handleTaggleForm.bind(this)}>set up a room</em>.</span>
          </p>
        </div>
      </form>
      )
  }

  _onChange(e) {
    var state = {};
    state[e.target.name] =  $.trim(e.target.value);
    this.setState(state);
  }

  handdleJoinIn(event){
    event.preventDefault();
    console.log("join in room");
    var display_name = this.state.display_name;
    var room_id      = this.state.room_id;
    $.ajax({
      url: '/usersessions/join_in',
      type: 'POST',
      data: { user_session: {
          display_name: display_name
        },
        room_id: room_id
      },
    })
    .done(function(result) {
      console.log(result);
      console.log("success");
      if(result.code == 1){
        $("input[name='display_name']").closest("div.form-group").addClass('has-error');
        $("input[name='display_name']").attr({
          title: "Join in Failed..", 
          'data-content': result.error_message
        }).popover('show');
      }
      else if(result.code == 2){
        $("input[name='room_id']").closest("div.form-group").addClass('has-error');
        $("input[name='room_id']").attr({
          title: "Join in Failed..", 
          'data-content': result.error_message
        }).popover('show');
      }
      else{
        window.location.href = result.data.redirect_to;
      }
    })
    .fail(function(result) {
      $("div.form-group").addClass('has-error');
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  }

  handleTaggleForm(){
    this.props.onToggleForm("reg");
  }
}