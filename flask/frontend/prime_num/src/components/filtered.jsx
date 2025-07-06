
import { useState,useEffect} from "react";
import {useLocation} from "react-router-dom";
const filtered = () => {
  const location = useLocation();
  const selectedNum = location.state.selectedNum;
    const [num, curr] = useState([]);
     useEffect(() => {
      fetch("http://127.0.0.1:5000/num",{
        method: "POST",
  body: JSON.stringify({ data: selectedNum }), 
        headers: {
          "Content-Type": "application/json",
        },
      }) 
        .then(response => response.json())
        .then(data => {
          curr(() => [...data.message]);
        });
    }, []);
  return (
    <div className="selection vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-wrap justify-content-center align-items-center w-100 h-100">
            {num.map((n) => (
                <h1 onClick={() => handleClick(n)} className="w-25 h-25 m-3 p-4 text-center " style={{cursor: "pointer",border:"1px solid black",borderRadius:"5px",fontSize:"5rem",backgroundColor:'violet'}} key={n} value={n}>
                {n}
                </h1>
            ))}
        </div>
    </div>
  );
}
export default filtered;