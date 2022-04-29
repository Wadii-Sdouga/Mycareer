import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import api from '../service';
import SideBar from '../components/SideBar';


function Carriere() {

    const [posts, setPosts] = useState([]);
    const [format, setFormat] = useState('');
    const [rate, setRate] = useState([]);
    const [tech, setTech] = useState([]);
    const [postus, setPostus] = useState([]);



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
    console.log(posts);


    const handleChange = (e) => {
        e.preventDefault();
        // to get the checked value
        console.log(tech);
        api.post('/carriere', {
            tech,
            rate
        })
            .then(() => {
                window.location.replace("/dashboard");
            })

            .catch((err) => {
                const message = err.response
                alert(message);
            })
    };


    return (
 
<div className='row'>
            <div className='d-flex justify-content-start'>
                <div className='' >
                    <SideBar />
                </div>

                <div className='d-table-row  '>
                    <div  className=''>

                        <div className="container-fluid">
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

                                                    <select name="format" id="format" onChange={(e) => { setFormat(e.target.value); }}  >
                                                        <option selected disabled>Choisissez votre carrière</option>
                                                        <option value="Front-end Developer">Front-end Developer</option>
                                                        <option value="Back-end Developer">Back-end Developer</option>
                                                        <option value="Full-stack Developer">Full-stack Developer</option>
                                                        <option value="Data-Scientist">Data-Scientist</option>
                                                        <option value="Mobile Developer">Mobile Developer</option>
                                                    </select>

                                                </div>
                                                <div className="container">
                                                    <button className="btn" id="btn" onClick={submitReview}>Confirmer</button>
                                                </div>

                                            </div>
                                        </header>)
                                }
                                )}

                        </div>
                    </div>

                    <div className='navi'>

                        <div id="topSideBar">
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
                                            postus.map((post, index) => {

                                                return (

                                                    <tr>
                                                        <td >
                                                            <p className='bg-bdark'>{post.nomT} </p>
                                                        </td>
                                                        {
                                                            [...Array(5)].map((v) => {
                                                                v = Math.random();
                                                                index += 1;

                                                                return (
                                                                    <td >
                                                                        <div className="bg-bdark text-center">
                                                                            <span className="bg-bdark">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value={index}
                                                                                    className={index}
                                                                                    onChange={(e) => {
                                                                                        setRate(e.target.value);
                                                                                        setTech(post.nomT);
                                                                                    }
                                                                                    }
                                                                                />
                                                                            </span>

                                                                        </div>
                                                                    </td>
                                                                );
                                                            })}
                                                        <a href="/profil" className='text-center'> <button className={index} onClick={handleChange}>Rates</button></a>
                                                    </tr>)
                                            })
                                        }
                                        < br />
                                    </tbody>
                                </table>
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