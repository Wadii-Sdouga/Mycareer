import api from '../service';
import { useState, useEffect, useRef } from 'react';


const DropDown = (props) => {
 
const [names, setNames] = useState([]);
const [car, setCar] = useState([]);

const getData2 = async () => {
    try {
        const response = await api.get('http://localhost:5000/admin/add/tech');
        setNames(response.data);


    } catch (error) {
        console.log(error);
    }
};

props.func(car);


useEffect(() => {
    getData2();

}, []);

  return (
   
    
    <select
      className="form-control  h-10"
      name='car'

      onChange={(e) => { setCar(e.target.value); }} 
    >
      <option defaultValue>Choisir carriére {names.titre}</option>
      {names.map((item, index) => (
        <option key={index} value={item.titre}>
          {item.titre}
        </option>
      ))}
    </select>
  
  );

}
export default DropDown;