import Select from 'react-select';
import api from '../service';
import { useState, useEffect, useRef } from 'react';

function DropDown() {

const [names, setNames] = useState([]);

const getData2 = async () => {
    try {
        const response = await api.get('http://localhost:5000/admin/add/tech');
        setNames(response.data);


    } catch (error) {
        console.log(error);
    }
};


useEffect(() => {
    getData2();

}, []);


{names.map((post, i) => {
    i += 1;
 
       
       var Countries=Countries.append({label:names.titre})
       console.log(Countries);
})}
 

  return (
 
        <Select  />
      
  );

}
export default DropDown;