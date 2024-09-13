// formBuilder.d.ts
import * as React from 'react';

import { FormConfiguration } from './formConfiguration.d.ts';

interface FormBuilderProps {
    id?: string | null; // Optional
    config: FormConfiguration; // Required
    onChange: (
        fields: { [key: string]: { value: any; errorMessage: string; disabled: boolean } },
        name?: string | null,
        value?: any | null,
        ...optional: any[]
    ) => void; // Required
    fields?: { 
        [key: string]: { 
            value?: any | null; 
            errorMessage?: string | null; 
            disabled?: boolean | null; 
        } | null; // Propriedade pode ser null
    } | null; // fields pode ser null    
    blockFieldUpdate?: boolean | null; // Optional
    disableClearErrorOnFieldChange?: boolean | null; // Optional
    page?: number | null; // Optional
    rootAsForm?: boolean | null; // Optional
    name?: string | null; // Optional
    className?: string | null; // Optional
    resetFieldsOnPageChange?: boolean | null; // Optional
    throwErrorOnInvalidFieldType?: boolean | null; // Optional
    throwErrorOnInvalidCustomRender?: boolean | null; // Optional
    overrideFieldRender?: { [key: string]: (props: any) => JSX.Element } | null; // Optional
    customComponents?: { [key: string]: React.ComponentType<any> } | null; // Optional
}

/**
 * FormBuilder Component: A JSON-based form builder React component that renders and controls a web form based on a JSON configuration file.
 * See the full documentation [here](https://github.com/dsjsantos/react-dj-forms-builder/blob/master/Documentation.md).
 * 
 * @param {string} [id] - (optional) The element ID for the component's root element.
 * @param {FormConfiguration} config - (required) The form configuration JSON object as explained in the [documentation](https://github.com/dsjsantos/react-dj-forms-builder/blob/master/Documentation.md#2-form-configuration-object).
 * Avoid repeating field names/keys, as fields with the same name will share the same basic state properties ('value', 'errorMessage', 'disabled').
 * @param {function} onChange - (required) Callback triggered when form fields are updated. Receives the current state of fields and, if triggered by a specific field, the field's name and new value.
 * @param {object} [fields] - (optional) The form fields' state. If provided, it will override the internal state and trigger the `onChange` event.
 * @param {boolean} [blockFieldUpdate=false] - (optional) If true, prevents internal field state updates when the `fields` prop changes.
 * @param {boolean} [disableClearErrorOnFieldChange=false] - (optional) If true, the error message will not be cleared when the field's value changes.
 * @param {number} [page=0] - (optional) The page to be rendered (zero-indexed).
 * @param {boolean} [rootAsForm=false] - (optional) If true, the root element will be a `<form>` instead of a `<div>`.
 * @param {string} [name] - (optional) The name of the form if `rootAsForm` is true.
 * @param {string} [className] - (optional) The CSS class for the component's root element.
 * @param {boolean} [resetFieldsOnPageChange=false] - (optional) If true, resets field values when the page changes.
 * @param {boolean} [throwErrorOnInvalidFieldType=true] - (optional) If true, throws an error for invalid field types in the configuration file. Otherwise, logs the error to the console.
 * @param {boolean} [throwErrorOnInvalidCustomRender=true] - (optional) If true, throws an error if an invalid custom render function is set.
 * @param {object} [overrideFieldRender] - (optional) An object where keys represent field types and values are functions to override the field's default rendering.
 * @param {object} [customComponents] - (optional) An object where keys represent custom field types, and values are React components used to render those fields.
 */
declare const FormBuilder: React.FC<FormBuilderProps>;

export default FormBuilder;
