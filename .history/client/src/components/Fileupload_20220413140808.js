import React, { useState, useEffect } from 'react';
import api from '../service';

function FileUpload() {

    const [image, setImage] = useState([]);
    const onSub = async (e) => {
        imgfile = image[0];
        e.preventDefault();
        let res = await api.post("/imgupload", imgfile);
        console.log(res.data);
    }

    return (
        <div className="App">
            <input type="file" name="imgfile" className="form-control" onChange={(e) => setImage(e.target.files)} required />
            <button onClick={onSub}>Upload</button>
        </div>
    );

}

export default FileUpload;