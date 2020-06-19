import React, { useCallback, useState } from "react";
import Button from "../../atoms/Button";
class MessageRow extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const idx = this.props.body.message_idx;
        return (
            <>
                <tr >
                    <td>{this.props.body.message_idx}</td>
                    <td>{this.props.body.class_name}</td>
                    <td>{this.props.body.date}</td>
                    <td><Button name={"보기"} size="md" onClick={() => this.props.onClick(idx)}/></td>
                </tr>
            </>
        );
    }
};

export default MessageRow;
