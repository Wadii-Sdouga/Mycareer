import Select from "react-dropdown-select";
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

console.log(names);







  return (
    <div>
      <Select options={names} onChange={(values) => this.setValues(values)} />
    </div>
  );

}
export default DropDown;