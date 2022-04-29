import api from '../service';
import React, {  useState} from 'react';
function ImageUpload() {
    

    const [img, setImg] = useState('null');

   

    console.log(img.name);

      const uploadHandler = () => {
      const a=img.name;
      console.log(a);
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
                        setImg(e.target.files[0])
                    }
                    } />
            <button onClick={uploadHandler}>Upload!</button>
            <img src={img} />
        </div>
    )

}
export default ImageUpload;