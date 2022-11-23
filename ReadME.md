# **Forms Builder**

**Author:** Daniel da Silva Jegorschki Santos (https://github.com/dsjsantos)<br />
**Date:** August 2020<br />
**Description:** A JSON based forms builder react component that renders and control a web form based on JSON configuration file.
<br />
<br />

## Installation

```
npm install --save react-dj-forms-builder
```

## Documentation

See component full documentation in [Documentation.md](https://github.com/dsjsantos/react-dj-forms-builder/blob/master/Documentation.md) file.

## Usage

#### Import component into your react project:

```js
import FormBuilder from 'react-dj-forms-builder';
```

#### Use it wherever you need the form redered:

```js
<FormBuilder {...props} />
```

Remember that 'config' and 'onChange' properties are required. See full [documentation](https://github.com/dsjsantos/react-dj-forms-builder/blob/master/Documentation.md) for further information.


## Demo

This project includes a demonstration application under [usage_demo](https://github.com/dsjsantos/react-dj-forms-builder/tree/master/usage_demo) folder. Clone or dowload the project, go into 'usage_demo' folder and run:

```
npm install
```
```
PUBLIC_URL=. npm start
```

## Styles

The required component style sheet is automatically included and there is no need for additional style import. You may customize specific appearence in you application style sheet to fits your needs.

## Code example

The following code shows a simple component usage. First we have a CSS file 'formDemo.css' for a simple customization and a 'fileDemo.js' wich is the demo itself that includes de CSS file.

<br />

#### File: formDemo.css

```css
body {
    margin: 0;
    padding: 1em;
}

.group-card {
    background-color: #ddd;
    padding: 0.75em 1em;
}

.group-card.login-title ._djfb_grid-group-title {
    font-weight: bold;
    margin: -1em -1em 0 -1em;
    padding: 0.5em 1em;
    color: white;
    background-color: darkorange;
}

.group-card ._djfb_grid-group-content {
    margin-top: 0.5em;
}
```

#### File: formDemo.js


```js
import React, { useState } from "react";
import FormBuilder from 'react-dj-forms-builder';

import './formDemo.css';


const formLogin = {
    "pages": [
        {
            "groups": [
                {
                    "rowType": "fullwidth",
                    "className": "group-card login-title",
                    "title": "Login:",
                    "description": null,
                    "requiredMarkTitle": true,
                    "fields": {
                        "username": {
                            "type": "input",
                            "className": "username-field",
                            "label": "Username:",
                            "placeHolder": "Enter your username",
                            "requiredMark": false,
                            "regExInput": "^[a-zA-Z0-9]{1,32}$"
                        },
                        "passphrase": {
                            "type": "input",
                            "className": "passphrase-field",
                            "label": "Password:",
                            "placeHolder": "Enter your password",
                            "isPasswordInput": true,
                            "requiredMark": false
                        }
                    }
                }
            ]
        }
    ]
};

const FormDemo = () => {
    const [ fields, setFields ] = useState(null);

    const _handleFormUpdate = (newFields) => {
        setFields(newFields);
    }

    return(
        <>
            <h1>Exemplo Forms Builder</h1>

            <FormBuilder
                id={"mainFormId"}
                name="mainForm"
                config={formLogin}
                rootAsForm={true}
                fields={null}
                page={0}
                className="main-form"
                onChange={_handleFormUpdate} 
            />

            <button 
                type="button" 
                style={{ marginTop: '2em'}} 
                onClick={() => console.log("Fields:", fields)}>
                Show form current state
            </button>            
        </>
    );
}
export default FormDemo;
```

## Developing

Clone/fork the repository

```sh
npm install
npm run build
```

## Changelogs

#### v1.1.2 (November 23, 2022)
##### Added
- New component properties 'blockFieldUpdate' and 'disableClearErrorOnFieldChange'

##### Fixed
- Change internal fields state changes cheking

#### v1.1.1 (November 22, 2022)
##### Fixed
- "none" field type now renders its children correctly

#### v1.1.0 (November 21, 2022)
- First published version of the component

#### v1.0.0 (August 7, 2020)
- First component version (personal use only)

## License

[Apache License v2.0](https://opensource.org/licenses/Apache-2.0)

