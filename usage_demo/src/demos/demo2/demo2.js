import React, { useState } from "react";

import FormBuilder from 'react-dj-forms-builder';
import CustomRating from "../customFields/customRating.js";

import baseFormConfig from './demo2.json';

// Import styles
import './demo2.scss';


const Demo2 = () => {
    const [ fields, setFields ] = useState(null);

    const _handleFormUpdate = (newFields) => {
        setFields(newFields);
    }

    return(
        <div className="demo2-wrapper">
            <h3 className="section-title">Demo 2 - Custom Rating component</h3>

            <div className="button-row">
                <button type="button" className="demo-button show-fields" onClick={() => console.log("Fields:", fields)}><span>Show fields state object</span> (console.log)</button>
            </div>

            <p>
                In these exemple, we use the 'customComponents' property to change custom fields' render component to set or 'CustomRating' component.
            </p>

            <form name="formMain" className="main-form">
                <FormBuilder 
                    config={baseFormConfig}
                    page={0}
                    className="form-content"
                    throwErrorOnInvalidFieldType={false}
                    throwErrorOnInvalidCustomRender={false}
                    onChange={_handleFormUpdate}
                    customComponents={{
                        rating1: CustomRating,
                        rating2: CustomRating,
                        rating3: CustomRating,
                        rating4: CustomRating,
                        rating5: CustomRating
                    }}
                />
            </form>
        </div>
    )
}

export default Demo2;
