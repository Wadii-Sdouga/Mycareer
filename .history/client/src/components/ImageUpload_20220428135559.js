import api from '../service';
import React, { Component, useState, useEffect , useRef} from 'react';
function ImageUpload() {
    

    const [img, setImg] = useState('null');

   

    console.log(img);
      const uploadHandler = () => {
        const formData = new FormData()
        formData.append(
          'myFile',
        img.selectedFile,
        img.selectedFile.name
        )

       api.post('/file-upload', {formData :formData})
      }
    return (
        <div>
            <input type="file"    onChange={(e) => {
                        setImg(target.files[0] )
                    }
                    } />
            <button onClick={uploadHandler}>Upload!</button>
        </div>
    )

}
export default ImageUpload;