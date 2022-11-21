import React from 'react';

import { getFieldContentClasses } from '../tools';
import { RequiredMark } from ".";


const FieldInput = (props) => {
    const { id, name, label, placeHolder, disabled, isPasswordInput, requiredMark,
            value, errorMessage, onChange, overrideRenders } = props;
    const inputClassName = errorMessage ? "error" : "";
    const extraParams = {
        type: isPasswordInput ? "password" : "input"
    }

    return(
        <>
            { label &&
            <div className="field-label"><label htmlFor={id}>{label}</label>{requiredMark ? <RequiredMark overrideRenders={overrideRenders} /> : null}</div>
            }
            <div className={`input-wrapper ${getFieldContentClasses(value, errorMessage, disabled)}`}>
                <input 
                    id={id}
                    name={name}
                    disabled={disabled}
                    className={inputClassName}
                    placeholder={placeHolder}
                    onChange={(e) => onChange(e, {name: name, value: e.target.value})}
                    autoComplete={name}
                    value={value ? value : ""}
                    {...extraParams}
                />
            </div>
            { errorMessage &&
            <div className="field-error">{errorMessage}</div>
            }
        </>
    );
}

export default FieldInput;