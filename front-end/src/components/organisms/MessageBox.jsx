import React from "react";
import Jumbotron from "../atoms/Jumbotron";

class MessageBox extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.message != null ){
            return(
                <>
                    <Jumbotron header={this.props.message.class_name} text={this.props.message.contents} />
                </>
            );
        }else{
            return(
                <>
                    <Jumbotron header={""} text={"메세지를 선택 해 주세요."} />
                </>
            )
        }
        
    }
}

export default MessageBox;