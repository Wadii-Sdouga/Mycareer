import api from '../service';
import React, { Component, useState, useEffect , useRef} from 'react';
function ImageUpload() {
    const state = { selectedFile: null }

    const fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
    }


      const uploadHandler = () => {
        const formData = new FormData()
        formData.append(
          'myFile',
        state.selectedFile,
        state.selectedFile.name
        )
       api.post('/file-upload', {formData :formData})
      }
    return (
        <div>
            <input type="file" onChange={fileChangedHandler} />
            <button onClick={uploadHandler}>Upload!</button>
        </div>
    )

}
export default ImageUpload;