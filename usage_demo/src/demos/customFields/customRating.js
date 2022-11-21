import React from 'react';

import { FormBuilderFields, FormBuilderSupportFields } from 'react-dj-forms-builder';

const isInteger = (val) => Number.isInteger(val);

const CustomRating = (props) => {
    const { name, className, label, requiredMark, disabled, start, length, onChange, value, errorMessage } = props;
    const range = (isInteger(start) && isInteger(length) && length>0) ? Array.from({length: length}, (_, i) => i + start) : [];
    const items = [];
    range.forEach(val => {
        items.push({
            label: "",
            className: "rb-score-wrapper",
            value: val
        })
    });

    return(
        <>
            { label &&
            <div className="field-label">{label}{requiredMark ? <FormBuilderSupportFields.RequiredMark /> : null}</div>
            }
            <div className={className}>
                <div className="score-grades">
                    <div className="grades-wrapper">
                    { range.map((val) => 
                        <div className={`rb-score-wrapper` + (disabled ? " disabled": "")} key={`ccKey_${val}`}>{val}</div>
                    )}
                    </div>
                </div>
                <div className="radio-field">
                    <div className="grades-wrapper">
                        <FormBuilderFields.FieldRadioGroup
                            id={`${name}_Id`}
                            name={name}
                            disabled={disabled ? true : false}
                            className="radio-field radio-group-score"
                            label={null}
                            items={items}
                            uncheckOnDoubleClick={true}
                            uncheckOnContextMenu={true}
                            value={value}
                            errorMessage={null}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
            { errorMessage &&
            <div className="field-error">{errorMessage}</div>
            }
        </>
    )
}

export default CustomRating;