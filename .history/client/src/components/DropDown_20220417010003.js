import Select from 'react-select';
import api from '../service';
import { useState, useEffect, useRef } from 'react';
import { filterProps } from 'recharts/types/util/types';



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
    <div className="form-group">
    
    <select
      className="form-control "
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
  </div>
  );

}
export default DropDown;