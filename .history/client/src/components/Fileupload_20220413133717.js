import React, { useState, useEffect } from 'react';
import api from '../service';
 
function FileUpload(){
 
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
 
      const saveFile = (e) => {
          console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
 
      const uploadFile = async (e) => {
        const formData = new FormData();
        console.log(fileName);
        try {
          const res = await api.post("/upload",
            file,
            fileName
          );
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      };
 
      return (
        <div className="App">
          <input type="file" onChange={saveFile} />
          <button onClick={uploadFile}>Upload</button>
        </div>
      );
    
}
 
export default FileUpload;