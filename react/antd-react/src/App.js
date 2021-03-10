import React from 'react';
import "antd/dist/antd"
import HocPage from  "./decorators"
import FormPage from "./formpage"
import MyForm from "./myform"
import Dialog from "./dialog"
import Tree from "./treePage"
import  Pure from "./pureCompoent"
function App() {
  return (
    <div className="App">
      {/* <HocPage></HocPage> */}
      {/* <FormPage></FormPage> */}
      {/* <MyForm></MyForm> */}
      {/* <Dialog></Dialog> */}
      {/* <Tree></Tree> */}
      <Pure></Pure>
    </div>
  );
}

export default App;
