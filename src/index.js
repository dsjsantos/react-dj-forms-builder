import { getFieldContentClasses, setConfigFieldProperty, setConfigFieldCustomComponent } from './lib/tools';
import { FieldType, SupportFieldType } from './lib/renders';
import { FieldCheckbox, FieldDropdown, FieldInput, FieldRadioGroup, FieldTextarea, Counter, RequiredMark } from './lib/fields';
const FormBuilderFields = { FieldCheckbox, FieldDropdown, FieldInput, FieldRadioGroup, FieldTextarea };
const FormBuilderSupportFields = { Counter, RequiredMark };

const FormBuilder = require('./lib/formBuilder.js').default;

export {
    FormBuilder,
    FormBuilderFields,
    FormBuilderSupportFields,
    FieldType,
    SupportFieldType,
    getFieldContentClasses,
    setConfigFieldProperty,
    setConfigFieldCustomComponent
}

export default FormBuilder;
