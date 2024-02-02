import React from "react";

export default function Dies(props){

    const styles = {
        backgroundColor: props.held ?  "#59E391" : "#ffffff"
    }

    return(
        <div className="dieFace" onClick={props.hold} style={styles}>
            <div className="dieNum">
                {props.value}
            </div>
        </div>
    )
}