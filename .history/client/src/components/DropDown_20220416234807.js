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






  return (
    <div className="form-group">
    
    <select
      className="form-control w-auto"
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