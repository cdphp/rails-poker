class PokerDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.myChart = undefined;
  }

  render() {
    // let statistics = this.renderStatistics();
    let styles = {width: 400, height: 400};
    return(
      <div className='poker-desktop panel panel-default' >
        <div className="panel-body">
          <canvas id="myChart" style={styles}></canvas>
        </div>
      </div>
    )
  }

  componentDidMount () {
    console.log("render chart..");
    this.renderStatistics();
  }

  componentDidUpdate () {
    // TODO: destroy chart before re render
    if(this.props.room_status == "finish"){
      let statistics_data = this.props.statistics_data;
      this.updateChartData(statistics_data);
    }
    else if(this.props.room_status == 'ready'){
      this.myChart.clear().reset();
    }
  }

  renderStatistics(){
    let ctx = document.getElementById("myChart").getContext("2d");
    console.log('initial chart');
    this.myChart = new Chart(ctx, {
      type: 'doughnut',
      options: this.chartOptions()
    });
    // if(this.props.room_status != 'ready' && this.props.statistics_data.labels){
    //   let ctx = document.getElementById("myChart").getContext("2d");;
    //   this.myChart = new Chart(ctx, {
    //     type: 'doughnut',
    //     data: this.chartData(),
    //     options: this.chartOptions()
    //   });
    // }
  }

  updateChartData(statistics_data){
    console.log("update chart..");
    this.myChart.data.labels = statistics_data['labels'];
    this.myChart.data.datasets = [
          {
            label: '# of Cards',
            data: statistics_data['datas'],
            yLabels: [...Array(statistics_data['total_count']+1).keys()],
            backgroundColor: statistics_data['colors'],
            hoverBackgroundColor: statistics_data['colors']
          }
      ];
    this.myChart.update();
  }
  chartData() {
    let statistics_data = this.props.statistics_data;
    return {
      labels: statistics_data['labels'],
      datasets: [
          {
            label: '# of Cards',
            data: statistics_data['datas'],
            yLabels: [...Array(statistics_data['total_count']+1).keys()],
            backgroundColor: statistics_data['colors'],
            hoverBackgroundColor: statistics_data['colors']
          }
      ]
    }
  }

  chartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
      }
  }

}
