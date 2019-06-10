import React, { Component } from 'react';
import { Slider, Switch, Select } from 'antd';
import { switchFilter } from "../../redux/redux";
import { connect } from "react-redux";

import "./filter.scss";

/**
switchFilter({filterOn:true,dataScope:[50,100]});
*/
@connect(
    state => ({ reduxStore: state }),
    { switchFilter }
)
class Filter extends Component {

    state = {
        filterOn: true, // 筛选功能开启
        show: false, // 显示筛选条目
        showLeagues: [],// 选中的赛事名称
        scoresFilter:[0,0,0,0], // 主队正偏-客队正偏: 最小值，最大值   主队危险进攻-客队危险进攻：最小值，最大值
    };

    handleDisabledChange = data => {
        this.props.filterUpDate();
        this.setState({ filterOn: data });
        this.props.switchFilter({ filterOn: data });
    };

    // 显示过滤器
    showFilter = () => {
        const toShow = !this.state.show;
        this.setState({
            show: toShow
        })
        if (toShow) {
            this._filter.style.height = '100vh';
            this._head.style.marginTop = '0.5rem';
        }
        else {
            this.props.filterUpDate();
            this._filter.style.height = '0.5rem';
            this._head.style.marginTop = '0';
        }
    }

    timeChange = (data) => {
        // 开启了过滤器，传递参数
        if (this.state.filterOn) {
            this.props.switchFilter({ filterOn: true, dataScope: data });
        }
        // 关闭了过滤器
        return;
    }

    hideGames = (data) => {
        if (this.state.filterOn) this.props.switchFilter({ filtGames: data });
    }

    // 赛事名列表
    handleChange = (value) => {
        const leagueList = this.props.reduxStore.leagueList;
        const showLeagues = [];

        value.forEach((item) => {
            showLeagues.push(leagueList[item]);
        })

        this.setState({ showLeagues })
        this.props.switchFilter({ showLeagues });
    }

    // 比分列表
    scoreChanged(index,value) {
        let scores = this.state.scoresFilter;

        scores[index*2] = value[0];
        scores[index*2+1] = value[1];

        this.setState({ scoresFilter:scores })
        this.props.switchFilter({ scoresFilter:scores });
    }

    render() {
        const { filterOn } = this.state;
        const { Option } = Select;
        const leagueList = this.props.reduxStore.leagueList;
        const children = [];

        leagueList && leagueList.forEach((item, index) => {
            children.push(<Option key={index}>{item}</Option>);
        })

        return (
            <div className="filter" ref={filter => this._filter = filter}>
                <div className="head" ref={head => this._head = head}  >
                    <label className="weui-label" style={{ display: 'block', width: '5em' }}>手动筛选</label>
                    {this.state.show ? <span onClick={this.showFilter}>close</span> : <span onClick={this.showFilter}>open</span>}
                    <div className="switch">
                        <Switch size="small" defaultChecked onChange={this.handleDisabledChange} />
                    </div>
                </div>
                <div className="params">
                    <ul>
                        <li className="timeFilter">
                            <div>
                                <span>比赛时间：</span>
                                <Slider range defaultValue={[20, 50]} onChange={this.timeChange} disabled={!filterOn} />
                            </div>
                        </li>
                        <li className="hide">
                            <div className="spaceBetween">
                                <span>隐藏<span className='status'>未开始</span>和<span className='status'>已结束</span>的比赛：</span>
                                <Switch size="small" defaultChecked disabled={!filterOn} onChange={this.hideGames} />
                            </div>
                        </li>
                        <li className="leagueName">
                            <div className="spaceBetween">
                                <span className='title'>赛事名称：</span>
                                <Select
                                    mode="multiple"
                                    style={{ width: '80%',height:'0.3rem' }}
                                    placeholder={'pleace select'}
                                    defaultValue={this.state.showLeagues}
                                    onChange={this.handleChange}
                                    disabled={!filterOn}
                                >
                                    {children}
                                </Select>
                            </div>
                        </li>
                        <li className="scores">
                            <p className='title'>比分筛选：</p>
                            <div className="item-line">
                                <p className='item'>主队正偏-客队正偏：</p>
                                <Slider range min={-15} max={15} defaultValue={[0, 10]} onChange={this.scoreChanged.bind(this,0)} disabled={!filterOn} />
                                <p className='item'>主队危险进攻-客队危险进攻：</p>
                                <Slider range min={-100} max={100} defaultValue={[20, 50]} onChange={this.scoreChanged.bind(this,1)} disabled={!filterOn} />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Filter;