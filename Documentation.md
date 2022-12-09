# **Forms Builder**

**Author:** Daniel da Silva Jegorschki Santos (https://github.com/dsjsantos)<br />
**Date:** August 2020<br />
**Description:** A JSON based forms builder react component that renders and control a web form based on JSON configuration file.
<br />
<br />

## ***Documentation:***

### **1) Call:**

    <FormBuilder {...props} />

* *props:*

    * config: (Required) form configurarion JSON object as explained on section *2* below. You should avoid repeat field name/key in configuration file. Different fields (even in different pages, different groups or nested) with same name/key will share the same basic state properties ('value', 'errorMessage', 'disabled').

    * onChange: (Required) callback for fields value changes for parent control and treatment. If it were trigger by a field update the function will receive parameters as follows:

        - 'fields': (Always) it an object where each key represents a form field and points to an object with its current state ('value', 'errorMessage', 'disabled').
        - 'name': (Only on field update) if triggered by a field update it contains the changed field name.
        - 'value': (Only on field update) if triggered by a field update it contains its new value.
        - 'optional1', 'optional2', ...: (Optional for custom components) these are an extra parameters that may be used in custom components to pass extra parameters when a field update is triggered. See render time 'onChange' property.<br/><br/>

        > e.g.: (fields, name, value, extra1) => { this.setState({ fields: fields }) }

    * fields: (Optional) if informed, it generaly should refflect the internal component state (same object received on 'onChange' method call). This object contains the main form fields current state ('value', 'errorMessage', 'disabled'). If, on a render, it differs from the internal's component state it will replace it and triggers the 'onChange'. If set, this object will overrides the field's 3 (three) namesake properties. This property is necessary only when you need to control the properties 'value', 'errorMessage' or 'disabled' from a form's field otherwise you may leave it unset.

        ```
        {
            field_name: {
                value: "",
                erroMessage: "",
                disabled: ""
            }
        }
        ```

        > The component makes a deep comparison in order to to check if the fields state has chenged. See 'blockFieldUpdate' if you what to control when to update.

    * blockFieldUpdate: (Optional) [true | false] if true the component internal fields state ('value', 'errorMessage', 'disabled') won't be changed when 'fields' property where changed. *(default is false)*. You may use it to control when to change the internal component fields state.

    * disableClearErrorOnFieldChange: (Optional) [true | false] if true the field error message won't be cleaned when changing field vaule. *(default is false)*. In other words it changes the default component behavior to clean the field error message when its value is changed.

    * page: (Optional) page to be rendered. *(default is the first page: 0)*.

    * id: (Optional) it's the element id for the component root element.

    * rootAsForm: (Optional) [true | false] if true, the component root element will be a <form></form> element, otherwise the root element will be a <div></div> *(default is false)*

    * name: (Optional) it's the <form></form> element name if 'rootAsForm' were true, otherwise will be ignored.

    * className: (Optional) it is the CSS class for the component root element.

    * resetFieldsOnPageChange: (Optional) [true | false] if true each page is considered a new form, reseting all fields values on each page change. In this unique scenario you may repeat field name/key in different pages without beeing considered the same field. *(default is false)*

    * throwErrorOnInvalidFieldType: (Optional) [true | false] if true the componente will throw an error if the confirg file has a field with invalid type set. Otherwise a console.error will be printed. *(default is true)*
    
    * throwErrorOnInvalidCustomRender: (Optional) [true | false] if true the componente will throw an error if a invalid component render funtion were set some how. Otherwise a console.error will be printed. *(default is true)*
    
    * overrideFieldRender: (Optional) object where the properties that match the field types (except: 'custom' and 'none'), and are a function will be used as an override render function of that component. See 'throwErrorOnInvalidCustomRender' in case of invalid function were set.

        ```
        overrideFieldRender={{
            "checkbox": (props) => <div>Checkbox: {props.id}</div>,
            "radio-group": (props) => <div>Radio Group: {props.id}</div>,
            "dropdown": (props) => <div>Dropdown: {props.id}</div>,
            "input": (props) => <div>Input: {props.id}</div>,
            "textarea": (props) => <div>Textarea: {props.id}</div>
        }}
        ```

        You also may override the default support fields: 'counter' and 'required-mark' but not if used with custom components. If you want a 'counter' or 'required-mark' component for you custom component you may use the offered ones or create your own and use it directly.

        ```
        overrideFieldRender={{
            "counter": (props) => <div>Conter: {props.id}</div>,
            "required-mark": (props) => <span>*Required*</span>
        }}
        ```

    * customComponents: (Optional) object were each property must be a function to be used as a component render for a field with a "custom" type. It's an alternative, with lower priority, way to set fields's component property in config object through 'setConfigFieldCustomComponent' function. See 'throwErrorOnInvalidCustomRender' in case of invalid function were set.

        ```
        import SampleCustomComponent from './sampleCustomComponent.js';
        .
        .
        .       
        customComponents={{
            customField1: SampleCustomComponent,
            customField2: SampleCustomComponent,
            customField3: SampleCustomComponent,
            customField4: SampleCustomComponent
        }}
        ```

### **2) Form configuration object:**

JSON object with a property 'pages' witch is an array of objects. Each one of these must contains a property groups, witch is an array  of 'group objects':

```
{
    pages: [
        {
            groups: [
                { <group_object_properties_1> },
                { <group_object_properties_2> },
                ...
                { <group_object_properties_N> }
            ]
        },
        {
            groups: [
                { <group_object_properties_1> },
                { <group_object_properties_2> },
                ...
                { <group_object_properties_N> }
            ]
        },
        ...
    ]
}
```

#### **2.1) Group object:**

A JSON object with its properties.

* *Properties:*

    * render: (Optional) [true | false] indicating if the group should be rendered or not *(default is true)*

    * rowType: (Optional) ['flex' | 'split' | 'fullwidth'] *(default is 'flex')*

        - flex: grid row flex, with elements left aligned and automatic wrapping according to fields sizes.
        
        - split: grid row will be splited in two columns. The fields are distributed from left to right and up to down.
        
        - fullwidth: grid row will use all the available width. The fields are one below the other.

    * className: (Optional) it's the group wrapper element CSS style.
    
    * title: (Optional) group title, rendered inside a selector = 'div._djfb_grid-group-title'.
    
    * description: (Optional) group description, rendered inside a selector = 'div._djfb_grid-group-description'.

    * requiredMarkTitle: (Optional) [true | false] indicates if should be redered a required mark (*FormBuilderSupportFields.RequiredMark*) after the group title label (if it's present). *(default is false)*.

    * requiredMarkDescription: (Optional) [true | false] indicates if should be redered a required mark (*FormBuilderSupportFields.RequiredMark*) after group description (if it's present). *(default value is false)*.

    * fields: (Optional) it's a JSON object where each property is considered as a field and must be a field object. Fields will be rendered inside a selector (div._djfb_grid-group-content). e.g. { fieldName: { 'field object properties' } }

        > **ATTENTION:** If the same 'fieldName' is used (no matter the field nesting depth in the config file or the field type), their basic properties ('values', 'errorMessage' and 'disabled') will be bound. Except if in different page and the component 'resetFieldsOnPageChange' property where set.

* *Group object sample:*
    ```
    {
        render: true,
        rowType: "fullwidth,
        className: "group-sytle",
        title: "Sample title",
        requiredMarkTitle: true,
        description: "Sample description ...",
        fields: {
            fieldName1: { <field_object_properties_1> }
            fieldName2: { <field_object_properties_2> }
            ...
            fieldNameN: { `<field_object_properties_N> }
        }
    }
    ```

#### **2.2) Field object:**

* *Common properties:*
    
    - **General properties:**
    
        These are common to all field types.

        * type: (Required) ["none" | "custom" | "input" | "textarea" | "checkbox" | "dropdown" | "radio-group"].
        
        * render: (Optional) [true | false] indicating if the field should be rendered or not *(default is true)*

        * className: (Optional) field wrapper ('div._djfb_grid-field-wrapper') CSS style selector.

        * value: (Optional) it's initial field value *(default is null)*. Only if component 'fields' property were not set.
        
        * errorMessage: (Optional) it's initial field error message *(default is null)*. Only if component 'fields' property were not set.

        * disabled: (Optional) [true | false] it's indicating if the field is disabled or not *(default is false)*. Only if component 'fields' property were not set.

        * children: (Optional) array of group objects to be rendered as a child nested within field column selector ('div._djfb_grid-field-wrapper > div._djfb_grid-column').

            **ATTENTION:** Remember, if component 'fields' property where set a field state ('values', 'errorMessage' and 'disabled'), event if undefined, in this object have priority over corresponding field property in configuration object.

    - **Type restricted and managed by internal change event properties:**

        These properties are available for a group of field types and it's not passed as property to field's component reder. In fact they are used/controlled by forms builder component internal's change handler.

        * regExInput: (Optional) is a string regular expression to validade the unmasked value (value after applied 'maskRemove/removeMask' function). Keep in mind that this regular expression is not for full filled field, it must acces partial values during field typing. Final validation must be made over the 'fields' object received from component change event.

            > ***field types:** ["input", "textarea", "custom"]*

        * maskAdd: (Optional) is a function to add a mask to unmasked value after its successfully validation.

            > ***field types:** ["input", "custom"]*

        * maskRemove: (Optional) is a function to remove a mask from value before regEx validation. Should be used together with maskAdd.

            > ***field types:** ["input", "custom"]*


* *Field Types:*

    * **'none'**

        In fact its a empty component. Only the grid and container struture will be rendered, applying the indicated class selector and also the children within. It may be used to create a container for dinamic interation or to render children inside a empty parent field group.

        > If you need, you may control the chindren render with field properties. If 'hideChildren' where true and 'value' where not considered a *true value* the children will not be rendered.

    * **'custom'**
        
        Indicates a user custom field. This allows you to create you own custom componet render to be used with the builder.

        This type allows to render a customize external field. The custom component will receive, as properties, all common field properties excluding the builder specific properties (render, type, component). In other words, will receive:

        - name: the field name.
            
        - value: the current field value to be rendered.
        
        - errorMessage: the current field error message to be rendered.
        
        - disabled: the current disable state.
        
        * *Specific properties:*

            - component: the custom component itself. If you have an external JSON configuration, for exemple in file or in a database, you need to set/update this property of custom(s) fields configuration. See 'setConfigFieldCustomComponent' method or 'customComponents' component property. If not set, the custom component will be considered a fragment/empty component.

            - regExInput: (Optional) see type restricted properties.

            - maskAdd: (Optional) see type restricted properties.
            
            - maskRemove: (Optional) see type restricted properties.

            > Besides that it will also receive all other field properties as set on configuration object.

    * **'input'**

        Indicates a input field and use the *(FormBuilderFields.FieldInput)* component as a render unless it were overridden.

        * *Specific properties:*

            - label: (Optional) field label, displayed above the field itself wrapped by 'div.field-label label'. *(default is null)*.

            - placeHolder: (Optional) input placeholder *(default is null)*.

            - isPasswordInput: (Optional) [true | false] indicates if the input is a password field, hiding content *(default is false)*.

            - requiredMark: (Optional) [true | false] indicates if should be redered a required mark (*FormBuilderSupportFields.RequiredMark*) at the end of the field label (if it's present). *(default is false)*.

            - regExInput: (Optional) see type restricted properties.

            - maskAdd: (Optional) see type restricted properties.
            
            - maskRemove: (Optional) see type restricted properties.

    * **'textarea'**
        
        Indicates a text area field and use the *(FormBuilderFields.FieldTextarea)* component as a render unless it were overridden.

        * *Specific properties:*

            - label: (Optional) field label, displayed above the field itself wrapped by 'div.field-label label'. *(default is null)*.

            - placeHolder: (Optional) input placeholder *(default is null)*.

            - requiredMark: (Optional) [true | false] indicates if should be redered a required mark (*FormBuilderSupportFields.RequiredMark*) at the end of the field label (if it's present). *(default is false)*.

            - rows: (Optional) field that indicates de inicial textarea size in rows. If ommited will use default browser configuration.

            - regExInput: (Optional) see type restricted properties.

            - counter: (Optional) field object to configure the counter (*FormBuilderSupportFields.Counter*). *(default is null, and counter is not show)*.

                - top: (Optional) [true | false] indicates to render the counter component above the text area. *(default is false)*

                - bottom: (Optional) [true | false] indicates to render the counter component under the text area. *(default is false)*

                - maxCount: (Required) must be a valid integer greather then 0. It represents the maximum counter number.

                - minCount: (Optional) integer that represents the minimun counter, it's used for styling control to be considered as valid. *(default is 0)*

                    *[ span.count-current.zero | span.count-current.valid | span.count-current.valid ]*

                > 'top' and/or 'bottom' must be true, and 'maxCount' must be a valid integer greather then 0.

                ```
                counter: {
                    top: true,
                    bottom: false,
                    minCount: 10,
                    maxCount: 250
                }
                ```

    * **'checkbox'**

        Indicates a checkbox field and use the *(FormBuilderFields.FieldCheckbox)* component as a render unless it were overridden.

        * *Specific properties:*

            - label: (Optional) field label, displayed just right of check box itself. It is part of component. *(default is null)*.

            - labelBefore: (Optional) [true | false] if true renders the checkbox label before box element *(default is false)*

            - hideChildren: (Optional) [true | false] enable/disable the behavior of show/hide children groups according to checkbox state *(default is false)*

    * **'dropdown'**
        
        Indicates a dropdown field and use the *(FormBuilderFields.FieldDropdown)* component as a render unless it were overridden.

        * *Specific properties:*

            - label: (Optional) field label, displayed above the field itself wrapped by 'div.field-label label'.

            - placeHolder: (Optional) dropdown placeholder *(default is null)*

            - requiredMark: (Optional) [true | false] indicates if should be redered a required mark (*FormBuilderSupportFields.RequiredMark*) at the end of the field label (if it's present). *(default is false)*.

            - options: Its an array of objects with available items. Each object must contain the following properties:
                - key: it's used as react element key property. if ommited in all options the component will assume value, otherwise a react warning will be displayed.
                - value: it's the dropdown value when the option were selected.
                - text: it's the text to be displayed as a item on list.

                e.g:

                ```
                options: [
                    { 
                        "key": "key",
                        "value": "value when selected", 
                        "text": "text to show" 
                    },
                    ...
                ]
                ```

    * **'radio-group'**
        
        Indicates a dropdown field and use the *(FormBuilderFields.FieldRadioGroup)* component as a render unless it were overridden.

        * *Specific properties:*

            - label: (Optional) field label, displayed above the field itself wrapped by 'div.field-label'.

            - labelBefore: (Optional) [true | false] if true renders the all item label before radio element. It can also be applyed to a single item *(default is false)*

            - requiredMark: (Optional) [true | false] indicates if should be redered a required mark (*FormBuilderSupportFields.RequiredMark*) at the end of the field label (if it's present). *(default is false)*.

            - hideChildren: (Optional) [true | false] enable/disable the behavior of show/hide children groups if radio item is selected or not *(default is false)*

            - items: Its a property that consists in a array of object where each one represents a radio button list inside the group.
                
                - label: (Required) it's the input radio label.
                - labelBefore: (Optional) [true | false] if true the item label is rendered before radio element.
                - className: (Optional) it's the input radio CSS class.
                - value: (Required) it's the component value if this radio item were selected.
                - childrenIndex: (Optional) it's an array that contains a list of index of radio-group 'children' to be rendered under that radio item. May be hidden while not selected according to 'hideChildren' radio-group field property.

                ```
                items: [
                    { 
                        label: "Item 1",
                        labelBefore: false,
                        className: "rb-item-1",
                        value: "valor_1",
                        childrenIndex: [0]
                    },
                    ...
                ]
                ```

            - uncheckOnDoubleClick: (Optional) [true | false] indicates if the input radio can be unchecked with double click. *(default is false)*.

            - uncheckOnContextMenu: (Optional) [true | false] indicates if the input radio can be unchecked with context menu (right click). *(default is false)*.


* *Field object sample:*
    ```
    {
        render: true,
        type: "checkbox",
        disabled: false,
        className: "checkbox-field cb-period",
        label: "Choose a period",
        value: false,
        errorMessage: null,
        hideChildren: true,
        children: [
            {
                "rowType": "split",
                "className": "subgroup-period",
                "title": "Period:",
                "description": null,
                "fields": {
                    "startDate": {
                        "type": "input",
                        "disabled": false,
                        "className": "input-field period-from",
                        "placeHolder": "Start date",
                        "value": "",
                        "errorMessage": null,
                        "regExInput": "^([0-1]?\d?|[0-1]\d\/[0-3]?\d?|[0-1]\d\/[0-3]\d\/\d{0,4})$"
                    },
                    "endDate": {
                        "type": "input",
                        "disabled": false,
                        "className": "input-field period-to",
                        "placeHolder": "End date",
                        "value": "",
                        "errorMessage": null,
                        "regExInput": "^([0-1]?\d?|[0-1]\d\/[0-3]?\d?|[0-1]\d\/[0-3]\d\/\d{0,4})$"
                    }
                }
            }
        ]
    }
    ```


### **3) Render time properties:**

This properties aren't expect to be in configuration object but they are create internally and passed as properties to each field render component according to its type.

- id: it's the the field id.

    > ***field types:** All*

- name: it's the the field name.

    > ***field types:** All*

- value: it's the field current value.
    
    > ***field types:** All*

- checked: [true | false] this indicates if the checkbox is checked (true) or not (false). It's a field render time only property and doesn't exist in fields current state object and there you still need to read "value" property.

    > ***field types:** ["checkbox"]*

- errorMessage: it's the field current error message.

    > ***field types:** All*

- disabled: [true | false] it's the current field disabled state.

    > ***field types:** All*

- onChange: function to be called on field value change. This event handler expect two parameters - the event object and an object with integration properties as follows:

    *onChange(event, { name, value, inputRegEx, removeMask, addMask }, optional1, optional2, ...)*

    - event: event object

    - name: (Required) indicates the field name, as in form configuration

    - value: (Required) is the new field value
    
    - inputRegEx: (Optional) same as field configuration property 'regExInput' but at at component level. If present, this one will be used instead of 'regExInput'.
    
    - addMask: (Optional) same as field configuration property 'maskAdd' but at at component level. If present, this one will be used instead of 'maskAdd'.
    
    - removeMask: same as field configuration property 'maskRemove' but at at component level. If present, this one will be used instead of 'maskRemove'.

    - optional1, optional2, ...: (Optional) these are extra optional parameter that your custom component may add to 'onChange' call. All extra optional parameters added will be propagated to main componente 'onChange' call.
    
    See, at Demo 3, the custom component 'CustomDateWithDatePicker'. This custom component uses this 3 (three) extra properties ('inputRegEx', 'addMask', 'removeMask') when call 'onChange'
    
    > ***field types:** All except "checkbox"*

- onToggle: function to be called on checkbox click to toggle it value. This event handler expect the event object as follows:

    *onToggle(event)*

    - event: event object

    > ***field types:** ["checkbox"]*

- renderChild: function to be called to render one of the field's child - entry of 'children' array. This function expect two parameters as follows:

    *renderChild(child, indxChild)* 

    - child: one 'group object' to be rendered.
    
    - indxChild: the index of the current child in children list to be rendered.

    See the following 'FieldRadioGroup' component code snippet that renders specific child from its 'children' property. The render is based on selected radio's 'itemChildrenIndex' property wich is a array of indexes for 'children' to be rendered nested to this radio item. You may see this behavior on 'Demo 1'.

    ```
        ...
        { (!(hideChildren && !isChecked) && children && isArray(children) && renderChild) && 
            itemChildrenIndex.map(childIndx => renderChild(children[childIndx], childIndx)) 
        }
    </Fragment>
    ```

    > ***field types:** All*

- fieldCurrentState: it is a object with the form fields current state. Each key represents one of the form available fields and its value is a object with this field current state ('value', 'errorMessage', 'disabled'). It's may be used to add some behavior to the custom component based on another's field state. (e.g: 'CustomDateWithDatePicker' uses it to implements 'datePicker.maxDateField' and 'datePicker.minDateField' property)

    > ***field types:** All*

### **4) Package exports:**

#### **4.1) Methods:**

* *setConfigFieldProperty(config, fieldList, propertyPath, value)*: This method will update 'config', changing the property denoted by 'propertyPath' within each field in 'fieldList' to the 'value'.

    e.g.: 
    ```
    setConfigFieldProperty(formConfig, ["fieldA", "fieldB"], "label", "My label")
    ```

    This will look for fields 'fieldA' and 'fieldB' in 'formConfig' and, for each one that exists, will set 'label' property to 'My label'.


* *setConfigFieldCustomComponent(config, fieldList, component)*: This method will update all fields in 'fieldList' that exists in 'config', settings changing 'type' property to "custom" and 'component' property to the parameter 'component'. Its equivalent to make two calls to setConfigFieldProperty:

    ```
    setConfigFieldProperty(config, fieldList, "type", "custom");
    setConfigFieldProperty(config, fieldList, "component", component);
    ```

* *getFieldContentClasses(value, errorMessage, disabled)*: this is an auxiliar function to return a list of standard CSS classes mainly used in element with selector '.input-wrapper'.

    - 'has-content': indicates that the field value isn't empty.

    - 'empty': indicates that the field value is empty.

    - 'valid': indicates that the field doesn't contains error message set.

    - 'invalid': indicates that the field contains error message.

    - 'disabled': indicates that the field is disabled

#### **4.2) Constants:**

* FieldType: list of constants of avaiable type of fields: ["none", "custom", "input", "textarea", "checkbox", "dropdown", "radio-group"]

* SupportFieldType: list of constants of avaiable type of support fields: [ "counter", "required-mark" ]

#### **4.3) Components:**

* FormBuilder: (default export) it the main component

* FormBuilderFields: collection of default fields components:

    - FormBuilderFields.FieldCheckbox
    - FormBuilderFields.FieldDropdown
    - FormBuilderFields.FieldInput
    - FormBuilderFields.FieldRadioGroup
    - FormBuilderFields.FieldTextarea

* FormBuilderSupportFields
    
    - FormBuilderSupportFields.Counter: is a support component used in textarea default component (*FormBuilderFields.FieldTextarea*) to renders a component character conter (current/total).

        In textarea default component this counter is rendered whitin 'div.input-wrapper' element and if counter is visible the selector will become 'div.input-wrapper.with-counter'. Nested to it is redered a element 'div.input-counter' contain a the counter itself (current/max). The 'current' &lt;small /> element contains a class according to it's value vs counter parameters:

        - 'count-current.zero': when counter shows "0/MAX".

        - 'count-current.invalid': when current counter is greater then zeron and lower then minCount.

        - 'count-current.valid': when current counter is greater then or equal to minCount.

        See, at Demo 1, an usage example.

    - FormBuilderSupportFields.RequiredMark: it a support component used in different fields and groups as a required mark. If not overriden its basically a selector 'i.field-required-mark' with a '*' inside.

## License

[Apache License v2.0](https://opensource.org/licenses/Apache-2.0)

### Enjoy-it