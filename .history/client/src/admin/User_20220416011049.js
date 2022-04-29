import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import api from '../service';
import Sidebar from '../components/SideBar';
import Barc from '../components/BarChart';
import Popup from '../components/Popup';
import { Button } from 'reactstrap'




function AdminCar() {
    const [posts, setPosts] = useState([]);
    const [postus, setPostus] = useState([]);

    const [search, setSearch] = useState('');
    const [view, setView] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const current = useRef('');
    const ref = useRef([]);

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
                const message = err.response.data;
                alert(message);
            })
    };


    const Viewprofil = async () => {
        try {
            console.log(current.current.email);
            const response = await api.get('http://localhost:5000/admin/view/profil', { headers: { email: current.current.email } });
            setPostus(response.data);

        } catch (error) {
            console.log(error);
        }

    };



    // React Hook that executes the fetch function on the first render 
    useEffect(() => {
        getData();

    }, []);
    useEffect(() => {
        Viewprofil();

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

            <div className='admin mr-5  '>
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
                                            post.nom.toLowerCase().includes(search)
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
                                                        <button onClick={() => {
                                                            togglePopup();
                                                            current.current = post;
                                                            ref.current = postus;
                                                            setView(current.current.email);
                                                            Viewprofil();

                                                        }}  > <i className="zmdi zmdi-eye"></i></button>

                                                    </td>

                                                </tr>
                                            )

                                            )}
                                    </tbody>
                                </table>
                                {isOpen && <Popup
                                    content={<>

                                        <div className="page-content page-container" id="page-content">

                                            <div className="card user-card-full ">
                                                <div className="row m-l-0 m-r-0">
                                                    <div className="col-sm-4 bg-c-lite-green user-profile ">
                                                        <div className="card-block text-center text-white ">
                                                            <div className="m-b-25"><img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" /> </div>
                                                            <h6 className="f-w-600">{current.current.nom}</h6><i className=" zmdi zmdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                            <p>{current.current.titre}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="card-block">
                                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <p className="m-b-10 f-w-600">Email</p>
                                                                    <h6 className="text-muted f-w-400">{current.current.email}</h6>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                                    <h6 className="text-muted f-w-400">{current.current.numTel}</h6>
                                                                </div>
                                                            </div>
                                                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Niveau</h6>
                                                            {postus.map((rate, i) => {
                                                                i += 1;
                                                                if (i <= postus.length)
                                                                    return (

                                                                        <div className="row">
                                                                            <div className="col-sm-6">
                                                                                <p className="m-b-10 f-w-600">{rate.nomT}</p>
                                                                                <ProgressBar now={rate.niv} label={rate.niv} max='5' striped='true' />
                                                                                <h6 className="text-muted f-w-400"></h6>
                                                                            </div>

                                                                        </div>

                                                                    )
                                                            })}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>}
                                    handleClose={togglePopup}
                                />}







                            </div>

                        </div>
                    </div>
                </div>
            </div> 


            //************************************************** */
            <div className='admin mr-5'>
                <div className="px-0 bg-white">
                    <div className="d-md-flex">
                        <div className="topSidebar  w-100">


                            <div className="topnav mb-3">
                                <div className="d-flex px-1">

                                    <h1>Carriéres et Technologies </h1>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3 px-md-3 px-2">
                                <span className="text-uppercase fs13 fw-bolder pe-3">search<span className="ps-1">by</span></span>
                                <form className="example d-flex align-items-center">
                                    <input type="text" placeholder="Tapez le nom de l'employé" name="search" onChange={(e) => {
                                        setSearch(e.target.value);
                                    }
                                    } />
                                    <button type="submit" ><i className="zmdi zmdi-search "></i></button>


                                </form>


                                <button type="submit" className='ml-5' onClick={() => {togglePopup(); }}><i className="zmdi zmdi-plus "></i></button>
                                <button type="submit" className='ml-5' onClick={() => {togglePopup(); }}><i className="zmdi zmdi-plus "></i></button>

                            </div>
                            <br />
                            <div className="table-responsive px-2 ">
                                <table className="table table-borderless bg-light table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col"><span>ID</span></th>
                                            <th scope="col">Technologie</th>
                                            <th scope="col">Carriére</th>
                                            <th scope="col" className="text-center" >Supprimer</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {posts.filter((post, index) =>
                                            post.nom.toLowerCase().includes(search)
                                        )
                                            .map((post, index) =>
                                            (
                                                <tr key={index} >

                                                    <td ><span className="bg-bdark">{index}</span></td>
                                                    <td><span className="bg-bdark">{post.nom}</span></td>
                                                    <td ><span className="bg-blight">{post.email}</span></td>

                                                    <td className="text-center" >
                                                        <button type="submit" value={post.email} onClick={deleteUser}  > <i className="zmdi zmdi-delete"></i> </button>
                                                    </td>


                                                </tr>
                                            )

                                            )}
                                    </tbody>
                                </table>
  //*************************************************** */
                                {isOpen && <Popup
                                    content={<>

                                        <div className="page-content page-container" id="page-content">

                                            <div className="card user-card-full ">
                                                <div className="row m-l-0 m-r-0">
                                                    <div className="col-sm-4 bg-c-lite-green user-profile ">
                                                        <div className="card-block text-center text-white ">
                                                            <div className="m-b-25"><img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" /> </div>
                                                            <h6 className="f-w-600">{current.current.nom}</h6><i className=" zmdi zmdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                            <p>{current.current.titre}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="card-block">
                                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <p className="m-b-10 f-w-600">Email</p>
                                                                    <h6 className="text-muted f-w-400">{current.current.email}</h6>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                                    <h6 className="text-muted f-w-400">{current.current.numTel}</h6>
                                                                </div>
                                                            </div>
                                                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Niveau</h6>
                                                            {postus.map((rate, i) => {
                                                                i += 1;
                                                                if (i <= postus.length)
                                                                    return (

                                                                        <div className="row">
                                                                            <div className="col-sm-6">
                                                                                <p className="m-b-10 f-w-600">{rate.nomT}</p>
                                                                                <ProgressBar now={rate.niv} label={rate.niv} max='5' striped='true' />
                                                                                <h6 className="text-muted f-w-400"></h6>
                                                                            </div>

                                                                        </div>

                                                                    )
                                                            })}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>}

                                    handleClose={togglePopup}
                                />}
 /*********************************************** */
                                {isOpen && <Popup
                                    content={<>

<div class="container py-5">
   
    
    <div class="row">
        <div class="col-lg-6 mx-auto">
            <div class="card ">
                <div class="card-header">
                    <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                      // Credit card form tabs***********/
                        <ul role="tablist" class="nav bg-light nav-pills rounded nav-fill mb-3">
                            <li class="nav-item"> <a data-toggle="pill" href="#credit-card" class="nav-link active "> <i class="fas fa-credit-card mr-2"></i> Credit Card </a> </li>
                            <li class="nav-item"> <a data-toggle="pill" href="#paypal" class="nav-link "> <i class="fab fa-paypal mr-2"></i> Paypal </a> </li>
                            <li class="nav-item"> <a data-toggle="pill" href="#net-banking" class="nav-link "> <i class="fas fa-mobile-alt mr-2"></i> Net Banking </a> </li>
                        </ul>
                    </div> 
                   //Credit card form content **************/
                    <div class="tab-content">
                       //credit card info************/
                        <div id="credit-card" class="tab-pane fade show active pt-3">
                            <form role="form" onsubmit="event.preventDefault()">
                                <div class="form-group"> <label for="username">
                                        <h6>Card Owner</h6>
                                    </label> <input type="text" name="username" placeholder="Card Owner Name" required class="form-control " /> </div>
                                <div class="form-group"> <label for="cardNumber">
                                        <h6>Card number</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " required />
                                        <div class="input-group-append"> <span class="input-group-text text-muted"> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </span> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group"> <label><span class="hidden-xs">
                                                    <h6>Expiration Date</h6>
                                                </span></label>
                                            <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required /> 
                                            <input type="number" placeholder="YY" name="" class="form-control" required /> </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                                <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                            </label> <input type="text" required class="form-control" /> </div>
                                    </div>
                                </div>
                                <div class="card-footer"> <button type="button" class="subscribe btn btn-primary btn-block shadow-sm"> Confirm Payment </button></div>
                            </form>
                        </div>
                    </div> 
                  //*******Paypal info*****/
                    <div id="paypal" class="tab-pane fade pt-3">
                        <h6 class="pb-2">Select your paypal account type</h6>
                        <div class="form-group "> <label class="radio-inline"> <input type="radio" name="optradio" checked /> Domestic </label> <label class="radio-inline"> 
                        <input type="radio" name="optradio" class="ml-5" />International </label></div>
                        <p> <button type="button" class="btn btn-primary "><i class="fab fa-paypal mr-2"></i> Log into my Paypal</button> </p>
                        <p class="text-muted"> Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                    </div> 
                 // ****bank transfer info********/
                    <div id="net-banking" class="tab-pane fade pt-3">
                        <div class="form-group "> <label for="Select Your Bank">
                                <h6>Select your Bank</h6>
                            </label> <select class="form-control" id="ccmonth">
                                <option value="" selected disabled>--Please select your Bank--</option>
                                <option>Bank 1</option>
                                <option>Bank 2</option>
                                <option>Bank 3</option>
                                <option>Bank 4</option>
                                <option>Bank 5</option>
                                <option>Bank 6</option>
                                <option>Bank 7</option>
                                <option>Bank 8</option>
                                <option>Bank 9</option>
                                <option>Bank 10</option>
                            </select> </div>
                        <div class="form-group">
                            <p> <button type="button" class="btn btn-primary "><i class="fas fa-mobile-alt mr-2"></i> Proceed Payment</button> </p>
                        </div>
                        <p class="text-muted">Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                    </div>
              
                </div>
            </div>
        </div>
    </div>
</div>
                                    </>}
                                    handleClose={togglePopup}
                                />}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

















        </div>
    );
}

export default AdminCar;