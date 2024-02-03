import React from "react";

export default function Dies(props){

    const styles = {
        backgroundColor: props.held ?  "#59E391" : "#ffffff"
    }

    return(
        <div className="dieFace" onClick={props.hold} style={styles}>
            <div className="dieImg">
                <img src={props.value} className="die" alt="" />
            </div>
        </div>
    )
}