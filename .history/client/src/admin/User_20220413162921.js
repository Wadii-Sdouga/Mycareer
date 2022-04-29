import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../service';
import Sidebar from '../components/SideBar';
import Barc from '../components/BarChart';
import Popup from '../components/Popup';




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


    const Viewprofil = async (s) => {
        const v = s.target.value;
        console.log(v);
        togglePopup();
        api.post('/admin/view/user',
        { v: v }
    )
        .then((response) => {
            setPostus(response.data);
            console.log(postus);
        })
        .catch((err) => {
            const message = err.response.data

            alert(message);
        })
        console.log(postus);
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
                                                        
                                                        {isOpen && <Popup
                                                        content={<>
                                                   
                                                            <div className="page-content page-container" id="page-content">

                                                                <div className="card user-card-full">
                                                                    <div className="row m-l-0 m-r-0">
                                                                        <div className="col-sm-4 bg-c-lite-green user-profile ">
                                                                            <div className="card-block text-center text-white ">
                                                                                <div className="m-b-25"><img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" /> </div>
                                                                                <h6 className="f-w-600">{ postus.nom}</h6>
                                                                                <p>{post.titre}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-8">
                                                                            <div className="card-block">
                                                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                                                <div className="row">
                                                                                    <div className="col-sm-6">
                                                                                        <p className="m-b-10 f-w-600">Email</p>
                                                                                        <h6 className="text-muted f-w-400">{postus.email}</h6>
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p className="m-b-10 f-w-600">Phone</p>
                                                                                        <h6 className="text-muted f-w-400">{post.numTel}</h6>
                                                                                    </div>
                                                                                </div>
                                                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                                                                                <div className="row">
                                                                                    <div className="col-sm-6">
                                                                                        <p className="m-b-10 f-w-600">Recent</p>
                                                                                        <h6 className="text-muted f-w-400">Sam Disuja</h6>
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p className="m-b-10 f-w-600">Most Viewed</p>
                                                                                        <h6 className="text-muted f-w-400">Dinoter husainm</h6>
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </>}
                                                        handleClose={togglePopup}
                                                    />}
                                                  
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