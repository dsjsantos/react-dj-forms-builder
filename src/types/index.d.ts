// index.d.ts
import * as React from 'react';

import { FormConfiguration } from './formConfiguration.d.ts';

import FormBuilder from './formBuilder.js'
import { FieldType } from './lib/renders';
import { SupportFieldType } from './lib/renders';
import { getFieldContentClasses } from './lib/tools';
import { setConfigFieldProperty } from './lib/tools';
import { setConfigFieldCustomComponent } from './lib/tools';
import { FieldCheckbox } from './lib/fields';
import { FieldDropdown } from './lib/fields';
import { FieldInput } from './lib/fields';
import { FieldRadioGroup } from './lib/fields';
import { FieldTextarea } from './lib/fields';
import { Counter } from './lib/fields';
import { RequiredMark } from './lib/fields';

// Function declarations
/**
 * Updates the specified property of fields within the configuration.
 * 
 * This method will update the 'config', changing the property denoted by 'propertyPath'
 * within each field in 'fieldList' to the 'value'.
 * 
 * @param {FormConfiguration} config - The configuration object containing the fields to update.
 * @param {string[]} fieldList - An array of field names to update within the config.
 * @param {string} propertyPath - The property path to update in the fields.
 * @param {any} value - The new value to set for the specified property.
 * 
 * @example
 * setConfigFieldProperty(formConfig, ["fieldA", "fieldB"], "label", "My label");
 * // This will set the 'label' property of fields 'fieldA' and 'fieldB' to 'My label' in formConfig.
 */
declare function setConfigFieldProperty(config: FormConfiguration, fieldList: string[], propertyPath: string, value: any): void;

/**
 * Updates the type and component properties of specified fields to custom type.
 * 
 * This method will update all fields in 'fieldList' that exist in 'config', setting
 * the 'type' property to "custom" and the 'component' property to the specified 'component'.
 * This is equivalent to making two calls to setConfigFieldProperty:
 * 
 * @param {FormConfiguration} config - The configuration object containing the fields to update.
 * @param {string[]} fieldList - An array of field names to update within the config.
 * @param {React.ComponentType<any>} component - The new component to set for the fields.
 * 
 * @example
 * setConfigFieldCustomComponent(formConfig, ["fieldA", "fieldB"], CustomComponent);
 * // This will set the 'type' property to 'custom' and 'component' property to CustomComponent for fields 'fieldA' and 'fieldB'.
 */
declare function setConfigFieldCustomComponent(config: FormConfiguration, fieldList: string[], component: React.ComponentType<any>): void;

/**
 * Returns a list of standard CSS classes for a field based on its state.
 * 
 * This function is an auxiliary helper to return CSS classes mainly used in elements
 * with the selector '.input-wrapper'. The classes indicate the state of the field:
 * 
 * - 'has-content': indicates that the field value isn't empty.
 * - 'empty': indicates that the field value is empty.
 * - 'valid': indicates that the field doesn't contain an error message.
 * - 'invalid': indicates that the field contains an error message.
 * - 'disabled': indicates that the field is disabled.
 * 
 * @param {any} value - The value of the field.
 * @param {string | null} errorMessage - The error message associated with the field, if any.
 * @param {boolean | null} disabled - Indicates if the field is disabled.
 * 
 * @returns {string[]} - An array of CSS class names based on the field state.
 */
declare function getFieldContentClasses(value: any, errorMessage: string | null, disabled: boolean | null): string[];

// Export modules
export default FormBuilder;
export namespace FormBuilderFields {
    export { FieldCheckbox };
    export { FieldDropdown };
    export { FieldInput };
    export { FieldRadioGroup };
    export { FieldTextarea };
}
export namespace FormBuilderSupportFields {
    export { Counter };
    export { RequiredMark };
}
export { 
    FormBuilder,
    FieldType,
    SupportFieldType,
    getFieldContentClasses,
    setConfigFieldProperty,
    setConfigFieldCustomComponent
};
