import React, { useState, useEffect, useRef } from 'react';
 const [isOpen, setIsOpen] = useState(false);
 const current = useRef('');
    const ref = useRef([]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const Viewprofil = async () => {
      try {
          console.log(current.current.email);
          const response = await api.get('http://localhost:5000/admin/view/profil', { headers: { email: current.current.email } });
          setPostus(response.data);

      } catch (error) {
          console.log(error);
      }

  };


const Popup = props => {
    
    return (
        <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
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
    )
}

export default Popup;