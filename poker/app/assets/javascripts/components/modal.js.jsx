class Modal extends React.Component {

  render() {
    return (
      <div className="modal fade modal-mini modal-primary" id="myModal" tabIndex="-1" role="dialog" ariaLabelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-body">
                      {this.props.children}
                  </div>
              </div>
          </div>
      </div>
    )
  }

}