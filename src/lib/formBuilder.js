/*
 * @name: FormBuilder
 * @author: Daniel da Silva Jegorschki Santos (https://github.com/dsjsantos)
 * @date: August 2020
 * @description: A JSON based forms builder react component that renders and control a web form based on JSON configuration file.
*/

import React from 'react';

import { buildGroupsFieldsState, buildGroupsValidation, buildPageFieldsState, buildPageValidation,
        buildCustomFieldComponentsList, buildRenderOverrides, deepCloneObject, isArray, isObject } from './tools';
import { GroupRender } from './renders';


// Import module styles
import './styles/styles.css';

const Wrapper = (props) => {
    return props.rootAsForm ? 
        <form id={props.id} className={props.className} name={props.name}>{props.children}</form> :
        <div id={props.id} className={props.className}>{props.children}</div>;
}

class FormBuilder extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this._buildInitialState(props, props.fields, true);
    }

    _buildInitialState = (props, currFieldsState, pageChanged) => {
        const { overrideFieldRender, customComponents, resetFieldsOnPageChange,
                throwErrorOnInvalidFieldType, throwErrorOnInvalidCustomRender } = props;
        const initState = {};
        initState.overrideRenders = buildRenderOverrides(overrideFieldRender, throwErrorOnInvalidCustomRender);
        initState.customRenders = buildCustomFieldComponentsList(customComponents, throwErrorOnInvalidCustomRender);
        if(resetFieldsOnPageChange) {
            const groupConfig = this._getCurrentPageGroupsConfig();
            initState.fieldsValidations = buildGroupsValidation(groupConfig, throwErrorOnInvalidFieldType);
            initState.fields = !pageChanged ? currFieldsState : buildGroupsFieldsState(groupConfig, throwErrorOnInvalidFieldType);
            initState.fieldsUpdated = pageChanged ? true : false;
        } else {
            const pagesConfig = this._getPagesConfig();
            const newPageFieldsState = buildPageFieldsState(pagesConfig, throwErrorOnInvalidFieldType);
            const currFields = isObject(currFieldsState) ? Object.assign({}, currFieldsState) : {};
            const fieldsToAdd = Object.keys(newPageFieldsState).filter(key => !currFields[key]);
            initState.fieldsValidations = buildPageValidation(pagesConfig, throwErrorOnInvalidFieldType);
            initState.fields = Object.assign({}, newPageFieldsState, currFields);
            initState.fieldsUpdated = fieldsToAdd.length > 0 ? true : false;
        }
        return initState;
    }

    _getCurrentPageGroupsConfig = () => {
        const pagesConfig = this._getPagesConfig();
        const page = this.props.page ? this.props.page : 0;
        if(!pagesConfig[page] || !isArray(pagesConfig[page].groups)) {
            console.error(`'config.pages[${page}].groups' property is missing or invalid.`);
            return [];
        }
        return pagesConfig[page].groups;
    }

    _getPagesConfig = () => {
        const formConfig = this.props.config;
        if(!formConfig) {
            throw new Error(`Missing 'config' property object.`);
        }
        if(!isArray(formConfig.pages)) {
            throw new Error(`The 'config.pages' property is missing or invalid.`);
        }
        return formConfig.pages;
    }

    _handleChange = (e, { name, value, inputRegEx, removeMask, addMask }, ...arrExtra) => {
        if(e) {
            e.stopPropagation();
        }

        // Once React PureComponent implements the shouldComponentUpdate() method with shallow comparison
        // we create a new 'fields' object in order to trigger render when field were changed
        const updateFields = Object.assign({}, this.state.fields);
        if(!updateFields[name]) {
            updateFields[name] = {};
        }

        const isErasing = (value ? value.length : 0) < (updateFields[name].value ? updateFields[name].value.length : 0);
        const validation = this.state.fieldsValidations[name];
        if(validation) {
            if(!inputRegEx && validation.regExInput) {
                inputRegEx = validation.regExInput;
            }
            if(!addMask && validation.maskAdd) {
                addMask = validation.maskAdd;
            }
            if(!removeMask && validation.maskRemove) {
                removeMask = validation.maskRemove;
            }
        }
        const unmasked = removeMask ? removeMask(value) : value;
        const masked = addMask ? addMask(unmasked, isErasing) : unmasked;
        const regExInput = inputRegEx ? new RegExp(inputRegEx) : null;
        if ((masked===updateFields[name].value) || (unmasked && regExInput && !regExInput.test(unmasked))) {
            return;
        }
        updateFields[name].value = masked;
        if(this.props.disableClearErrorOnFieldChange!==true) {
            updateFields[name].errorMessage = null;
        }
        this.setState({ fields: updateFields }, this._updateFields(updateFields, name, value, ...arrExtra));
    }

    _updateFields = (fields, name, value, ...arrExtra) => {
        const fieldCopy = deepCloneObject(fields, {}); // Isolate internal fields object from caller's
        this.props.onChange(fieldCopy, name, value, ...arrExtra);
    }

    _updateOverridesAndValidations = (pageChanged) => {
        const newState = this._buildInitialState(this.props, this.state.fields, pageChanged);
        this.setState({ ...newState });
        if(newState.fieldsUpdated) {
            this._updateFields(newState.fields);
        }
    }

    componentDidMount() {
        this._updateFields(this.state.fields);
    }
    
    componentDidUpdate(prevProps) {
        const { config, fields, page, blockFieldUpdate } = this.props;
        if(prevProps.config!==config || prevProps.page!==page) {
            this._updateOverridesAndValidations(prevProps.page!==page);
        }
        if(blockFieldUpdate!==true && isObject(fields) && JSON.stringify(fields)!==JSON.stringify(this.state.fields)) {
            // Clone object to isolate the internal fields object from caller's (binded to properties)
            this.setState({
                fields: deepCloneObject(fields, {}) 
            });
        }
    }

    render() {
        const { id, className, name, rootAsForm } = this.props;
        const groups = this._getCurrentPageGroupsConfig();
        return(
            <Wrapper id={id} className={className} rootAsForm={rootAsForm} name={name} >
                { groups.map((group, indxGroup) => {
                    if(group.render===false) {
                        return null;
                    }
                    return(
                        <GroupRender
                            key={`key_grp_${indxGroup}`}
                            group={group}
                            isParentGroup={true}
                            fieldControl={{
                                fields: this.state.fields,
                                overrideRenders: this.state.overrideRenders,
                                customRenders: this.state.customRenders
                            }}
                            onChange={this._handleChange}
                        />
                    )
                })}
            </Wrapper>
        )
    }
}

export default FormBuilder;
