import React, { Component } from 'react';
import "./acname.scss";

class AcName extends Component {

    render() {

        const league = this.props.league ? this.props.league : '';

        return (
            <div className="ac-name">
                <span className="n">{league.n}</span>
                <div>
                    <span className="z"> 主:</span>
                    <span className="b"> - </span>
                    <span className="k"> 客:</span>
                    <span className="b"> -  </span>
                    <span> 绝:</span>
                    <span className="b"> - </span>
                    <span> 补:</span>
                    <span className="b"> - </span>
                </div>
            </div>

        );
    }
}

export default AcName;