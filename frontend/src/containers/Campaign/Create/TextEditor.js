// TextEditor.tsx
import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import EditorWrapper from '@iso/components/uielements/styles/editor.style'


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }, { font: [] }], 
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "code"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code"
]

export default function TextEditor  ({ value, onChange, placeholder }) {
  return (
    <>
    <EditorWrapper>
      <ReactQuill
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </EditorWrapper>
    </>
  )
}