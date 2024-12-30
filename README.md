# React Sorcerer Take Home Test

## Assignment

You need to create an editor using Draft.js within ReactJS with the following specifications:

- There are three main components in the layout: Title, Button and Editor
    
    ![image](https://github.com/user-attachments/assets/21e2b16e-7fa6-41e3-a24d-e6b570275cc1)

    
- The editor needs to be written in Draft.js
    - Typing `#` as the first string in a line & pressing space should make anything you type afterwards on the same line be in a “Heading” format. On pressing space the aforementioned `#` should disappear.
        - See “This is a heading” line in the layout image above.
    - Similarly, typing `*` as the first string in a line and pressing space should correspond to “bold” format
    - `**` and space = red line
    - `***` and space = underline
- Pressing `Save` button should persist everything typed in the editor into `localstorage`. On refreshing the page,  the saved info should be refilled into the editor.

## Instructions:

- On completion
    - Please deploy this to [CodeSandbox](https://www.codesandbox.io/)
    - Please fill the following Google Form and submit the test: https://forms.gle/V8F1hf68cJEN8kAM9
        - Please keep your repo for this assignment public.
    - Please dont forget to add the instructions to run your code on a local machine
    - There is no deadline for this assignment. First come first serve.
