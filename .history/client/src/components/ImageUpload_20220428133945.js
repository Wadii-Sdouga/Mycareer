import api from '../service';
import React, { Component, useState, useEffect , useRef} from 'react';
function ImageUpload() {
    state = { selectedFile: null }

    fileChangedHandler = event => {
      this.setState({ selectedFile: event.target.files[0] })
    }
    
    uploadHandler = () => {
      console.log(this.state.selectedFile)
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0]
      }
      

    uploadHandler = () => {
        const formData = new FormData()
        formData.append(
          'myFile',
          this.state.selectedFile,
          this.state.selectedFile.name
        )
       api.post('/file-upload', {formData :formData})
      }
    return (
        <div>
            <input type="file" onChange={this.fileChangedHandler} />
            <button onClick={this.uploadHandler}>Upload!</button>
        </div>
    )

}
export default ImageUpload;