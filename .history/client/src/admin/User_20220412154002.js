import React, { useState, useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../service';
import Sidebar from '../components/SideBar';
import Barc from '../components/BarChart';
import Popup from '../components/Popup';


function AdminCar() {
    const [posts, setPosts] = useState([]);
    const [supp, setSupp] = useState([]);
    var [email, setEmail] = useState('');
    const [search, setSearch] = useState('');
    const [del, setDel] = useState('');
    const [view, setView] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const current=useRef('')

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }



    const getData = async () => {
        try {

            const response = await api.get('http://localhost:5000/admin/user');
            setPosts(response.data);
            var a = posts.length;
            console.log(supp);


        } catch (error) {
            console.log(error);
        }
    };



    const deleteUser = async (s, t) => {
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


    const Viewprofil = async (s, t) => {
        s.preventDefault();
        setView(s.target.value);
        togglePopup();
        console.log(view);

    };


    // React Hook that executes the fetch function on the first render 
    useEffect(() => {
        getData();

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
                        <div className="topSidebar  w-100">


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
                                    <button onClick={deleteUser} className="ml-5 float-right " > <i className="zmdi zmdi-delete"></i></button>
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
                                            <th scope="col">Numero Tél</th>
                                            <th scope="col" className="text-center">Carriére</th>
                                            <th scope="col" className="text-center" >Supprimer</th>
                                            <th scope="col" className="text-center" >Voir Profil</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {posts.filter((post, index) =>
                                            post.nom.toLowerCase().includes(search)
                                        ).map((post, index,t) =>

                                          {  
   
                                        return (
                                            <tr key={index} >
                                                
                                                <td key={index+1}><span className="bg-bdark">{index}</span></td>
                                                <td key={index+2}><span className="bg-bdark">{post.nom}</span></td>
                                                <td key={index+3}><span className="bg-blight">{post.email}</span></td>
                                                <td key={index+4}><span className="bg-bdark">{post.numTel}</span></td>
                                                <td className="text-center px-0" key={index+5}><span className="bg-bdark">{post.titre}</span></td>
                                                <td className="text-center" >
                                                    <button onClick={deleteUser} value={post.idu} key={index}> <i className="zmdi zmdi-delete"></i></button>
                                                </td>
                                                <td className="text-center" key={index+6}> 
                                                    <button onClick={Viewprofil} value={post.email} > <i className="zmdi zmdi-eye"></i></button>
                                                </td>
                                                {isOpen && <Popup
                                                    content={<>
                                                        <b>Design your Popup</b>
                                                        <p>Lorem ipsum dolor sit amet</p>
                                                        <button>Test button</button>
                                                    </>}
                                                    handleClose={togglePopup}
                                                />}
                                            </tr>)}

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