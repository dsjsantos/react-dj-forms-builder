import React, { useState, useEffect } from "react";

import FormBuilder, { setConfigFieldProperty } from 'react-dj-forms-builder';

import baseFormConfig from './demo1.json';

// Import styles
import './demo1.scss';


const _addCodeMask = (unmaskedValue, isErasing) => {
    if(unmaskedValue) {
        if(isErasing) { // add '/' with 6
            return unmaskedValue
                .replace(/\D/g, '')
                .replace(/^(\d{5})(\d)/, "$1/$2")
                .replace(/(\d{6})\d+?$/, "$1");
        } else { // add '/' with 5
            return unmaskedValue
                .replace(/\D/g, '')
                .replace(/^(\d{5})(\d*)/, "$1/$2")
                .replace(/(\/\d{6})\d+?$/, "$1");
        }
    }
    return "";
}

const _removeCodeMask = (maskedValue) => {
    if(maskedValue) {
        return maskedValue.replace(/\//g, "");
    }
    return "";
}

const Demo1 = () => {
    const [ currPage, setCurrPage ] = useState(0);
    const [ fields, setFields ] = useState(null);
    const [ formConfig, setFormConfig ] = useState(null);
    const [ newRegEx, setNewRegEx ] = useState("^[0-9]{1,10}$");

    const _changePage = (page) => {
        setCurrPage(page);
    }

    const _handleFormUpdate = (newFields) => {
        setFields(newFields);
    }

    const _clearErrors = () => {
        const updFields = Object.assign({}, fields); // create new object to be considered a property change and trigger render
        if(updFields) {
            Object.keys(updFields).forEach(key => updFields[key].errorMessage = null);
        }
        setFields(updFields);
    }

    const _setErrors = () => {
        const updFields = Object.assign({}, fields); // create new object to be considered a property change and trigger render
        if(updFields) {
            Object.keys(updFields).forEach(key => updFields[key].errorMessage = `Test error ('${key}')`);
        }
        setFields(updFields);
    }

    const _setDisabled = (disable) => {
        const updFields = Object.assign({}, fields); // create new object to be considered a property change and trigger render
        if(updFields) {
            Object.keys(updFields).forEach(key => updFields[key].disabled = disable);
        }
        setFields(updFields);
    }

    const _setFieldRegEx = (fieldName, re) => {
        try {
            re = re && re.trim() ? re.trim() : null;
            if(re) {
                new RegExp(re.trim()); // check regular expression sintaxe
            }

            // We create new objects ('updCfg', 'updFields') to be considered a property change and trigger render
            // Remember that Object.assign or spread do a shallow copy. Due to that new object's properties that are also
            // a object/array stills the same of original object and nested changes to that property will reflect in both
            const updCfg = Object.assign({}, baseFormConfig);
            setConfigFieldProperty(updCfg, [ fieldName ], "regExInput", re);
            setFormConfig(updCfg);

            const updFields = Object.assign({}, fields);
            updFields[fieldName].value = null;
            updFields[fieldName].errorMessage = null;
            setFields(updFields);
    
        } catch(e) {
            alert('Invalid regular expression.');
        }
    }

    useEffect(() => {
        const updCfg = Object.assign({}, baseFormConfig);
        setConfigFieldProperty(updCfg, ["numberWithCheckDigit"], "maskAdd", _addCodeMask);
        setConfigFieldProperty(updCfg, ["numberWithCheckDigit"], "maskRemove", _removeCodeMask);
        setFormConfig(updCfg);
    }, []);

    return(
        <div className="demo1-wrapper">
            <h3 className="section-title">Demo 1 - General fields, groups and page</h3>

            <div className="button-row">
                <button type="button" className="demo-button show-fields" onClick={() => console.log("Fields:", fields)}><span>Show fields state object</span> (console.log)</button>
            </div>
            <div className="button-row">
                <button type="button" className="demo-button" onClick={() => _setErrors()}>
                    <span>Set error to fields</span>
                </button>
                <button type="button" className="demo-button" onClick={() => _clearErrors()}>
                    <span>Clear all errors</span>
                </button>
                <button type="button" className="demo-button" onClick={() => _setDisabled(true)}>
                    <span>Disable all fields</span>
                </button>
                <button type="button" className="demo-button" onClick={() => _setDisabled(false)}>
                    <span>Unset disabled</span>
                </button>
            </div>
            <div className="button-row">
                <button type="button" className="demo-button show-fields" onClick={() => _changePage(currPage===0 ? 1 : 0)}>
                    <span>Change page</span>
                </button>
            </div>
            <div className="button-row">
                <button type="button" className="demo-button show-fields" onClick={() => _setFieldRegEx("textField", newRegEx)}>
                    <span>Change input 'textField' regEx to:</span>
                </button>
                <input type="input" className="new-regex" value={newRegEx} onChange={e => setNewRegEx(e.target.value)} />
            </div>

            <h3>Página atual: {currPage}</h3>

            { /* ATTENTION: 
                **    If the 'key' prop were changed, it would triggered component constructor wich will be
                **    considered a page change and would reset all form data if 'resetFieldsOnPageChange' were true.
                */ }
            { formConfig &&
            <FormBuilder
                id={"formMainId"}
                name="formMain"
                rootAsForm={true}
                configX={formConfig}
                config={
                    {
                        "pages": [
                            {
                                "groups": [
                                    {
                                        render: true,
                                        "rowType": "fullwidth",
                                        "className": "group-card highlight-title group-1",
                                        "title": "General fields",
                                        "description": "This section shows general fields on a full width row (one field per column and one column per row)",
                                        "fields": {
                                            "textField": {
                                                "type": "input",
                                                "className": "text-field-1",
                                                "label": "Text Field (up to 100 chars)",
                                                "disabled": false,
                                                "placeHolder": "Enter some text",
                                                "requiredMark": true,
                                                "value": null,
                                                "errorMessage": null,
                                                "regExInput": "^[!-;?-~à-úA-ZÀ-Ú ']{1,100}$"
                                            },
                                            "hexaField": {
                                                "type": "input",
                                                "className": "hexa-field",
                                                "label": "Hexa Field (hexa value up to 64 bits)",
                                                "disabled": false,
                                                "placeHolder": "Hexadecimal value (64 bits)",
                                                "requiredMark": false,
                                                "value": null,
                                                "errorMessage": null,
                                                "regExInput": "^[0-9a-fA-F]{1,16}$"
                                            },
                                            "numberWithCheckDigit": {
                                                "type": "input",
                                                "className": "number-with-cd",
                                                "label": "Number with check digit (masked XXXXX/X)",
                                                "disabled": false,
                                                "placeHolder": "Codigo XXXXX/X",
                                                "requiredMark": false,
                                                "value": null,
                                                "errorMessage": null,
                                                "regExInput": "^[0-9]{1,6}$"
                                            },
                                            "passphrase": {
                                                "type": "input",
                                                "className": "passphrase-field",
                                                "label": "Passphrase (chars not displayed)",
                                                "disabled": false,
                                                "placeHolder": "Passphrase",
                                                "requiredMark": false,
                                                "isPasswordInput": true,
                                                "value": null,
                                                "errorMessage": null,
                                                "regExInput": "^[!-;?-~à-úA-ZÀ-Ú ']{1,63}$"
                                            },
                                            "checkBox1": {
                                                "type": "checkbox",
                                                "className": "checkbox-field-1",
                                                "disabled": false,
                                                "label": "Checkbox 1",
                                                "value": false,
                                                "errorMessage": null
                                            },
                                            "checkBox2": {
                                                "type": "checkbox",
                                                "className": "checkbox-field-1",
                                                "disabled": false,
                                                "label": "Checkbox 2",
                                                "labelBefore": true,
                                                "value": false,
                                                "errorMessage": null
                                            },
                                            "memo": {
                                                "type": "textarea",
                                                "className": "memo-field",
                                                "rows": 4,
                                                "disabled": false,
                                                "label": "Memo (text area with counter at top and bottom)",
                                                "placeHolder": "Type a memo here",
                                                "requiredMark": true,
                                                "value": null,
                                                "errorMessage": null,
                                                "regExInput": "^[!-;?-~à-úA-ZÀ-Ú ']{1,500}$",
                                                "counter": {
                                                    "top": true,
                                                    "bottom": true,
                                                    "minCount": 10,
                                                    "maxCount": 500
                                                }
                                            },
                                            "Dropdown": {
                                                "type": "dropdown",
                                                "className": "dropdown-field amb-dd-setor",
                                                "label": "Dropdown:",
                                                "disabled": false,
                                                "placeHolder": "Select one option",
                                                "requiredMark": true,
                                                "value": null,
                                                "errorMessage": null,
                                                "options": [
                                                    { "value": "opt1", "text": "Option 1" },
                                                    { "value": "opt2", "text": "Option 2" },
                                                    { "value": "opt3", "text": "Option 3" }
                                                ]
                                            },
                                            "radioGroup1": {
                                                "type": "radio-group",
                                                "className": "radio-group-wrapper",
                                                "label": "Radio Group 1 (you may uncheck with dlb click or context menu):",
                                                "disabled": false,
                                                "value": null,
                                                "errorMessage": null,
                                                "items": [
                                                    { "className": "radio-field type-1", "label": "Radio Option 1", "value": "ro1" },
                                                    { "className": "radio-field type-2", "label": "Radio Option 2", "value": "ro2" },
                                                    { "className": "radio-field type-3", "label": "Radio Option 3", "value": "ro3" }
                                                ],
                                                "uncheckOnDoubleClick": true,
                                                "uncheckOnContextMenu": true
                                            },
                                            "radioGroup2": {
                                                "type": "radio-group",
                                                "className": "radio-group-wrapper",
                                                "label": "Radio Group 2 (specific item with label before radio/ uncheck disabled):",
                                                "disabled": false,
                                                "requiredMark": true,
                                                "value": null,
                                                "errorMessage": null,
                                                "items": [
                                                    { "className": "radio-field type-1", "label": "Option 1", "value": "ro1", "labelBefore": true },
                                                    { "className": "radio-field type-2", "label": "Option 2", "value": "ro2" }
                                                ],
                                                "uncheckOnDoubleClick": false,
                                                "uncheckOnContextMenu": false
                                            }
                                        }
                                    },
                                    {
                                        "rowType": "fullwidth",
                                        "className": "group-card highlight-title group-2",
                                        "title": "Children fields",
                                        "description": "The following sections shows children/nested fields.",
                                        "fields": null
                                    },
                                    {
                                        "rowType": "fullwidth",
                                        "className": "group-card",
                                        "description": "This is a checkbox field that, when checked, will show extra fields on a splited row (two columns per row):",
                                        "fields": {
                                            "extraData": {
                                                "type": "checkbox",
                                                "className": "checkbox-extra-data",
                                                "label": "Extra Data (Check it to enter extra data)",
                                                "disabled": false,
                                                "value": false,
                                                "errorMessage": null,
                                                "hideChildren": true,
                                                "children": [
                                                    {
                                                        "rowType": "split",
                                                        "className": "group-extra-data",
                                                        "fields": {
                                                            "extraDataValue1": {
                                                                "type": "input",
                                                                "className": "data-value-1",
                                                                "label": "Extra Data Value 1 (text)",
                                                                "disabled": false,
                                                                "placeHolder": "text value",
                                                                "value": null,
                                                                "errorMessage": null
                                                            },
                                                            "extraDataValue2": {
                                                                "type": "input",
                                                                "className": "data-value-2",
                                                                "label": "Extra Data Value 2 (integer)",
                                                                "disabled": false,
                                                                "placeHolder": "integer value",
                                                                "value": null,
                                                                "errorMessage": null,
                                                                "regExInput": "^[0-9]{1,10}$"
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    {
                                        "render": true,
                                        "rowType": "fullwidth",
                                        "className": "group-card",
                                        "title": "Radio selection with nested fields",
                                        "description": "According to radio 'group type' selection a specific content will be displayed.",
                                        "requiredMarkTitle": true,
                                        "requiredMarkDescription": false,
                                        "fields": {
                                            "groupType": {
                                                "type": "radio-group",
                                                "className": "radio-field",
                                                "label": null,
                                                "disabled": false,
                                                "value": "NORMAL",
                                                "errorMessage": null,
                                                "hideChildren": true,
                                                "items": [
                                                    { "label": "Normal", "className": "rb-wrapper", "value": "NORMAL", "childrenIndex": [ 0 ] },
                                                    { "label": "Enhanced", "className": "rb-wrapper", "value": "ENHANCED", "childrenIndex": [ 1, 2 ] }
                                                ],
                                                "children": [
                                                    {
                                                        "rowType": "fullwidth",
                                                        "className": "subgroup-card",
                                                        "description": "This is the normal mode. No extra informatin is required.",
                                                        "fields": null
                                                    },
                                                    {
                                                        "rowType": "fullwidth",
                                                        "className": "subgroup-card",
                                                        "description": "This is the first enhanced card, below the second :D",
                                                        "fields": null
                                                    },
                                                    {
                                                        "rowType": "flex",
                                                        "className": "subgroup-card interval-group",
                                                        "title": "Extra Information:",
                                                        "description": "This fields are in a flex row wich may break line according to viewport width",
                                                        "fields": {
                                                            "groupIntervalBegin": {
                                                                "type": "input",
                                                                "className": "input-field begin",
                                                                "label": "Group interval begin",
                                                                "disabled": false,
                                                                "placeHolder": "Enter the initial value",
                                                                "requiredMark": true,
                                                                "value": null,
                                                                "errorMessage": null,
                                                                "regExInput": "^[0-9]{1,10}$"
                                                            },
                                                            "groupIntervalEnd": {
                                                                "type": "input",
                                                                "className": "input-field end",
                                                                "label": "Group interval end",
                                                                "disabled": false,
                                                                "placeHolder": "Enter the final value",
                                                                "requiredMark": true,
                                                                "value": null,
                                                                "errorMessage": null,
                                                                "regExInput": "^[0-9]{1,10}$"
                                                            },
                                                            "groupDescription": {
                                                                "type": "input",
                                                                "className": "input-field description",
                                                                "label": "Group Description (up to 100 chars)",
                                                                "disabled": false,
                                                                "placeHolder": "Enter a description",
                                                                "requiredMark": false,
                                                                "value": null,
                                                                "errorMessage": null,
                                                                "regExInput": "^[!-;?-~à-úA-ZÀ-Ú ']{1,100}$"
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "groups": [
                                    {
                                        "rowType": "fullwidth",
                                        "className": "group-card highlight-title tomato",
                                        "title": "Second page (single section)",
                                        "description": "This si a single page section",
                                        "fields": {
                                            "simpleTextField": {
                                                "type": "input",
                                                "className": "text-field-1",
                                                "label": "Text Field 1 (up to 10 chars)",
                                                "disabled": false,
                                                "placeHolder": "Enter some text",
                                                "requiredMark": false,
                                                "value": null,
                                                "errorMessage": null,
                                                "regExInput": "^[!-;?-~à-úA-ZÀ-Ú ']{1,10}$"
                                            }
                                        }
                                    }
                                ]
                            }        
                        ]
                    }
                    
                }
                fields={fields}
                page={currPage}
                className="main-form form-content"
                resetFieldsOnPageChange={false}
                throwErrorOnInvalidFieldType={false}
                throwErrorOnInvalidCustomRender={false}
                onChange={_handleFormUpdate} 
            />
            }
        </div>
    )
}

export default Demo1;
