
import { useState } from "react";
import {useNavigate} from "react-router-dom";
const selectedNum=[];
const selection = () => {
    const navigate=useNavigate();
    const [atler,curr]=useState(false)
    const num=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    function handleClick(e) {
        if(selectedNum.indexOf(e) !== -1) {
            selectedNum.splice(selectedNum.indexOf(e), 1);
            console.log(selectedNum);
        }
        else{
        selectedNum.push(e);
        console.log(selectedNum);
        }
        curr(!atler);
    }
  
  return (
    <>
    <div className="selection  vw-100 d-flex flex-column justify-content-center align-items-center" style={{height:"fit-content"}}>
        <h1 className="text-center text-primary">Select a Number</h1>
        <div className="d-flex flex-wrap justify-content-center align-items-center w-100 h-100">
            {num.map((n) => (
                <h1 onClick={() => handleClick(n)} className="w-25 h-25 m-3 p-4 text-center  nums" style={{cursor: "pointer",border:"1px solid black",borderRadius:"5px",fontSize:"5rem",backgroundColor:(selectedNum.indexOf(n) !== -1)?'#086ff3':'white'}} key={n} value={n}>
                {n}
                </h1>
            ))}
        </div>
    </div>
    <div className="text-center w-100">
            <button onClick={() => navigate("/num", { state: { selectedNum:selectedNum } })} className="btn btn-primary mt-2 mb-4 styled-button" >Check Prime</button>
        </div>
        </>
  );
}
export default selection;