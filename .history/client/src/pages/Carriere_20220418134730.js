import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState, useEffect , useRef} from 'react';
import ReactStars from "react-rating-stars-component";
import api from '../service';
import SideBar from '../components/SideBar';
import DropDown from '../components/DropDown';


function Carriere() {

    const [posts, setPosts] = useState([]);
    const [format, setFormat] = useState('');
    const [rate, setRate] = useState([]);
    const [tech, setTech] = useState([]);
    const [postus, setPostus] = useState([]);
    const curent = useRef([]);

    const pull_data = (data) => {
        setFormat(data); 
    }



    const getData = async () => {
        try {
            const response = await api.get('http://localhost:5000/carriere');
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getData2 = async () => {
        try {
            const response = await api.get('http://localhost:5000/carriere2');
            setPostus(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const submitReview = async (s) => {
        s.preventDefault();
        console.log(format);
        api.post('/carriere', {
            format
        })

            .catch((err) => {
                const message = err.response.data
                alert(message);
            })
    };

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        getData2();
    }, []);
  


    const handleChange = () => {
        

      
        curent.current.map(()=>{
            console.log(curent);
       

        });

        };
   


    return (
 
<div className='row'>
            <div className='d-flex justify-content-md-start'>
                <div className='col-sm-2 pl-0' >
                    <SideBar />
                </div>

                <div className='col pl-0'>
                  

                        <div className="pl-0">
                            {
                                posts.map((post, i) => {
                                    i += 1;
                                    if (post.idc != 0 && i == 1)
                                        return (<header>

                                            <div className="overlay">
                                                <h1> Bienvenue Dans MyCarrer</h1>
                                                <h3>S'il vous plait suivre les étapes suivantes.</h3>
                                                <p>Merci d'entrer le carrière que vous voulez suivre et lire les compétences requis ensuite
                                                    cliquez sur le boutton "Rates" pour saisir votre niveau par rapport aux compétences.
                                                </p>


                                                <div className="select">

                                                <DropDown func={pull_data} />

                                                </div>
                                                <div className="container">
                                                    <button className="btn" id="btn" onClick={submitReview}>Confirmer</button>
                                                </div>

                                            </div>
                                        </header>)
                                }
                                )}

                        </div>
                   

                    <div className='navi'>

                        <div id="topSideBar" className="text-center">
                            <br />
                            <div className="table-responsive px-2">
                                <table className="table table-borderless bg-light">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Compétences</th>
                                            <th scope="col" className="text-center">Pas de connaissance</th>
                                            <th scope="col" className="text-center">Connaissance théorique</th>
                                            <th scope="col" className="text-center">Première expérience</th>
                                            <th scope="col" className="text-center">Bonne expérience</th>
                                            <th scope="col" className="text-center"> Niveau expert</th>
                                            <th scope="col" className="text-center">Confirmer</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            postus.map((post) => {

                                                return (

                                                    <tr>
                                                        <td >
                                                            <p className='bg-bdark'>{post.nomT} </p>
                                                        </td>
                                                        {
                                                            [1,2,3,4,5].map((index) => {
                                                
                                                                var Myobject={};

                                                                return (
                                                                    <td >
                                                                        <div className="bg-bdark text-center">
                                                                            <span className="bg-bdark">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value={index}
                                                                                    className={index}
                                                                                    onChange={(e) => {
                                                                                        
                                                                                      
                                                                                        Myobject["niv"]=e.target.value;
                                                                                        Myobject["techno"]=post.nomT;

                                                                                        curent.current.push(Myobject);
                                                                                  
                                                                                        
                                                                                    }
                                                                                    }
                                                                                />
                                                                            </span>

                                                                        </div>
                                                                    </td>
                                                                );
                                                            })}
                                                        
                                                    </tr>)
                                            })
                                        }
                                        < br />
                                    </tbody>
                                </table>
                                <a  className='text-center'> <button  onClick={handleChange}>Rates</button></a>
                            </div>
                            < br />
                        </div>
                    </div>


                </div>
              

            </div>

       
            </div>

    );

}

export default Carriere;