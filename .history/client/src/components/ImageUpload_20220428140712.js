import api from '../service';
import React, { Component, useState, useEffect , useRef} from 'react';
function ImageUpload() {
    

    const [img, setImg] = useState('null');

   

    console.log(img.name);
      const uploadHandler = () => {
      const a=img.name;
       api.post('/file-upload', a)
       .then((r) => {
        console.log("wadii");
    })
       .catch((err) => {
        const message = err.response.data
        alert(message);
    })
      }
    return (
        <div>
            <input type="file" onChange={(e) => {
                        setImg(e.target.files[0])
                    }
                    } />
            <button onClick={uploadHandler}>Upload!</button>
        </div>
    )

}
export default ImageUpload;