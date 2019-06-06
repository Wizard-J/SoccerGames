import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import AcName from "./components/AcName/AcName";
import AcBox from "./components/AcBox/AcBox";
import Filter from "./components/Filter/Filter";
import { getRandomIp,randomTimer } from "./IPTools/iptools";
import { switchFilter } from "./redux/redux";

import 'antd/dist/antd.css';
import './App.css';


@connect(
  state=>({reduxStore:state}),
  {switchFilter}
)
class App extends Component {

  state = {
    mt:0,
    data: [],
    timer:null,
    leagueList:[],
  }

  // 随机生成ip每隔10-15秒钟发起请求防止小黑屋
  configIP(){
    return {
      'headers': {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Forwarded-For': getRandomIp(),
      },
      "Cache-Control": "no-cache",
      'withCredentials': true,   // 用于跨越处理
      'validateStatus': null,   // 用于跳过请求校验
    }
  }

  update(){
    axios.get("ajax/score/data?mt="+this.state.mt,this.configIP())
    .then(response => {
      let data = response.data.rs;
      this.filtAndUpdate(data);
    }).catch(error=>{console.log(error)});
  }


  // 数据筛选
  filtAndUpdate(data){
    const { dataScope,filtGames, filterOn } = this.props.reduxStore;
    let leagueList = new Set();
    let scoresFilter = this.props.reduxStore.scoresFilter;

    // 筛选数据并更新视图
    data = data.filter((item)=>{
      let status = item.status;
      let leagueName = item.league ? item.league.n : '';
      let showLeagues = this.props.reduxStore.showLeagues;

      // 比分处理
      // 射正 hso|gso、 射偏hsf|gsf、 进攻ha|ga、 危险进攻hd|gd
      const { hso,hsf,gso,gsf,hd } = item.plus ? item.plus : {hso:0,hsf:0,gso:0,gsf:0,hd:0};
      const hostSubsGuest = (hso*1+hsf*1)-(gso*1+gsf*1);

      // 赛事名称，用于后续进行筛选
      leagueList.add(item.league.n);
      
      // 总开关
      if(!filterOn) return true;// 总开关关闭，不进行筛选,全部通过

      // 屏蔽未开始和已经完成的比赛
      let gameFilter = true;
      if(filtGames && (status==='全' || status==='未' || status==='-1')) gameFilter = false;

      // 时间筛选
      let timeFilter = true
      if(item.status==='半') status=45;
      if(item.status==='未') status=0;
      if(item.status==='全') status=90;
      status = status*1;
      if(typeof(status)==='number' && status>=dataScope[0] && status<=dataScope[1] ) timeFilter = true;
      else timeFilter = false;

      // 赛事筛选
      let leagueFilter = true;
      if(showLeagues.length===0 || showLeagues.indexOf(leagueName)>-1 ) leagueFilter = true;
      else leagueFilter = false;

      // 比分筛选
      let scoresItem = true;
      if(hso*1>=scoresFilter[0] && hsf*1>=scoresFilter[1] && hd*1>=scoresFilter[2] && hostSubsGuest*1>=scoresFilter[3]) scoresItem=true;
      else scoresItem=false;
      // if(!scoresItem) console.log('scoresFilter[3]:',scoresFilter[3],'hostSubsGuest:',hostSubsGuest,hostSubsGuest>=scoresFilter[3])

      return gameFilter && timeFilter && leagueFilter && scoresItem;
    })

    leagueList = Array.from(leagueList);

    this.setState({
      data:[]
    })
    // 更新视图
    this.setState({
      data:data,
      leagueList:leagueList
    })
    
    this.props.switchFilter({leagueList});
  }

  // 子组件触发过滤器生效了
  filterUpDate = ()=>{
    this.update();
  }

  componentWillMount() {
    this.update();
    this.state.timer && clearTimeout(this.timer);
  }

  componentDidMount(){
    this.setState({
      timer:setInterval(() => {
        console.log("视图更新了");
        this.update();
      }, randomTimer(10,15))
    })
  }

  render() {
    const data = this.state.data;
    let lastTeam; // 记录上一支比赛队伍
    // console.log(data);
    return (
      <div className="App" >
        <div className="games" style={{marginBottom:'0.5rem'}}>
          {
            data.length > 0 && data.map(((item, index) => {

              if (item.league && lastTeam === item.league.i) {
                return (
                  <AcBox
                    key={index}
                    scores={item.rd}
                    status={item.status}
                    host={item.host}
                    guest={item.guest}
                    concede={item.f_ld}
                    graph={item.events_graph}
                    plus={item.plus}
                  />
                );
              } else {
                if (item.league) lastTeam = item.league.i;
                return (
                  <div key={index}>
                    <AcName league={item.league} />
                    <AcBox
                      scores={item.rd}
                      status={item.status}
                      host={item.host}
                      guest={item.guest}
                      concede={item.f_ld}
                      graph={item.events_graph}
                      plus={item.plus}
                    />
                  </div>
                );
              }
            }))
          }
        </div>
        <Filter filterUpDate={this.filterUpDate}/>
      </div>
    );
  }
}

export default App;