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

            <div className='admin mr-5  '>
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

                                    <h1>Carri??res et Technologies </h1>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3 px-md-3 px-2">
                                <span className="text-uppercase fs13 fw-bolder pe-3">search<span className="ps-1">by</span></span>
                                <form className="example d-flex align-items-center">
                                    <input type="text" placeholder="Tapez le nom de l'employ??" name="search" onChange={(e) => {
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
                                            <th scope="col">Carri??re</th>
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







                                {isOpen && <Popup
                                    content={<>

<div class="container py-5">

  



  <div class="row">
    <div class="col-lg-7 mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-5">
  
        <ul role="tablist" class="nav bg-light nav-pills rounded-pill nav-fill mb-3">
          <li class="nav-item">
            <a data-toggle="pill" href="#nav-tab-card" class="nav-link active rounded-pill">
                                <i class="fa fa-credit-card"></i>
                                Credit Card
                            </a>
          </li>
          <li class="nav-item">
            <a data-toggle="pill" href="#nav-tab-paypal" class="nav-link rounded-pill">
                                <i class="fa fa-paypal"></i>
                                Paypal
                            </a>
          </li>
          <li class="nav-item">
            <a data-toggle="pill" href="#nav-tab-bank" class="nav-link rounded-pill">
                                <i class="fa fa-university"></i>
                                 Bank Transfer
                             </a>
          </li>
        </ul>

        <div class="tab-content">

        
          <div id="nav-tab-card" class="tab-pane fade show active">
            <p class="alert alert-success">Some text success or error</p>
           
              <div class="form-group">
                <label for="username">Full name (on the card)</label>
                <input type="text" name="username" placeholder="Jason Doe"  class="form-control" />
              </div>
              <div class="form-group">
                <label for="cardNumber">Card number</label>
                <div class="input-group">
                  <input type="text" name="cardNumber" placeholder="Your card number" class="form-control"  />
                  <div class="input-group-append">
                    
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-8">
                  <div class="form-group">
                    <label><span class="hidden-xs">Expiration</span></label>
                    <div class="input-group">
                      <input type="number" placeholder="MM" name="" class="form-control"  />
                      <input type="number" placeholder="YY" name="" class="form-control"  />
                    </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group mb-4">
                    <label data-toggle="tooltip" title="Three-digits code on the back of your card">CVV
                                                <i class="fa fa-question-circle"></i>
                                            </label>
                    <input type="text"  class="form-control" />
                  </div>
                </div>



              </div>
              <button type="button" class="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>
           
          </div>
       

        
          <div id="nav-tab-paypal" class="tab-pane fade">
            <p>Paypal is easiest way to pay online</p>
            <p>
              <button type="button" class="btn btn-primary rounded-pill"><i class="fa fa-paypal mr-2"></i> Log into my Paypal</button>
            </p>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        

      
          <div id="nav-tab-bank" class="tab-pane fade">
            <h6>Bank account details</h6>
            <dl>
              <dt>Bank</dt>
              <dd> THE WORLD BANK</dd>
            </dl>
            <dl>
              <dt>Account number</dt>
              <dd>7775877975</dd>
            </dl>
            <dl>
              <dt>IBAN</dt>
              <dd>CZ7775877975656</dd>
            </dl>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
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