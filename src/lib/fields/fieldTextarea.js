import React from "react";

import { getFieldContentClasses } from '../tools';
import { Counter } from ".";
import { RequiredMark } from ".";


const FieldTextarea = (props) => {
    const { id, name, label, placeHolder, disabled, rows, requiredMark, 
            value, errorMessage, onChange, counter, overrideRenders } = props;
    const inputClassName = errorMessage ? "error" : "";
    const currentCount = value ? value.length : 0;
    const enableCounter = counter && (counter.top || counter.bottom) && counter.maxCount;

    return(
        <>
            { label &&
            <div className="field-label"><label htmlFor={id}>{label}</label>{requiredMark ? <RequiredMark overrideRenders={overrideRenders} /> : null}</div>
            }
            <div className={`input-wrapper ${getFieldContentClasses(value, errorMessage, disabled)} ${enableCounter ? "with-counter" : "no-counter"}`}>
                { enableCounter && counter.top &&
                <Counter id={`top_${id}`} current={currentCount} min={counter.minCount} max={counter.maxCount} overrideRenders={overrideRenders} />
                }
                <textarea 
                    id={id}
                    name={name}
                    disabled={disabled}
                    className={inputClassName}
                    rows={rows}
                    placeholder={placeHolder}
                    value={value ? value : ""}
                    onChange={(e) => onChange(e, {name: name, value: e.target.value})}
                />
                { enableCounter && counter.bottom &&
                <Counter id={`bottom_${id}`} current={currentCount} min={counter.minCount} max={counter.maxCount} overrideRenders={overrideRenders} />
                }
            </div>
            { errorMessage &&
            <div className="field-error">{errorMessage}</div>
            }
        </>
    );
}

export default FieldTextarea;