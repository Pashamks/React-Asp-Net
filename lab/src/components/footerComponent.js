import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Footer() {
    return (
        <Navbar name='footerBar' style={{backgroundColor: '#779556'}}>
            <Container className='justify-content-center text-light font-weight-bold'>
                <p name='footerText'>Read more about the </p>
                <Nav className="d-flex">
                    <Nav.Link href="https://www.chess.com/puzzles/problem/905">
                        <p name='footerText'>game</p>
                    </Nav.Link>
                </Nav>
                <p name='footerText'> and about the </p>
                <Nav className="d-flex">
                    <Nav.Link href="https://www.chess.com/learn-how-to-play-chess">
                        <p name='footerText'>rules</p>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

