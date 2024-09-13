// formConfiguration.d.ts
import * as React from 'react';


/**
 * Type representing the possible row types in a form group.
 * This type is used to specify the type of group in a GroupObject.
 */
type RowType = 'flex' | 'split' | 'fullwidth';

/**
 * Type representing the possible field types in a form.
 * This type is used to specify the type of field in a FieldObject.
 */
type FieldType = 'none' | 'custom' | 'input' | 'textarea' | 'checkbox' | 'dropdown' | 'radio-group';


/**
 * Represents the configuration object for the FormBuilder component.
 */
interface FormConfiguration {
    /**
     * Array of page objects that represent the pages in the form.
     * 
     * @type {Array<PageObject>}
     */
    pages: Array<PageObject>; // Required
}

/**
 * Represents a page object in the form configuration.
 */
interface PageObject {
    /**
     * Array of group objects that represent the groups on the page.
     * 
     * @type {Array<GroupObject>}
     */
    groups: Array<GroupObject>; // Required
}

/**
 * Represents a group object in the Form configuration.
 */
interface GroupObject {
/** 
 * Indicates if the group should be rendered or not. Defaults to true if not specified. If null, the group will also be considered rendered.
 *
 * @type {boolean | null}
 */
    render?: boolean | null; // Optional, default is true

/**
 * Specifies the layout type for the group.
 * - 'flex': The group will use a flex layout.
 * - 'split': The group will use a split layout.
 * - 'fullwidth': The group will take the full width of its container.
 * Defaults to 'flex' if not specified. If null, the group will also be considered to use 'flex'.
 *
 * @type {RowType | null}
 */
    rowType?: RowType | null; // Optional, default is 'flex'

/**
 * CSS class name to apply to the group.
 *
 * @type {string | null}
 */
    className?: string | null; // Optional

/**
 * Title text for the group.
 * 
 * @type {string | null}
 */
    title?: string | null; // Optional

/**
 * Description text for the group.
 * 
 * @type {string | null}
 */
    description?: string | null; // Optional

/**
 * Indicates if a required mark should be added to the title.
 * 
 * Defaults to false if not specified. If null, the group will also be considered not having a required mark.
 * 
 * @type {boolean | null}
 */
    requiredMarkTitle?: boolean | null; // Optional, default is false

/**
 * Indicates if a required mark should be added to the description.
 * 
 * Defaults to false if not specified. If null, the group will also be considered not having a required mark.
 * 
 * @type {boolean | null}
 */
    requiredMarkDescription?: boolean | null; // Optional, default is false

/**
 * An object where each key represents a field name and the value is the configuration for that field.
 * 
 * @type {{ [key: string]: FieldObject | null } | null}
 */
    fields?: { 
        [key: string]: FieldObject | null; // Optional, can be null or an object with field properties
    } | null; // Optional, can be null
}

/**
 * Represents a field object in the Form configuration.
 */
