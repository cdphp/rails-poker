class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chats: [] };
  }

  componentDidMount() {
    this.loadChats();
    this.setupSubscription();
  }

  render() {
    return(
      <div className="col-md-9 col-md-offset-1">
        <ChatList chats={this.state.chats}/>
        <AddChat me={this.props.me} onChatSubmit={this.handleChatSubmit.bind(this)}/>
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

  handleChatSubmit(data) {
    App.channel.perform('speak', data);
  }

  freshChatList(data) {
    // console.log('fresh Chat List');
    var new_chat = JSON.parse(data);
    var new_chats_list = $.merge($.merge([], this.state.chats), new_chat.chats);
    this.setState({chats: new_chats_list.slice(-100)});
  }

  setupSubscription(){
    me = this.props.me;
    App.channel = App.cable.subscriptions.create({channel: "ChatChannel"}, {
      connected() {
        data = { message: 'joint', me: me };
        this.perform('speak', data);
        setTimeout(() => this.perform('subscribed'), 1000 );
      },
      disconnected() {
        data = { message: 'quit', me: me };
        this.perform('speak', data);
      },
      received(data) {
        // console.log('reviced');
        return this.updateChatList(data);
      },

      updateChatList: this.freshChatList.bind(this)
      })
  }

}
