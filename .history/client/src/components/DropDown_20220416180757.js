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

  console.log(namess);

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <Select options={ names } />
      </div>
      <div className="col-md-4"></div>
    </div>
  </div>
  );

}
export default DropDown;