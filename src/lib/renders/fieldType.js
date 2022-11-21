const FIELD_TYPE = {
    NONE: "none", 
    CUSTOM: "custom",
    CHECKBOX: "checkbox",
    DROPDOWN: "dropdown",
    RADIO_GROUP: "radio-group",
    INPUT: "input",
    TEXTAREA: "textarea"
}

const SUPPORT_FIELD_TYPE = {
    COUNTER: "counter", 
    REQUIRED_MARK: "required-mark"
}

const isValidFieldType = (fieldType) => {
    return Object.values(FIELD_TYPE).includes(fieldType);
}

const isValidSupportField = (fieldType) => {
    return Object.values(SUPPORT_FIELD_TYPE).includes(fieldType);
}

export {
    FIELD_TYPE,
    SUPPORT_FIELD_TYPE,
    isValidFieldType,
    isValidSupportField
}