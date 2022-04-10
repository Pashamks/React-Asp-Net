import React, {Component} from 'react'
import './Board.css';
function FillData(){
    const figures = {
        WK : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png",
        BK : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png",
        WQ : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png",
        BQ : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png",
        WR : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png",
        BR : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png",
        BB : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png",
        WP : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
        BP : "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png" 
    }
    var letters = [ 'h','g','f', 'e','d', 'c','b', 'a'  ];
    var tableField = [];
    let additionalTextNumber = 1;
    let additionalText = '';
    let picture = '';
    let color = 'WhiteSquare';
    let white = 'WhiteSquare';
    let black = 'BlackSquare';
    let numberBlack = 'NumberColorBlack';
    let numberWhite = 'NumberColorWhite';
    let numberStyle = '';
    let letterStyle = ''
    let pos = 0;
    let bgColor = '';
    for (var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            if(j%2==0){
                color = white
                numberStyle = "Number " + numberBlack
                letterStyle = "Letters " +numberBlack
            }
            else{
                color = black
                numberStyle = "Number " + numberWhite
                letterStyle = "Letters " +numberWhite
            }
            pos = i*8 + j+1;
            picture = FindFigure(pos, figures)
            if(j==0){
                additionalTextNumber = i+1
                if(i==7){
                    additionalText = letters[j]
                }
            }
            else if(i==7){
                additionalText = letters[j]
                additionalTextNumber = ''
            }
            else{
                additionalTextNumber = ''
                additionalText = ''
            }
            bgColor = " d-flex position-relative justify-content-center align-items-center " + color;
            
            tableField.push(
                <div className={bgColor} key = {pos} >
                    <span className={numberStyle}>
                        {additionalTextNumber}  
                    </span>
                    <span className={picture}>
                        <img  src={picture} alt='' className='pictureStyle'/>
                    </span>
                    <span className={letterStyle}>
                        {additionalText}
                    </span>
                 
                </div>
            );
        }
        [white,black]=[black,white];
        [numberBlack, numberWhite] = [numberWhite, numberBlack];
        
    }
    return (
    <div className='mt-2 Board'>
        {tableField}
    </div>);
}

function FindFigure(pos, fig){
    switch (pos){
        case 10:
        case 16:
        case 25:
        case 36:
        case 43:
            return fig.WP;
        case 1:
            return fig.WK;
        case 3: 
            return fig.WR;
        case 11:
            return fig.BB;
        case 31:
            return fig.BQ;
        case 33:
            return fig.BP;
        case 40:
            return fig.WQ;
        case 56:
            return fig.BK;
        case 62:
            return fig.BR;
        default:
            return null;
    }
}

class Board extends Component{

    render (){
        return (<div>
           {FillData()}
            </div>)
    }
}

export default Board;