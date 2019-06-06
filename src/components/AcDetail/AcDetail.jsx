import React, { Component } from 'react';

import "./acdetails.scss";

export default class componentName extends Component {

    state = {
        show: this.props.show,
        plus:this.props.plus
    }

    shouldComponentUpdate(){
        return true;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            show:nextProps.show,
            plus:nextProps.plus
        })
    }

    render() {

        const { hso,hsf,gso,gsf,hd,gd } = this.state.plus ? this.state.plus : { hso:0,hsf:0,gso:0,gsf:0,hd:0,gd:0};
        // 射正 hso|gso、 射偏hsf|gsf、 进攻ha|ga、 危险进攻hd|gd

        const deltaMain = (1*hso+1*hsf)-(1*gso+1*gsf);

        return (
            <div className="play-detail show" style={this.state.show?{display:'block'}:{display:'none'}} >
                <div className="cv-line">
                    <div className="rate-box cv-helf">
                        <div className="text-line">
                            <div className="z">
                                <p>{hso}</p>
                            </div>
                            <div className="t">
                                <p>射正</p>
                            </div>
                            <div className="k">
                                <p>{gso}</p>
                            </div>
                        </div>
                        <p className="rate-line">
                            <i style={{ width: hso/(1*hso+1*gso)*100+'%' }} />
                        </p>
                    </div>
                    <div className="rate-box cv-helf">
                        <div className="text-line">
                            <div className="z">
                                <p>{hsf}</p>
                            </div>
                            <div className="t">
                                <p>射偏</p>
                            </div>
                            <div className="k">
                                <p>{gsf}</p>
                            </div>
                        </div>
                        <p className="rate-line"><i style={{ width: hsf/(1*hsf+1*gsf)*100+'%' }} /></p>
                    </div>
                </div>
                <div className="cv-line">
                    <div className="rate-box cv-helf">
                        <div className="text-line">
                            <div className="z">
                                <p>{hd}</p>
                            </div>
                            <div className="t">
                                <p>危险进攻</p>
                            </div>
                            <div className="k">
                                <p>{gd}</p>
                            </div>
                        </div>
                        <p className="rate-line"><i style={{ width: hd/(1*hd+1*gd)*100+'%' }} /></p>
                    </div>
                    <div className="rate-box cv-helf">
                        <div className="text-line">
                            <div className="z">
                                <p>{deltaMain>0?deltaMain:'-'}</p>
                            </div>
                            <div className="t">
                                <p>主队正偏-客队正偏</p>
                            </div>
                            <div className="k">
                                <p>{deltaMain<0?deltaMain:'-'}</p>
                            </div>
                        </div>
                        <p className="rate-line">
                            {
                                deltaMain>0?<i style={{ width: '100%' }} />:<i style={{ width: '0%' }} />
                            }
                        </p>
                    </div>
                </div>
            </div>

        );
    }
}
