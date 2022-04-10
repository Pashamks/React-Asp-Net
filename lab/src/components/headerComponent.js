import React from 'react'
import { Container, Navbar } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar name='NavBarHeader' style={{backgroundColor: '#779556'}} variant="dark">
            <Container className="d-flex text-light font-weight-bold justify-content-center">
               <p name='textHeader'className='fs-2'>Chess page created by Pavlo Somko PZ-25</p> 
            </Container>
        </Navbar>
    );
}

