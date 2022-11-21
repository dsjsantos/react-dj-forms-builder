import React, { useEffect } from 'react';

import { RequiredMark } from '.';
import { isArray, isObject } from '../tools';


const FieldDropdown = (props) => {
    const { id, name, label, placeHolder, disabled, requiredMark, options,
            value, errorMessage, onChange, overrideRenders } = props;
    const dropdownClassName = (disabled ? "disabled" : "");
    const hasPlaceholder = (placeHolder!==null && placeHolder!==undefined);
    const optionElems = [];
    if(isArray(options)) {
        options.forEach((item, indx) => {
            if(isObject(item)) {
                optionElems.push(<option key={`${id}_option_${indx}`} value={item.value}>{item.text}</option>);
            }
        });
    }

    useEffect(() => {
        if(!hasPlaceholder && isArray(options) && options.length) {
            const expected = options[0].value;
            if(expected!==value) {
                onChange(null, { name: name, value: expected });
            }
        }
    }, [hasPlaceholder, options, name, value, onChange]);

    return(
        <div className={dropdownClassName}>
            { label &&
            <div className="field-label"><label htmlFor={id}>{label}</label>{requiredMark ? <RequiredMark overrideRenders={overrideRenders} /> : null}</div>
            }
            <select
                id={id}
                name={name}
                disabled={disabled}
                defaultValue={value}
                onChange={evnt => { onChange(evnt.nativeEvent, {name: name, value: evnt.nativeEvent.target.value }) } }>
                { hasPlaceholder && 
                <option value="">{placeHolder}</option>
                }
                {optionElems}
            </select>
            { errorMessage &&
            <div className="field-error">{errorMessage}</div>
            }
        </div>
    )
}

export default FieldDropdown;