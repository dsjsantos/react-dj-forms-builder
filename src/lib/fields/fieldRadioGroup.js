import React, { Fragment } from 'react';

import { RequiredMark } from ".";
import { isArray } from '../tools';


const FieldRadioGroup = (props) => {
    const { id, name, label, labelBefore, disabled, requiredMark, items, value, errorMessage, onChange, overrideRenders,
            children, renderChild, hideChildren, uncheckOnDoubleClick, uncheckOnContextMenu } = props;
    const uncheckGroup = (e) => {
        e.preventDefault();
        onChange(e, { name, value: null});
    }
    if(!items || items.constructor !== Array || items.length<1) {
        throw new Error("Undefined or invalid radio-group items.");
    }

    return(
        <>
            { label &&
            <div className="field-label">{label}{requiredMark ? <RequiredMark overrideRenders={overrideRenders} /> : null}</div>
            }
            { items.map((item, indxItem) => {
                const radioClassName = ((item.className ? item.className : "") + (disabled ? " disabled" : "")).trim();
                const isChecked = `${value}`===`${item.value}`;
                const radioId = `${id}_radio_${indxItem}`;
                const itemChildrenIndex = item.childrenIndex && isArray(item.childrenIndex) ? item.childrenIndex : [];

                return(
                    <Fragment key={radioId}>
                        <div className={`radio-wrapper ${radioClassName}`}>
                            { (item.label && (labelBefore || item.labelBefore)) &&
                            <label htmlFor={radioId}>{item.label}</label>
                            }
                            <input 
                                id={radioId}
                                type="radio"
                                name={name}
                                disabled={disabled || item.disabled ? true : false}
                                checked={isChecked}
                                value={item.value}
                                onDoubleClick={isChecked && uncheckOnDoubleClick ? uncheckGroup : null}
                                onContextMenu={isChecked && uncheckOnContextMenu ? uncheckGroup : null}
                                onChange={evnt => onChange(evnt.nativeEvent, {name: name, value: evnt.nativeEvent.target.value })}
                            />
                            { (item.label && !labelBefore && !item.labelBefore) &&
                            <label htmlFor={radioId}>{item.label}</label>
                            }
                        </div>
                        { (!(hideChildren && !isChecked) && children && isArray(children) && renderChild) && 
                            itemChildrenIndex.map(childIndx => renderChild(children[childIndx], childIndx)) 
                        }
                    </Fragment>
                )
            })
            }
            { errorMessage &&
            <div className="field-error">{errorMessage}</div>
            }
        </>
    )
}

export default FieldRadioGroup;
