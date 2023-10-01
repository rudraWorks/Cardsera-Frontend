// RichTextEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import styled from 'styled-components';


const Container = styled.div`
    width:90%;
    background:white;
    max-height:100%;
`

const RichTextEditor = ({back,setBack,isModal}) => {

  const handleChange = (value) => {
    setBack(value)
  };


  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'align'
  ];
 
  return (
      <Container style={isModal?{width:'99%',minHeight:'200px'}:{width:'90%'}}>
        <ReactQuill
          value={back} 
          onChange={handleChange}  
          modules={modules} 
          formats={formats} 
        />
      </Container> 
  );
};

export default RichTextEditor; 
