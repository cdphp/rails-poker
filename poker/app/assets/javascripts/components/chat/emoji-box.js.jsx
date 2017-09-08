class EmojiBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kamojis: this.getKamojis() };
  }

  componentDidMount() {
  }

  handleKamoji(e){
    this.props.onClickEmoji(e.target.innerHTML + ' ')
  }

  render() {
    let ks = this.state.kamojis.map((kamoji, index) => {
      return this.renderKamoji(index, kamoji);
    });
    return (
      <div className="dropdown-menu emoji-box" aria-labelledby="dropdownMenuButton">
        <ul>
          {ks}
        </ul>
      </div>
    );
  }

  renderKamoji(index,k){
    return(
      <li key={index}>
        <a className="emoji-item" title={k} onClick={(e) => this.handleKamoji(e)}>{k}</a>
      </li>
    );
  }

  getKamojis () {
    return this.getRandomArrayElements(kamojiList, 40);
  }

  getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }

}