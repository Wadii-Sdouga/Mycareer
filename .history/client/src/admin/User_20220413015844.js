import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../service';
import Sidebar from '../components/SideBar';
import Barc from '../components/BarChart';
import Popup from '../components/Popup';
import { AiFilledit, AiFillDelete } from "react-icons/ai";



function AdminCar() {
    const [posts, setPosts] = useState([]);
    const [postus, setPostus] = useState([]);

    const [search, setSearch] = useState('');
    const [del, setDel] = useState('');
    const [view, setView] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const current = useRef('')

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }



    const getData = async () => {
        try {
            const response = await api.get('http://localhost:5000/admin/user');
            setPosts(response.data);
            var a = posts.length;

        } catch (error) {
            console.log(error);
        }
    };
    const getData2 = async () => {
        try {
            const response = await api.get('http://localhost:5000/admin/user');
            setPostus(response.data);

        } catch (error) {
            console.log(error);
        }
    };



    const deleteUser = (s) => {
        const d = s.target.value;
        console.log(s);
        api.post('/admin/delete/user',
            { d: d }
        )
            .then((s) => {

            })
            .catch((err) => {
                const message = err.response.data

                alert(message);
            })
    };


    const Viewprofil = async (s, t) => {
        s.preventDefault();
        setView(s.target.value);
        togglePopup();
        console.log(view);

    };


    // React Hook that executes the fetch function on the first render 
    useEffect(() => {
        getData();
        getData2();
    }, []);

    return (


        <div className='stat'>

            <div className=" d-flex justify-content-md-start">

                <div className="col-md-1 pl-0">
                    <Sidebar />
                </div>

            </div>

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
                                        <span className="h4 font-semibold text-muted text-MD d-block mb-2">Nombre d'employ??</span> <span className="h3 font-bold mb-0">{posts.length}</span>
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
                        <div className="topSidebar  w-100">


                            <div className="topnav mb-3">
                                <div className="d-flex px-1">

                                    <a href="/admin/user">users</a>
                                    <a href="/admin/carrer">carri??re</a>
                                    <a href="#contact">account</a> </div>
                            </div>
                            <div className="d-flex align-items-center mb-3 px-md-3 px-2">
                                <span className="text-uppercase fs13 fw-bolder pe-3">search<span className="ps-1">by</span></span>
                                <form className="example d-flex align-items-center">
                                    <input type="text" placeholder="Tapez le nom de l'employ??" name="search" onChange={(e) => {
                                        setSearch(e.target.value);
                                    }
                                    } />
                                    <button type="submit" ><i className="zmdi zmdi-search"></i></button>

                                </form>

                            </div>
                            <br />
                            <div className="table-responsive px-2 ">
                                <table className="table table-borderless bg-light table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col"><span>ID</span></th>
                                            <th scope="col">Nom Complet</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Numero T??l</th>
                                            <th scope="col" className="text-center">Carri??re</th>
                                            <th scope="col" className="text-center" >Supprimer</th>
                                            <th scope="col" className="text-center" >Voir Profil</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {posts.filter((post, index) =>
                                            post.titre.toLowerCase().includes(search)
                                        )
                                            .map((post, index) =>
                                            (
                                                <tr key={index} >

                                                    <td ><span className="bg-bdark">{index}</span></td>
                                                    <td><span className="bg-bdark">{post.nom}</span></td>
                                                    <td ><span className="bg-blight">{post.email}</span></td>
                                                    <td ><span className="bg-bdark">{post.numTel}</span></td>
                                                    <td className="text-center px-0" ><span className="bg-bdark">{post.titre}</span></td>
                                                    <td className="text-center" >

                                                        <button type="submit" value={post.email} onClick={deleteUser}  > <i className="zmdi zmdi-delete"></i> </button>


                                                    </td>
                                                    <td className="text-center" >
                                                        <button onClick={Viewprofil} value={post.email} > <i className="zmdi zmdi-eye"></i></button>
                                                    </td>


                                                    {isOpen && <Popup
                                                        content={<>
                                                            <div class="infos w-700">

                                                                <div class="name">
                                                                    <h2>Shantanu Jana</h2>
                                                                    <h4>@foolishdeveloper</h4>
                                                                </div>

                                                                <p class="text">
                                                                    I'm a Front End Developer, follow me to be the first who see my new work.
                                                                </p>

                                                                <ul class="stats">
                                                                    <li> <h3>15K</h3> <h4>Views</h4> </li>
                                                                    <li> <h3>82</h3> <h4>Projects</h4> </li>
                                                                    <li> <h3>1.3M</h3> <h4>Followers</h4> </li>
                                                                </ul>

                                                                <div class="links">
                                                                    <button class="follow">Follow</button>
                                                                    <button class="view">View profile</button>
                                                                </div>

                                                            </div>
                                                        </>}
                                                        handleClose={togglePopup}
                                                    />}

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