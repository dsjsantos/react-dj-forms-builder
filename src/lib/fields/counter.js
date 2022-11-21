import React from "react";

import { SupportFieldType } from '../renders';


const Counter = (props) => {
    const { id, current, min, max, overrideRenders } = props;
    const Custom = overrideRenders && overrideRenders[SupportFieldType.COUNTER];
    const currentClassState = (current===0 ? "zero" : (current >= (min ? min : 0) ? "valid" : "invalid"));
    return(
        <>
            { Custom ? <Custom id={id} current={current} min={min} max={max} /> :
            <div id={`counter_${id}`} className="input-counter">
                <small className={`count-current ${currentClassState}`}>{current}</small>
                <small>/</small>
                <small className="count-max">{max}</small>
            </div>
            }
        </>
    )
}

export default Counter;