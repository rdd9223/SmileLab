import React from "react";
import MessageRow from "../molecules/table/MessageRow";

class MessageBody extends React.Component {
  render() {
    return (
      <tbody>
        {this.props.rows.map((item) => {
          return <MessageRow key={item.message_idx} body={item} onClick={this.props.onClick} />;
        })}
      </tbody>
    );
  }
}

export default MessageBody;