interface FieldObject {
/**
 * Specifies the type of the field.
 * 
 * - 'none': An empty component, only grid and container structure will be rendered.
 * - 'custom': A custom field component defined by the user. See [documentation](https://github.com/dsjsantos/react-dj-forms-builder/blob/master/Documentation.md#3-render-time-properties) for custom component render function parameters.
 * - 'input': A text input field.
 * - 'textarea': A multiline text input field.
 * - 'checkbox': A checkbox field.
 * - 'dropdown': A dropdown selection field.
 * - 'radio-group': A group of radio buttons.
 * 
 * @type {FieldType}
 */
    type: FieldType; // Required

/**
 * Indicates if the field should be rendered or not.
 * 
 * Defaults to true if not specified. If null, the field will also be considered rendered.
 * 
 * @type {boolean | null}
 */
    render?: boolean | null; // Optional, default is true

/**
 * CSS class name to apply to the field.
 * 
 * @type {string | null}
 */
    className?: string | null; // Optional

/**
 * The value of the field.
 * 
 * Defaults to null if not specified.
 * 
 * @type {any | null}
 */
    value?: any | null; // Optional, default is null

/**
 * Error message to display if the field has an error.
 * 
 * Defaults to null if not specified.
 * 
 * @type {string | null}
 */
    errorMessage?: string | null; // Optional, default is null

/**
 * Indicates if the field is disabled.
 * 
 * Defaults to false if not specified. If null, the field will also be considered enabled.
 * 
 * @type {boolean | null}
 */
    disabled?: boolean | null; // Optional, default is false

/**
 * Array of group objects to be rendered as children of the field.
 * 
 * @type {Array<GroupObject> | null}
 */
    children?: Array<GroupObject> | null; // Optional, can be null or an array of group objects
    
// Specific to certain field types
/**
 * Regular expression for input validation.
 * 
 * Applies to 'input', 'textarea', and 'custom' types.
 * 
 * @type {string | null}
 */
    regExInput?: string | null; // Optional, specific to ['input', 'textarea', 'custom']

/**
 * Function to apply a mask to the field value.
 * 
 * Applies to 'input' and 'custom' types.
 * 
 * @type {((value: any) => any) | null}
 */
    maskAdd?: ((value: any) => any) | null; // Optional, specific to ['input', 'custom']

/**
 * Function to remove a mask from the field value.
 * 
 * Applies to 'input' and 'custom' types.
 * 
 * @type {((value: any) => any) | null}
 */
    maskRemove?: ((value: any) => any) | null; // Optional, specific to ['input', 'custom']

/**
 * Label text for the field.
 * 
 * Applies to 'input', 'checkbox' and 'radio-group' types.
 * 
 * @type {string | null}
 */
    label?: string | null; // Optional, specific to ['input', 'checkbox', 'radio-group']

/**
 * Indicates if the label should be displayed before the field.
 * 
 * Applies to 'checkbox' and 'radio-group' types.
 * 
 * @type {boolean | null}
 */
    labelBefore?: boolean | null; // Optional, specific to ['checkbox', 'radio-group']

/**
 * Indicates if a required mark should be added to the field.
 * 
 * Applies to 'input' and 'radio-group' types.
 * 
 * @type {boolean | null}
 */
    requiredMark?: boolean | null; // Optional, specific to ['input', 'radio-group']

/**
 * Indicates if child fields should be hidden.
 * 
 * Applies to 'checkbox' and 'radio-group' types.
 * 
 * @type {boolean | null}
 */
    hideChildren?: boolean | null; // Optional, specific to ['checkbox', 'radio-group']

/**
 * Placeholder text for the input field.
 * 
 * Applies to 'input' type.
 * 
 * @type {string | null}
 */
    placeHolder?: string | null; // Optional, specific to 'input'

/**
 * Indicates if the input field is of password type.
 * 
 * Applies to 'input' type.
 * 
 * @type {boolean | null}
 */
    isPasswordInput?: boolean | null; // Optional, specific to 'input'

/**
 * Number of rows for the textarea field.
 * 
 * Applies to 'textarea' type.
 * 
 * @type {number | null}
 */
    rows?: number | null; // Optional, specific to 'textarea'

/**
 * Configuration for the character counter of the textarea.
 * 
 * Applies to 'textarea' type.
 * 
 * @type {object | null}
 */
    counter?: {

/**
 * Indicates if the counter should be displayed at the top of the textarea.
 * 
 * @type {boolean | null}
 */
        top?: boolean | null; // Optional, specific to 'textarea counter'

/**
 * Indicates if the counter should be displayed at the bottom of the textarea.
 * 
 * @type {boolean | null}
 */
        bottom?: boolean | null; // Optional, specific to 'textarea counter'

/**
 * Maximum number of characters allowed.
 * 
 * @type {number}
 */
        maxCount: number; // Required, specific to 'textarea counter'

/**
 * Minimum number of characters allowed.
 * 
 * @type {number | null}
 */
        minCount?: number | null; // Optional, specific to 'textarea counter'
    } | null; // Optional, specific to 'textarea'

/**
 * Array of options for the dropdown field.
 * 
 * Each option should have a key and text.
 * 
 * @type {Array<{ key?: string | null; value: string; text: string }> | null}
 */
    options?: Array<{

/**
 * Key of the option.
 * 
 * @type {string | null}
 */
        key?: string | null; // Optional, specific to 'dropdown item'

/**
 * Value of the option.
 * 
 * @type {string}
 */
        value: string; // Required, specific to 'dropdown item'

/**
 * Display text of the option.
 * 
 * @type {string}
 */
        text: string; // Required, specific to 'dropdown item'
    }> | null; // Optional, specific to 'dropdown item'

/**
 * Array of items in the radio group.
 * 
 * Each item should have a label and value.
 * 
 * @type {Array<{ label: string; labelBefore?: boolean | null; className?: string | null; value: string; childrenIndex?: Array<number> | null }> | null}
 */
    items?: Array<{

/**
 * Label text for the radio button item.
 * 
 * @type {string}
 */
        label: string; // Required, specific to 'radio-group item'

/**
 * Indicates if the label should be displayed before the radio option/item.
 * 
 * @type {boolean | null}
 */
        labelBefore?: boolean | null; // Optional, specific to 'radio-group item'

/**
 * CSS class name to apply to the radio button item.
 * 
 * @type {string | null}
 */
        className?: string | null; // Optional, specific to 'radio-group item'

/**
 * Value of the radio button item.
 * 
 * @type {string}
 */
        value: string; // Required, specific to 'radio-group item'

/**
 * Array of indices for children elements associated with this radio button item.
 * 
 * @type {Array<number> | null}
 */
        childrenIndex?: Array<number> | null; // Optional, specific to 'radio-group item'
    }> | null; // Optional, specific to 'radio-group' item

/**
 * Indicates if the radio button item should be unchecked on double-click.
 * 
 * Applies to 'radio-group' type.
 * 
 * @type {boolean | null}
 */
    uncheckOnDoubleClick?: boolean | null; // Optional, specific to 'radio-group item'

/**
 * Indicates if the radio button item should be unchecked on right-click (context menu).
 * 
 * Applies to 'radio-group' type.
 * 
 * @type {boolean | null}
 */
    uncheckOnContextMenu?: boolean | null; // Optional, specific to 'radio-group item'
}

export {
    RowType,
    FieldType,
    FormConfiguration,
    PageObject,
    GroupObject,
    FieldObject
}
