import React from 'react';

import { isArray } from '../tools';


const FieldCheckbox = (props) => {
    const { id, name, label, labelBefore, disabled, checked, errorMessage,
            onToggle, children, hideChildren, renderChild } = props;
    const checkboxClassName = (disabled ? "disabled" : "");
    return(
        <>
            { (label && labelBefore) &&
            <label htmlFor={id}>{label}</label>
            }
            <input 
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                disabled={disabled}
                className={checkboxClassName}
                onChange={e => onToggle(e)} />
            { (label && !labelBefore) &&
            <label htmlFor={id}>{label}</label>
            }
            
            { errorMessage &&
            <div className="field-error">{errorMessage}</div>
            }

            { (!(hideChildren && !checked) && isArray(children)) &&
                children.map((child, indxChild) => renderChild(child, indxChild))
            }

        </>
    )
}

export default FieldCheckbox;
