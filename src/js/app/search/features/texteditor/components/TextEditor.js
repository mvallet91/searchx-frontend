import React from 'react';
import { HtmlEditor } from '@aeaton/react-prosemirror'
import { options } from '@aeaton/react-prosemirror-config-default'



const TextEditor = ({ value, onChange }) => (
  <HtmlEditor
    options={options}
    value={value}
    onChange={onChange}
  />
)


export default TextEditor;

