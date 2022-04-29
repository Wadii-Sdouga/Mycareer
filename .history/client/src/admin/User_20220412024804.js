import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../service';
import Sidebar from '../components/SideBar';
import Barc from '../components/BarChart';


function AdminCar() {
    const [posts, setPosts] = useState([]);
    const [supp, setSupp] = useState([]);
    const [email, setEmail] = useState('');
    const [search, setSearch] = useState('');
    const [del, setDel] = useState('');
    const getData = async () => {
        try {
            const response = await api.get('http://localhost:5000/admin/user');
            await setPosts(response.data);
            var a = posts.length;

        } catch (error) {
            console.log(error);
        }
    };


    const appendUser = async (s )=> {
        s.preventDefault();
        setEmail(s.target.value);
        setSupp(supp.concat(email));
        console.log(supp);
       
        
    };

    const deleteUser = async (s,t) => {
        s.preventDefault();

        console.log(t);
/*for(let i in t)
        api.post('/admin/carrer', {
            i

        })
    
    .then(() => {
            window.location.replace("/admin/user");
        })
        .catch((err) => {
                const message = err.response.data

                alert(message);
            })*/
    };

    // React Hook that executes the fetch function on the first render 
    useEffect(() => {
        getData();
    }, []);

    return (


        <div className='stat'>
            <Sidebar />
            <div className=' bar row '>
                <div className='col'>
                    <Barc />
                </div>
                <br />
                <div className='col '>

                    <div className="mt-5 w-50">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <span className="h4 font-semibold text-muted text-MD d-block mb-2">Nombre d'employé</span> <span className="h3 font-bold mb-0">{posts.length}</span>
                                    </div>
                                    <div className="col-auto">
                                        <div className="icon icon-shape bg-primary text-white text-lg rounded-circle"> <i className="bi bi-people"></i> </div>
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
                        <div id="topSidebar">


                            <div className="topnav mb-3">
                                <div className="d-flex px-1">

                                    <a href="/admin/user">users</a>
                                    <a href="/admin/carrer">carrière</a>
                                    <a href="#contact">account</a> </div>
                            </div>
                            <div className="d-flex align-items-center mb-3 px-md-3 px-2">
                                <span className="text-uppercase fs13 fw-bolder pe-3">search<span className="ps-1">by</span></span>
                                <form className="example d-flex align-items-center">
                                    <input type="text" placeholder="Tapez le nom de l'employé" name="search" onChange={(e) => {
                                        setSearch(e.target.value);
                                    }
                                    } />
                                    <button type="submit" ><i className="zmdi zmdi-search"></i></button>
                                </form>
                                <button onClick={deleteUser} className="ml-5" > <i className="zmdi zmdi-delete"></i></button>
                            </div>
                            <br />
                            <div className="table-responsive px-2 ">
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
                                            post.nom.toLowerCase().includes(search)
                                        ).map((post, index) =>
                                        (
                                            <tr>
                                                <td><input type="checkbox" value={post.email}  onChange={ appendUser } /></td>
                                                <td><span className="bg-bdark">{post.nom}</span></td>
                                                <td><span className="bg-blight">{post.email}</span></td>
                                                <td><span className="bg-bdark">{post.numTel}</span></td>
                                                <td className="text-center px-0"><span className="bg-bdark">
                                                    {post.titre}</span></td>
                                                <td className="text-center" >

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

export default AdminCar;