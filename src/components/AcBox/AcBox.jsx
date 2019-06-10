import React, { Component } from 'react';
import AcDetail from "../AcDetail/AcDetail";

import "./acbox.scss";

class AcBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
            ...this.props
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            ...nextProps
        })
    }

    hideDetail = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const { scores, status, host, guest ,concede, graph} = this.state;

        const { events, ml} = graph ? graph : { events:[], ml:90 }; // 比赛事件进度

        const prograss = status==='半'? '50%':status/ml*100 + '%';

        //处理让球
        for(let i in concede){
            if(concede[i]===null)concede[i]='-';
        }

        // 大小球
        let competing = undefined;
        if(concede)competing = concede.dx ? concede.dx[0] : undefined;

        //处理大小球
        for(let i in competing){
            if(competing[i]===null)competing[i]='-';
        }

        return (
            <div onClick={this.hideDetail} className="ac-box">
                <div className="ac-abstract">
                    <div className="play-time">
                        <div className="ccc">
                            <div className="as">{scores &&  scores.hg + " : " + scores.gg}</div>
                            <div className="vs"> {status==="全"||status==="半"||status==="未"? status : status + "'"}</div>
                        </div>
                    </div>
                    <div className="play-content">
                        <div className="play-line">
                            <div className="player-name" style={{ color: 'rgb(207, 19, 19)' }}>
                                <span className="team_name">{host && host.n}</span>
                            </div>
                            <div className="card_status">
                                {
                                    // 黄牌
                                    scores && scores.hy>0 &&<span className="card-yellow">{scores.hy}</span>
                                }
                                {
                                    // 红牌
                                    scores && scores.hr>0 &&<span className="card-red">{scores.hr}</span>
                                }
                            </div>
                            <div className="ci">
                                <span>亚：
                                    {
                                        concede ?
                                        concede.hrfsp+'/'+concede.hrf+'/'+concede.grfsp :
                                        '-/-/-'
                                    }
                                </span>
                                <span>
                                    大：
                                    {
                                        competing ? 
                                        competing.hdxsp+'/'+competing.hdx+'/'+competing.gdxsp :
                                        '-/-/-'
                                    }
                                </span>
                                </div>
                        </div>
                        <div className="time-line c">
                            <div className="icons">
                                {/*
                                    <i className="hsoff" style={{ left: '20%' }} />
                                    <i className="asoff" style={{ left: '24%' }} />
                                    <i className="ason" style={{ left: '48%' }} />
                                  
                                    <i className="z" style={{ left: '38%' }}></i>
                                    <i className="k" style={{ left: '71%' }} />
                                */}
                                {
                                    
                                    events.map((item,index)=>{
                                        const time = item.status/ml *100 + '%';
                                        switch(item.t){
                                            case 'gg':
                                                return <i key={index} className="k" style={{ left: time }} />;
                                            case 'hg':
                                                return <i key={index} className="z" style={{ left: time }}></i>;
                                            case 'hc':
                                                return <i key={index} className="hsoff" style={{ left: time }} />;
                                            case 'gc':
                                                return <i key={index} className="asoff" style={{ left: time }} />;
                                            default:
                                                return null;
                                        }
                                    })
                                }
                            </div>
                            <div className="cd" style={{ width: prograss }} />
                        </div>
                        <div className="play-line">
                            <div className="player-name" style={{ color: 'rgb(44, 28, 145)' }}>
                                <span className="team_name">{guest && guest.n}</span>
                            </div>&gt;
                                <div className="card_status" >
                                    {
                                        // 黄牌
                                        scores && scores.gy>0 &&<span className="card-yellow">{scores.hy}</span>
                                    }
                                    {
                                        // 红牌
                                        scores && scores.gr>0 &&<span className="card-red">{scores.hr}</span>
                                    }
                                </div>
                            <div className="ci">
                                <span>欧：-</span>
                                <span>初：-</span>
                            </div>
                        </div>
                    </div>

                </div>
                <AcDetail 
                    show={this.state.show} 
                    plus={this.state.plus}/>
            </div>
        );


    }
}

export default AcBox;