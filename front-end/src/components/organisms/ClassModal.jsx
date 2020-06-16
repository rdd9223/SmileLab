import React from 'react'
import FormLabel from "../atoms/FormLabel";
import FormControl from "../atoms/FormControl";
import { Modal, Row, Col } from 'react-bootstrap'
import Button from "../atoms/Button";
import axios from "axios"

class ClassModal extends React.Component{

    constructor(){
        super();
        this.state = {
            showHide : false
        }

        axios.get('http://localhost:4000/class',{
            headers:{
                "Cache-Control": "no-cache"
            }
        })
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((e) => {
                console.log(e);
                return;
            });

        
    }

    

    handleModalShowHide(event) {

        this.setState({ showHide: !this.state.showHide })
    }

    render(){
        return(
            <div>
                <FormLabel name="클래스" />
                <Row>
                    <Col md={9}>
                    <FormControl type="text" placeholder="" />
                    </Col>
                    <Col md={3}>
                     <Button name="검색하기" variant="primary" onClick={(event) => this.handleModalShowHide(event)}/>
                    </Col>
                </Row>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={(event) => this.handleModalShowHide()}>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button name="Close" variant="secondary" onClick={(event) => this.handleModalShowHide()} />
                        <Button name="Save Changes" variant="primary" onClick={(event) => this.handleModalShowHide()} />
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
    
}

export default ClassModal;