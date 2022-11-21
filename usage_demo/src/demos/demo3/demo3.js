import React, { useState, useEffect } from "react";
import en_US from "date-fns/locale/en-US";

import FormBuilder, { setConfigFieldCustomComponent, setConfigFieldProperty } from 'react-dj-forms-builder';
import CustomDateWithDatePicker from '../customFields/customDateWithDatePicker.js';

import baseFormConfig from './demo3.json';

// Import style
import './demo3.scss';


const Demo3 = () => {
    const [ fields, setFields ] = useState(null);
    const [ formConfig, setFormConfig ] = useState(null);

    const _handleFormUpdate = (newFields) => {
        setFields(newFields);
    }

    useEffect(() => {
        const updCfg = Object.assign({}, baseFormConfig);
        setConfigFieldCustomComponent(updCfg, ["periodFrom", "periodTo", "simpleDate", "rangedDate"], CustomDateWithDatePicker);
        setConfigFieldProperty(updCfg, ["periodFrom", "periodTo", "rangedDate"], "datePicker.locale", en_US);
        setFormConfig(updCfg);
    }, []);

    return(
        <div className="demo3-wrapper">
            <h3 className="section-title">Demo 3 - Custom Date Field Component</h3>

            <div className="button-row">
                <button type="button" className="demo-button show-fields" onClick={() => console.log("Fields:", fields)}><span>Show fields state object</span> (console.log)</button>
            </div>

            <p>
                Instead to use the property 'customComponents' like Demo 2, the following exemples uses 'setConfigFieldCustomComponent' to change custom fields' render component and 'setConfigFieldProperty' to set its 'datePicker.locale' property.
            </p>

            <form name="formMain" className="main-form">
                { formConfig &&
                <FormBuilder 
                    config={formConfig}
                    page={0}
                    className="form-content"
                    throwErrorOnInvalidFieldType={false}
                    throwErrorOnInvalidCustomRender={false}
                    onChange={_handleFormUpdate}
                />
                }
            </form>

            <div className="high-area">
                This is here only to add enough space to scroll down and allow 'date picker' to be under custom date element.
            </div>
        </div>
    )
}

export default Demo3;
