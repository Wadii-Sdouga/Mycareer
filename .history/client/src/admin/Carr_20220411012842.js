import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../service';
import Navbar from '../components/Navbar';
import Barc from '../components/BarChart';



function Admin() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [del, setDel] = useState('');

    const getData = async () => {
        try {
            const response = await api.get('http://localhost:5000/admin/user');
            await setPosts(response.data);

        } catch (error) {
            console.log(error);
        }
    };





    const deleteUser = async (s) => {
        s.preventDefault();
        setDel(s.target.value);
        console.log(del);
        api.post('/admin/carrer', {
            del
        })
            .then(() => {
                window.location.replace("/admin/carrer");
            })

            .catch((err) => {
                const message = err.response.data

                alert(message);
            })
    };

    // React Hook that executes the fetch function on the first render 
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='stat' >
            <Navbar />
            <div className='d-flex justify-content-between '>
            <div className='ml-1'>
                    <Barc />
                    </div>
                <br />

                <div className='admin '>

                    <div className="col-xl-3 col-sm-6 col-12  ">

                        <div className="card shadow border-0  ">
                            <div className="card-body bg-bviolet">
                                <div className="row">
                                    <div className="col"> <span className="h4 font-semibold text-muted text-MD d-block mb-2">Budget</span> <span className="h3 font-bold mb-0">$750.90</span> </div>
                                    <div className="col-auto">
                                        <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle"> <i className="bi bi-credit-card"></i> </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="col-xl-3 col-sm-6 col-12">

                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col"> <span className="h4 font-semibold text-muted text-MD d-block mb-2">Nombre d'employé</span> <span className="h3 font-bold mb-0">{posts.length}</span> </div>
                                    <div className="col-auto">
                                        <div className="icon   rounded-circle"> <i className="zmdi zmdi-account"></i> </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

      
            <div className='admin'>
                <div className="px-0 bg-white">

                    <div className="d-md-flex">

                        <div id="topnavbar">
                            <div className="topnav mb-3">
                                <div className="d-flex px-1">

                                    <a href="/admin/user">users</a>
                                    <a href="/admin/carrer">carrière</a>
                                    <a href="#contact">account</a> </div>
                            </div>
                            <div className="d-flex align-items-center mb-3 px-md-3 px-2">
                                <span className="text-uppercase fs13 fw-bolder pe-3">search<span className="ps-1">by</span></span>
                                <form className="example d-flex align-items-center">
                                    <input type="text" placeholder="Tapez le nom de carrière" name="search" onChange={(e) => {
                                        setSearch(e.target.value);
                                    }
                                    } />
                                    <button type="submit"><i className="zmdi zmdi-search"></i></button>
                                </form>
                            </div>
                            <br />
                            <div className="table-responsive px-2">
                                <table className="table table-borderless bg-light table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col"><span>ID</span></th>
                                            <th scope="col">Nom Complet</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Numero Tél</th>
                                            <th scope="col" className="text-center">Carriére</th>
                                            <th scope="col" className="text-center" >Supprimer</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {posts.filter((post, index) =>
                                            post.titre.toLowerCase().includes(search)
                                        ).map((post, index) =>
                                        (
                                            <tr>
                                                <td ><span className="bg-bdark">{index}</span></td>
                                                <td ><span className="bg-bdark">{post.nom}</span></td>
                                                <td ><span className="bg-blight">{post.email}</span></td>
                                                <td ><span className="bg-bdark">{post.numTel}</span></td>
                                                <td className="text-center px-0" ><span className="bg-bdark">{post.titre}</span></td>
                                                <td className="text-center" >
                                                    <button onClick={deleteUser} value={post.idu} key={index}> <i className="zmdi zmdi-delete"></i></button>
                                                </td>

                                            </tr>)

                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;