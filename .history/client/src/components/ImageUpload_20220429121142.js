import api from '../service';
import React, {  useState} from 'react';
function ImageUpload() {
    

    const [img, setImg] = useState('null');

   

    console.log(img);

      const uploadHandler = () => {
      const a=img.name;
     
       api.post('http://localhost:5000/fileUpload', {imgName:a} )
       .then(() => {
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
                        setImg(e.target.files[1])
                    }
                    } />
            <button onClick={uploadHandler}>Upload!</button>
            <img src={img.name} />
        </div>
    )

}
export default ImageUpload;