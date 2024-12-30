import React, { useEffect, useState } from 'react';
import { 
  Editor, 
  EditorState, 
  RichUtils, 
  convertToRaw, 
  convertFromRaw,
  Modifier,
  ContentState,
  KeyBindingUtil,
  getDefaultKeyBinding
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './EditorComponentStyles.css';

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      const content = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(content));
    }
  }, []);

  const handleKeyCommand = (command, currentState) => {
    const newState = RichUtils.handleKeyCommand(currentState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleChange = (newEditorState) => {
    const selection = newEditorState.getSelection();
    const content = newEditorState.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    const text = block.getText();
    
    // Check if space was just typed
    if (text.endsWith(' ')) {
      let newState = newEditorState;
      const withoutSpace = text.slice(0, -1);
      
      if (withoutSpace === '#') {
        // Remove the # and space
        const newContent = Modifier.replaceText(
          content,
          selection.merge({
            anchorOffset: 0,
            focusOffset: text.length,
          }),
          ''
        );
        newState = EditorState.push(newEditorState, newContent, 'remove-range');
        newState = RichUtils.toggleBlockType(newState, 'header-one');
      } else if (withoutSpace === '*') {
        // Remove the * and space
        const newContent = Modifier.replaceText(
          content,
          selection.merge({
            anchorOffset: 0,
            focusOffset: text.length,
          }),
          ''
        );
        newState = EditorState.push(newEditorState, newContent, 'remove-range');
        newState = RichUtils.toggleInlineStyle(newState, 'BOLD');
      } else if (withoutSpace === '**') {
        // Remove the ** and space
        const newContent = Modifier.replaceText(
          content,
          selection.merge({
            anchorOffset: 0,
            focusOffset: text.length,
          }),
          ''
        );
        newState = EditorState.push(newEditorState, newContent, 'remove-range');
        newState = RichUtils.toggleInlineStyle(newState, 'RED');
      } else if (withoutSpace === '***') {
        // Remove the *** and space
        const newContent = Modifier.replaceText(
          content,
          selection.merge({
            anchorOffset: 0,
            focusOffset: text.length,
          }),
          ''
        );
        newState = EditorState.push(newEditorState, newContent, 'remove-range');
        newState = RichUtils.toggleInlineStyle(newState, 'UNDERLINE');
      }
      
      if (newState !== newEditorState) {
        setEditorState(newState);
        return;
      }
    }
    
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    localStorage.setItem('editorContent', JSON.stringify(rawContent));
  };

    const handleClear = () => {
        setEditorState(EditorState.createEmpty());
      };
      


  const styleMap = {
    RED: {
      color: 'red',
    },
  };

  const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'header-one') {
      return 'header-style';
    }
  };

  return (
    <div className="editor-container">
      <div className='Header'>
      <h1 className="editor-title">Demo editor by &lt;Name&gt;</h1>
      <div>
      <button 
          onClick={handleSave}
          className="save-button"
        >
          Save
        </button>
        <br></br>
        <button 
          onClick={handleClear}
          className="save-button"
        >
          Clear
        </button>
      </div>
        
      </div>
      <div className="editor-wrapper">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          blockStyleFn={blockStyleFn}
        />
      </div>
    </div>
  );
};

export default EditorComponent;