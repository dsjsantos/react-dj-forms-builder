import React from 'react';

import { isFunction, isInteger, isObject, toLower } from '../tools';
import { FieldCheckbox, FieldDropdown, FieldRadioGroup, FieldInput, FieldTextarea, FieldNone } from '../fields';

import ChildRender from './childRender.js';
import { FIELD_TYPE } from './fieldType.js';


const getComponentByFieldType = (fieldType, overrides) => {
    const overrideWithDefault = (type, defaultValue) => overrides && overrides[type] ? overrides[type] : defaultValue;
    switch(fieldType) {
        case FIELD_TYPE.CHECKBOX: return overrideWithDefault(fieldType, FieldCheckbox);
        case FIELD_TYPE.DROPDOWN: return overrideWithDefault(fieldType, FieldDropdown);
        case FIELD_TYPE.RADIO_GROUP: return overrideWithDefault(fieldType, FieldRadioGroup);
        case FIELD_TYPE.INPUT: return overrideWithDefault(fieldType, FieldInput);
        case FIELD_TYPE.TEXTAREA: return overrideWithDefault(fieldType, FieldTextarea);
        case FIELD_TYPE.NONE: return FieldNone;
        default:
            return () => <></>;
    }
}

const getCustomRender = (cr, fld) => cr && isFunction(cr[fld]) ? cr[fld] : () => <></>;

const FieldRender = (props) => {
    const { field, fieldKey, fieldControl, renderGroup, onChange } = props;
    const { value, errorMessage, disabled } = (fieldControl.fields && fieldControl.fields[fieldKey]) || field;
    const fieldType = toLower(field.type);
    const doRenderChild = (child, indxChild) => {
        return (!isObject(child) || !isInteger(indxChild)) ? () => <></> : 
            <ChildRender
                key={`${fieldKey}_group_child_${indxChild}`}
                child={child}
                fieldControl={fieldControl}
                onChange={onChange}
                renderGroup={renderGroup} 
            />;
    }

    const params = Object.assign({}, field);
    delete params.type;
    delete params.render;
    delete params.component;
    params.id = `${fieldKey}_Id`;
    params.name = fieldKey;
    params.disabled = disabled ? true : false;
    params.value = value;
    params.errorMessage = errorMessage;
    params.onChange = onChange;
    params.renderChild = doRenderChild;
    params.fieldCurrentState = Object.assign({}, fieldControl.fields || {});
    params.overrideRenders = [FIELD_TYPE.NONE, FIELD_TYPE.CUSTOM].includes(fieldType) ? {} : fieldControl.overrideRenders;

    if(fieldType===FIELD_TYPE.CHECKBOX) {
        params.checked = value ? true : false;
        params.onToggle = e => onChange(e, { name: params.name, value: !params.checked });
    }

    const fieldCustomRender = isFunction(field.component) ? field.component : getCustomRender(fieldControl.customRenders, fieldKey);
    const ComponentRender = fieldType===FIELD_TYPE.CUSTOM ? fieldCustomRender : getComponentByFieldType(fieldType, fieldControl.overrideRenders);
    return(
        <div className="_djfb_grid-column">
            <ComponentRender {...params} />
        </div>
    )
}

export default FieldRender;
