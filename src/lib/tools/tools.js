import { isValidFieldType, isValidSupportField } from '../renders';

const _emptyToNull = value => value ? value : null;

const _unsupportedFieldType = (fieldType, fieldName, throwErrorOnInvalidFieldType) => {
    const message = `Unsupported field type: '${fieldType}' in field: '${fieldName}'`;
    if(throwErrorOnInvalidFieldType!==false) {
        throw new Error(message);
    } else {
        console.error(message);
    }
}

const buildCustomFieldComponentsList = (customFields, throwErrorOnInvalidCustomRender) => {
    if(!isObject(customFields)) {
        return {};
    }
    const customFieldComponents = Object.assign({}, customFields);
    Object.keys(customFields).forEach(key => {
        if(!isFunction(customFieldComponents[key])) {
            const message = `Invalid custom field function for field: '${key}'`;
            if(throwErrorOnInvalidCustomRender!==false) {
                throw new Error(message);
            } else {
                console.error(message);
                delete customFieldComponents[key];
            }
        }
    });    

    return customFieldComponents;
}

const buildFieldsState = (fieldList, throwErrorOnInvalidFieldType) => {
    let fieldsState = {};
    if(isObject(fieldList)) {
        Object.keys(fieldList).forEach(key => {
            const fieldType = toLower(fieldList[key].type);
            if(isValidFieldType(fieldType)) {
                fieldsState[key] = {};
                fieldsState[key].value = _emptyToNull(fieldList[key].value);
                fieldsState[key].errorMessage = _emptyToNull(fieldList[key].errorMessage);
                fieldsState[key].disabled = _emptyToNull(fieldList[key].disabled);
                if(isArray(fieldList[key].children)) {
                    Object.assign(fieldsState, buildGroupsFieldsState(fieldList[key].children, throwErrorOnInvalidFieldType));
                }
            } else {
                _unsupportedFieldType(fieldType, key, throwErrorOnInvalidFieldType);
            }
        });
    }
    return fieldsState;
}

const buildFieldsValidaton = (fieldList, throwErrorOnInvalidFieldType) => {
    let validation = {};
    if(isObject(fieldList)) {
        Object.keys(fieldList).forEach(key => {
            const fieldType = toLower(fieldList[key].type);
            if(isValidFieldType(fieldType)) {
                validation[key] = {};
                validation[key].regExInput = ["input", "textarea", "custom"].includes(fieldType) && fieldList[key].regExInput ? fieldList[key].regExInput : null;
                validation[key].maskAdd = ["input", "custom"].includes(fieldType) && fieldList[key].maskAdd ? fieldList[key].maskAdd : null;
                validation[key].maskRemove = ["input", "custom"].includes(fieldType) && fieldList[key].maskRemove ? fieldList[key].maskRemove : null;
                if(isArray(fieldList[key].children)) {
                    Object.assign(validation, buildGroupsValidation(fieldList[key].children, throwErrorOnInvalidFieldType));
                }
            } else {
                _unsupportedFieldType(fieldType, key, throwErrorOnInvalidFieldType);
            }
        });
    }
    return validation;
}

const buildGroupsFieldsState = (groupList, throwErrorOnInvalidFieldType) => {
    let fieldsState = {};
    groupList.forEach(grp => {
        Object.assign(fieldsState, buildFieldsState(grp.fields, throwErrorOnInvalidFieldType));
    });
    return fieldsState;
}

const buildGroupsValidation = (groupList, throwErrorOnInvalidFieldType) => {
    let validation = {};
    groupList.forEach(grp => {
        Object.assign(validation, buildFieldsValidaton(grp.fields, throwErrorOnInvalidFieldType));
    });
    return validation;
}

const buildPageFieldsState = (pageList, throwErrorOnInvalidFieldType) => {
    let fieldsState = {};
    pageList.forEach(pg => {
        Object.assign(fieldsState, buildGroupsFieldsState(pg.groups, throwErrorOnInvalidFieldType));
    });
    return fieldsState;
}

const buildPageValidation = (pageList, throwErrorOnInvalidFieldType) => {
    let validation = {};
    pageList.forEach(pg => {
        Object.assign(validation, buildGroupsValidation(pg.groups, throwErrorOnInvalidFieldType));
    });
    return validation;
}

