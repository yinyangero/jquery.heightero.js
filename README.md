jquery.heightero.js
===================

V 1.0 
2013-07-05

Plugin for jQuery to automatically size height of html elements in a fixed container.

USAGE:

You can tell the plugin to resize the height of elements in an html container like the example below.

    // set the height of containerElem to fix 500px
    $(<containerElem>).height(500); 

    // set the height in percentage
    $(<containerElem>).heightero(
        heightMap : [
            33,
            33,
            34
        ]);

The heightMap param is an array of height for each child of container element. The <containerElem> from example above is an html element with 3 children.

SETTING HEIGHT USING PRECENTAGE:
If you resize using percentage, pass the value in heightMap as numbers:

    $(<containerElem>).heightero(
        heightMap : [
            33,
            33,
            34
        ]);

SETTING HEIGHT USING PX:
To set size of children elements in fix height, use:

    $(<containerElem>).heightero(
        heightMap : [
            '100px',
            '100px',
            '300px'
        ]);

This example will set the height of the children of <containerElem> to 100px, 100px and 300px respectively. Avoid mixing pixels and percentage height or the plugin could behave unexpectedly.

MAKE AN ELEMENT ADJUST TO REST OF SPACE:
To set an element to take the rest of space in a fixed height container, use '*';

    $(<containerElem>).heightero(
        heightMap : [
            '100px',
            '100px',
            '*'
        ]);

This will set the 3rd child of the containerElem to take the rest of space not currently occupied.

MAKE AN ELEMENT ADJUST HEIGHT ACCORDING TO CONTENT:
If you want an element to adjust it's height according to its content, use:

    $(<containerElem>).heightero(
        heightMap : [
            'auto',
            'auto',
            '*'
        ]);

This example tells that the first and second children of <containerElem> should have height that adjusts to their own content while the third child will occupy the rest of the space.

This is my first jquery plugin. I know it is not perfect and all, but I hope this will help someone out there for. I will be glad to know if this plugin helped anyone.

If you have questions and comments, or want to send donations (yes, I am accepting donations), email yinyangero@gmail.com


