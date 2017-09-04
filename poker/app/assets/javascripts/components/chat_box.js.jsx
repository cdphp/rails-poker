class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chats: [] };
  }

  componentDidMount() {
    this.loadChats();
    this.bindModalImage();
    this.setupSubscription();
  }

  render() {
    return(
      <div className="col-md-12 chat-container">
        <ChatList mename={this.props.me.name} chats={this.state.chats}/>
        <AddChat meid={this.props.me.id} onChatSubmit={this.handleChatSubmit.bind(this)}/>
      </div>
    )
  }

  loadChats() {
    $.ajax({
      url: "/chats",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({chats: data.chats});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Cannot load data.");
      }.bind(this)
    });
  }

  bindModalImage(){
    let r = this;
    $("body").on('click', '.media-body img', function(event) {
      event.preventDefault();
      /* Act on the event */
      console.log("click");
      r.showModal(this.src);
    });
  }

  handleChatSubmit(data) {
    App.channel.perform('speak', data);
  }

  freshChatList(data) {
    // console.log('fresh Chat List');
    var new_chat = JSON.parse(data);
    var new_chats_list = $.merge($.merge([], this.state.chats), new_chat.chats);
    this.setState({chats: new_chats_list.slice(-100)});
  }

  showModal(imageUrl){
    $("#myModal .modal-dialog .modal-content .modal-body").html('<img src="'+ imageUrl +'">');
    $("#myModal").modal('show');
  }

  hideModal(){
    $("#myModal").modal('hide');
  }

  setupSubscription(){
    me = this.props.me;
    App.channel = App.cable.subscriptions.create({channel: "ChatChannel"}, {
      connected() {
        data = { message: 'joint', me: me.id };
        this.perform('speak', data);
        setTimeout(() => this.perform('subscribed'), 1000 );
      },
      disconnected() {
        data = { message: 'quit', me: me.id };
        this.perform('speak', data);
        this.perform('unsubscribed');
      },
      received(data) {
        // console.log('reviced');
        return this.updateChatList(data);
      },

      updateChatList: this.freshChatList.bind(this)
      })
  }

}
