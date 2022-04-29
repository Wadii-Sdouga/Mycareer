import api from '../service';
import React, { Component, useState, useEffect , useRef} from 'react';
function ImageUpload() {
    

    const [img, setImg] = useState('null');

   

    console.log(img);
      const uploadHandler = () => {
      
       api.post('/file-upload', {formData :img.selectedFile.name})
      }
    return (
        <div>
            <input type="file"    onChange={(e) => {
                        setImg(e.target.files[0])
                    }
                    } />
            <button onClick={uploadHandler}>Upload!</button>
        </div>
    )

}
export default ImageUpload;