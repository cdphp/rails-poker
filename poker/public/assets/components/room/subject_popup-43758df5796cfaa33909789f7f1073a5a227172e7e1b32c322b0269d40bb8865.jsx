class SubjectPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topic: this.props.current_topic }
  }

  render() {
    return(
      <div className="modal fade" id="subjectPopup" tabIndex="-1" role="dialog" aria-labelledby="subject">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <input type="text" className="form-control" id="subject" name="topic" placeholder='...' autofocus="autofocus" onChange={this._onChange.bind(this)} value={this.state.topic} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.handelSave.bind(this)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _onChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handelSave(event) {
    var new_subject =
    event.preventDefault();
    this.props.onSubjectUpdate({subject: this.state.topic});
  }

}