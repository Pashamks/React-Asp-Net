import React, {useState, useEffect} from "react";
import { Chart as ChartJS, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Tooltip, Title, ArcElement, Legend);

function DoughtnutChart() {
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
    const [state,setState] = useState({
        labels: [],
        datasets: []
    })
    
    useEffect(() => {
        setState({
            labels: ["King", "Gueen", "Rook", "Bishop", "Pawn"],
            datasets: [{
                data: [
                   document.getElementsByClassName(figures.WK).length + document.getElementsByClassName(figures.BK).length, 
                   document.getElementsByClassName(figures.WQ).length + document.getElementsByClassName(figures.BQ).length, 
                   document.getElementsByClassName(figures.WR).length + document.getElementsByClassName(figures.BR).length, 
                   document.getElementsByClassName(figures.BB).length, 
                   document.getElementsByClassName(figures.WP).length + document.getElementsByClassName(figures.BP).length
                ],
                backgroundColor: [
                    '#2ecc71',
                    '#3498db',
                    '#95a5a6',
                    '#9b59b6',
                    '#FFFF00'
                ]
            }],
        })
    
    }, []);

    return (
        <div className="canvas w-75 p-2" >
            <Doughnut data={state} width="300px" height="300px"/>
        </div>
    );
}

export default DoughtnutChart;
