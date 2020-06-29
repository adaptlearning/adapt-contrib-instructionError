# adapt-contrib-instructionError  
    
**Instruction Error** is an *extension* which can be installed in the [Adapt framework](https://github.com/adaptlearning/adapt_framework).  
It provides core [*question components*](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#question-components) with the ability to display an error reiterating the question instructions on an invalid submission. The error is configured globally but may take values from the question component.

## Installation

**Instruction Error** can be installed using the [Adapt CLI](https://github.com/adaptlearning/adapt-cli), run the following from the command line:  
`adapt install adapt-contrib-instructionError`

* This extension can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-contrib-instructionError": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **Instruction Error** needs to be installed in the Adapt authoring tool, it may be installed by uploading the zip.

## Settings  

**\_instructionError** (object): The Instruction Error attributes group contains values for **\_isEnabled**, **title** and **body**.

>**\_isEnabled** (boolean):  Turns on and off the **Instruction Error** extension. Can only be set in *course.json*.

>**title** (boolean):  Set the notify title for the instruction error. Can only be set in *course.json*.

>**body** (boolean):  Set the notify body for the instruction error, defaults to the question instruction text. Can only be set in *course.json*.

## Limitations

No known limitations.

----------------------------
**Version number:**  0.1.0   <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a>  
**Framework versions:**  5.5+  
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-tutor/graphs/contributors)  
**Accessibility support:** WAI AA  
**RTL support:** Yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera  
