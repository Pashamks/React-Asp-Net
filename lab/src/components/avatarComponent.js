import React, {Component} from 'react'
import { Modal, Card} from 'react-bootstrap'

class AvatarPhoto extends Component{
    render(){
        return (
            <Modal.Dialog>
               <Card>
                    <Card.Img variant="top" className="avatar" style={{width:'100%', maxHeight:'300px'}}/>
                </Card>
            </Modal.Dialog>
        )
    }
}

export default AvatarPhoto;