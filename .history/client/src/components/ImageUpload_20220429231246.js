import api from '../service';
import React, {  useState} from 'react';
function ImageUpload() {
    
const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
 
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

      console.log(file);
 
      const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        console.log(formData);
        try {
          const res = await api.post(
            "/upload",
           {formData}
          );
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      };







/*  <input type="file" onChange={(e) => {
                        setImg(e.target.files[1])
                    }
                    } />
            <button onClick={uploadHandler}>Upload!</button>*/

    /*const [img, setImg] = useState('null');

   

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
      }*/
    return (
        <div>
            <input type="file" onChange={saveFile} />
          <button onClick={uploadFile}>Upload</button>
            
        </div>
    )

}
export default ImageUpload;