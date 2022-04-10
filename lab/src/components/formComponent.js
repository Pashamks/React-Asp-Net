import React, {Component} from 'react'
import './Form.css';
import {Form, Button, Modal, Row, Card} from 'react-bootstrap'
import $ from "jquery";
import axios from 'axios';
import cors from 'cors';

class MyForm extends Component{
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '', 
            colour: '',
            level: '',
            message: '',
            colorChanged: 0
        };
    }

    MyOnSubmit(event) {
        event.preventDefault();
        
        this.setState({
            username: $("input[name='user_name']").val(),
            email: $("input[name='email']").val(),
            password: $("input[name='password']").val(),
            visibility: $("input[name='visibility']:checked").parent().length,
            level: $("select[name='level']").find(":selected").text(),
            text_to: $("textarea[name='message']").val()
        }, () => {
            var st = false;
            if(this.state.visibility == 1){
                st= true;
            }
            var order = {
                name : this.state.username,
                email : this.state.email,
                password : this.state.password,
                stayAnonim : st,
                level : this.state.level
            }
            console.log(order);
            $.ajax({
                type: "POST",
                url: "https://localhost:44397/api/Lab/login",
                data: JSON.stringify(order),
                headers: {
                  'Content-Type': 'application/json'
                },
                success: function(data) {
                    console.log(data);
                    alert('Person has been added:\n' + data.message);
                }
            });
            
        });
    }
 
    getAvatar() {
        $.ajax({
            type: "GET",
            url: "https://random.dog/woof.json?ref=apilist.fun",
            success: function(data) {
                $('.avatar').attr('src', data.url);
            }
        });
    }
    changColor(){
        if(document.getElementsByName('NavBarHeader')[0].className != 'bg-dark'){
            document.getElementsByName('NavBarHeader')[0].className = 'bg-dark';
        }
       else{
        document.getElementsByName('NavBarHeader')[0].className = 'bg-success';
       }
    }
    countTime(event){
        var mailformat =/\d\d:\d\d:\d\d/;
        let mytime = $("input[name='timeTo']").val();
        if(!mytime.match(mailformat))
        {
            alert("You have entered an invalid time!");
            return ;
        }
        var d = new Date();
        var dateTo = mytime.split(':');
        d.setHours(dateTo[0]);
        d.setMinutes(dateTo[1]);
        d.setSeconds(dateTo[2]);
        var timeend = new Date(d);
        var now = new Date().getTime();
        console.log(timeend);
        var x = setInterval(function() {
            now = new Date().getTime();
           var distance = timeend-now;
           if(timeend < now){
               alert('We can not go to past)) Enter normal time!')
               clearInterval(x) 
               return;
           }
       
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            console.log(this.Time);
           document.getElementsByName("timeLeft")[0].innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
           if (seconds==0 & minutes == 0 & hours == 0 ){
               alert('Timer is out')
               clearInterval(x) 
           }
         }, 1000);
    }

    render (){
        return (
            <Modal.Dialog  >
            <Modal.Header className='justify-content-center'>
                <Modal.Title >
                    <p className='text-center'>Get started quickly! </p>
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => this.MyOnSubmit(event)}>
                    <Form.Group className='d-flex p-1'>
                        <Form.Label className='w-50' >Your name:</Form.Label>
                        <Form.Control name='user_name' required type='text' ></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex p-1'>
                        <Form.Label className='w-50'  >Your email:</Form.Label>
                        <Form.Control type='email' required name='email'></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex p-1'>
                        <Form.Label className='w-50'  >Your password:</Form.Label>
                        <Form.Control type='password' name='password' required ></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex p-1'>
                        <Form.Label className='w-50'>Chose your level:</Form.Label>
                        <Form.Select name='level'>
                            <option value='Beginner'>Beginner</option>
                            <option value='Intermidiate'>Intermidiate</option>
                            <option value='Expert'>Expert</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='d-flex p-1'>
                        <Form.Label className='w-50'>Choose your visibility to opponent:</Form.Label>
                        <Form.Check label='Stay anonim' inline  name='visibility'></Form.Check>
                        <Form.Check label='Show name'inline  name='visibility'></Form.Check>
                    </Form.Group>
                    <Form.Group className='d-flex p-1'>
                        <Form.Label className='w-50'>Enter your massage to opponent:</Form.Label>
                        <Form.Control as='textarea' name='text_to'></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-around mt-1'>
                        <Button onClick={this.getAvatar}>Play</Button>
                        <Button type='reset' >Reset</Button>
                        <Button type='submit'>Submit</Button>
                    </Form.Group>
                    <Form.Group className='d-flex mt-2'>
                        <Form.Label className='w-50'>Time:</Form.Label>
                        <Form.Control 
                        className='w-50'
                        name='timeTo'
                        placeholder="00:00:00"
                        ></Form.Control>
                        <Form.Label name='timeLeft' className='w-50 p-2'></Form.Label>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-around mt-2'>
                        <Button onClick={this.countTime}>Start</Button>
                        <Button onClick={this.changColor}>Change text color</Button>  
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal.Dialog>
            )
    }

}

export default MyForm;