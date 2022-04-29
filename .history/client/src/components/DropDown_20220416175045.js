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

console.log(namess);
const namess = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];



  return (
    <div>
      <Select options={namess}  />
    </div>
  );

}
export default DropDown;