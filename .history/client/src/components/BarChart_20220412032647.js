import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import api from '../service';


function Barc() {

    const [posts, setPosts] = useState([]);
    const getData = async () => {
        
        try {
            const response = await api.get('http://localhost:5000/barchart');
            setPosts(response.data);
           

        } catch (error) {
         
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    },[]);

    let data=[];
    posts.map((post) => {
        data.push(post);
       
    }
    )

 

    return (
    
    
            <div className=" bardiv">
                <h3 className="section-title"></h3>
               
                <div className="section-content">
                    <ResponsiveContainer width="100%" height={300} >
                        <BarChart data={data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                            <XAxis dataKey="titre" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Nombre_employé" fill="#4c4c96" />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
      
        
    );

}
export default Barc;