const buildRenderOverrides = (overrides, throwErrorOnInvalidCustomRender) => {
    if(!isObject(overrides)) {
        return {};
    }
    const renderOverrides = Object.assign({}, overrides);
    Object.keys(overrides).forEach(key => {
        const allowed = (isValidFieldType(key) && !["none", "custom"].includes(key)) || isValidSupportField(key);
        if(!allowed) {
            console.error(`Unable to override a render for an non-existent or non-overridable field type: '${key}'`);
            delete renderOverrides[key];
        } else {
            if(!isFunction(renderOverrides[key])) {
                const message = `Invalid override function for field type: '${key}'`;
                if(throwErrorOnInvalidCustomRender!==false) {
                    throw new Error(message);
                } else {
                    console.error(message);
                    delete renderOverrides[key];
                }
            }
        }
    });    

    return renderOverrides;
}

const deepCloneObject = (obj, defaultValue) => {
    return isObject(obj) ? JSON.parse(JSON.stringify(obj)) : defaultValue;
}

const getFieldContentClasses = (value, errorMessage, disabled) => {
    let classes = "";
    classes += value ? 'has-content' : 'empty';
    classes += errorMessage ? ' invalid' : ' valid';
    classes += disabled ? ' disabled' : '';
    return classes;
}

const isArray = (arr) => {
    return arr && arr.constructor===Array;
}

const isFunction = (func) => {
    return func && func.constructor && func.call && func.apply &&
        (typeof func === 'function') && ({}.toString.call(func) === "[object Function]");
}

const isInteger = (value) => {
    return Number.isInteger ? Number.isInteger(value) : (typeof value==="number" && Math.floor(value)===value);
}

const isObject = (obj) => {
    return obj && obj.constructor===Object;
}

const isString = (value) => {
    return typeof value==='string' || value instanceof String;
}

const toLower = (str) => {
    return str ? str.toLowerCase() : null;
}

const setConfigFieldProperty = (config, fieldList, propertyPath, value) => {
    const setPropertyByPath = (object, path, value) => {
        if(isString(path) && path.trim().length) {
            const pathParts = path.trim().split('.');
            let ref = object;
            while(pathParts.length>1) {
                const pname = pathParts.shift();
                if(!isObject(ref[pname])) {
                    ref[pname] = {};
                }
                ref = ref[pname];
            }
            ref[pathParts.shift()] = value;
        }
    }
    
    const proccessGroups = (groups, fieldList, propertyPath, value, previousPath) => {
        if(groups.constructor !== Array) {
            throw new Error("[setConfigFieldProperty] Invalid group/children at path: " + previousPath + ".");
        }

        let count = 0;
        groups.forEach((group, indxGroup) => {
            const fields = group.fields;
            const path = previousPath + ":" + indxGroup;
            if(fields) {
                if(fields.constructor !== Object) {
                    throw new Error("[setConfigFieldProperty] Invalid config file at group/children path: " + path + ".");
                }
                fieldList.forEach(fieldName => {
                    if(fields[fieldName]) {
                        setPropertyByPath(fields[fieldName], propertyPath, value);
                        count++;
                    }
                });

                Object.keys(fields).forEach(fieldKey => {
                    const field = fields[fieldKey];
                    const newPath = path + "[" + fieldKey + "]";
                    if(field.children) {
                        count += proccessGroups(field.children, fieldList, propertyPath, value, newPath);
                    }
                });
            }
        });

        return count;
    }

    if(!config || !config.pages || config.pages.constructor!==Array) {
        throw new Error("[setConfigFieldProperty] Invalid or inexistent pages property on config file.");
    }
    if(!fieldList || fieldList.constructor!==Array) {
        throw new Error("[setConfigFieldProperty] filedList must be an array");
    }

    let countChanges = 0;
    config.pages.forEach((page, indxPage) => {
        const groups = page.groups;
        if(!groups || groups.constructor!==Array) {
            throw new Error("[setConfigFieldProperty] Invalid or inexistent groups property on page (" + indxPage + ").");
        }
        countChanges += proccessGroups(groups, fieldList, propertyPath, value, "root");
    });

    return countChanges;
}

const setConfigFieldCustomComponent = (config, fieldList, component) => {
    setConfigFieldProperty(config, fieldList, "type", "custom");
    setConfigFieldProperty(config, fieldList, "component", component);
}

export {
    buildCustomFieldComponentsList,
    buildGroupsFieldsState,
    buildGroupsValidation,
    buildPageFieldsState,
    buildPageValidation,
    buildRenderOverrides,
    deepCloneObject,
    getFieldContentClasses,
    isArray,
    isFunction,
    isInteger,
    isObject,
    isString,
    toLower,
    setConfigFieldProperty,
    setConfigFieldCustomComponent
}
