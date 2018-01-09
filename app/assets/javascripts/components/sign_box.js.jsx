class SignBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: this.props.action}
  }

  render() {
    if(this.state.form == 'sign') {
      formToRender = <LoginForm onToggleForm={this.toggleForm.bind(this)} room_id={this.props.room_id} />;
    }
    else{
      formToRender = <RegistrationForm onToggleForm={this.toggleForm.bind(this)} />;
    }
    return formToRender;
  }

  toggleForm(type){
    this.setState({form: type});
    this.render();
  }
}