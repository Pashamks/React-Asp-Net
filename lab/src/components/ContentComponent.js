import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import BoardComponent from './boardComponent'
import FormComponent from './formComponent'
import DoughtnutChart from './doughnutComponent';
import AvatarPhoto from './avatarComponent';
function FormBoard() {
    return (
        <Container fluid>
            <Row className='d-flex p-2'>
                <Col >
                    <BoardComponent/>
                </Col>
                <Col >
                    <FormComponent/>
                </Col>
                <Col>
                    <AvatarPhoto/>
                   <DoughtnutChart/>
                </Col>
                
            </Row>
        </Container>
    );
}

export default FormBoard;
