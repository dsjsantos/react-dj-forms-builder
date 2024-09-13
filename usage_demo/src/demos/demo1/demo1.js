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
                config={formConfig}
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
