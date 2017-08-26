class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {display_name: '', subject: ''}
  }
  render(){
    return(
      <form className="form-signin form-horizontal well" role="form" onSubmit={this.handdleRegstration.bind(this)}>
        <fieldset>
          <legend>Create a Room</legend>
        </fieldset>
        <div className="form-group">
          <input autofocus="" className="form-control" name="display_name" placeholder="Display name.." required="" type="text" onChange={this._onChange.bind(this)} />
        </div>
        <div className="form-group">
          <input className="form-control" name="subject" placeholder="Room Subject.." required="" type="text" onChange={this._onChange.bind(this)} />
        </div>
        <div className="form-group">
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block right" type="submit">Set Up</button>
          <p className="help-block">
            <span>I want join in an exist room,<em className="btn-link btn" onClick={this.handleTaggleForm.bind(this)}>join here</em>.</span>
          </p>
        </div>
      </form>
      )
  }

  _onChange(e) {
    var state = {};
    state[e.target.name] = $.trim(e.target.value);
    this.setState(state);
  }

  handdleRegstration(event){
    event.preventDefault();
    console.log("create room");
    var display_name = this.state.display_name;
    var subject      = this.state.subject;
    $.ajax({
      url: '/usersessions',
      type: 'POST',
      data: { user_session: {
          display_name: display_name
        },
        subject: subject
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
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

    // data = {
    //     display_name: this.state.display_name,
    //     subject: this.state.subject
    //   }
    // result = App.user_session.register(data);
    // console.log(result);
    //
    // $.ajax({
    //   url: this.props.url,
    //   type: 'POST',
    //   dataType: 'json',
    //   data: {
    //     display_name: this.state.display_name,
    //     account: this.state.account,
    //     password: this.state.password
    //   },
    // })
    // .done(function() {
    //   console.log("success");
    // }).bind(this)
    // .fail(function() {
    //   console.log("error");
    // }).bind(this)
    // .always(function() {
    //   console.log("complete");
    // }).bind(this);

  }
  handleTaggleForm(){
    this.props.onToggleForm("sign");
  }
}