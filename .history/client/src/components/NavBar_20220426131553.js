function Navbar() {


    return (
        <nav class="navbar n ">
            <div class="container-fluid">
                <button id="sidebarToggle Top" class="btn btn-link d-md-none rounded-circle me-3" type="button">
                    <i class="fas fa-bars"></i>
                </button>
               
                <ul class="navbar-nav flex-nowrap ms-auto">
                    
                    <li class="nav-item dropdown no-arrow mx-1">
                        <div class="nav-item dropdown no-arrow">
                            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                <span class="badge bg-danger badge-counter">3+</span>
                                <i class="fas fa-bell fa-fw"></i>
                            </a>


                            <div class="dropdown-menu dropdown-menu-end dropdown-list animated-grow-in">
                                <h6 class="dropdown-header"> alerts center</h6>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="me-3">
                                        <div class="bg-primary icon-circle">
                                            <i class="fas fa-file-alt text-white"></i>
                                        </div>
                                       
                                            <div>
                                                <span class="small text-gray-500">December 12, 2019</span>
                                                <p>Anew monthly report is ready to download!</p>
                                            </div>
                                            </div>
                                </a>
                                        <a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="me-3">
                                                <div class="bg-success icon-circle">
                                                    <i class="fas fa-donate text-white"></i>
                                                </div>
                                            </div>
                                          

                                    <div>
                                        <span class="small text-gray-500">December 7, 2019</span>
                                        <p>$290.29 has been deposited into your account!</p>
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="me-3">
                                        <div class="bg-warning icon-circle">
                                            <i class="fas fa-exclamation-triangle text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="small text-gray-500">December 2, 2019</span>
                                        <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                                    </div>
                                </a>
                                <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>

                            </div></div>

                    </li>
                    <li class="nav-item dropdown no-arrow mx-1">
                        <div class="nav-item dropdown no-arrow">
                            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                <span class="badge bg-danger badge-counter">7</span>
                                <i class="fas fa-envelope fa-fw"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end dropdown-list animated-grow-in">
                                <h6 class="dropdown-header"> alerts center</h6>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="dropdown-list-image me-3">
                                        <img class="rounded-circle" src="avatars/avatar4.jpeg" />
                                        <div class="bg-success status-indicator"></div>
                                    </div>
                                    <div class="fw-bold">
                                        <div class="text-truncate">
                                            <span>Hi there! I am wondering if you can help me with a problem I've been having.</span>
                                        </div>
                                    </div>

                                      <p class="small text-gray-500 mb-0">Emily Fowler - 58m</p>
                                      
                                </a>
                          
                       
                        <a class="dropdown-item d-flex align-items-center" href="#">..</a>
                        <a class="dropdown-item d-flex align-items-center" href="#">..</a>
                        <a class="dropdown-item d-flex align-items-center" href="#">...</a>
                        
                        </div>
                    </div>
                    <div class="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsdropdown"></div>
                </li>

                <div class="d-none d-sm-block topbar-divider"></div>

                <li class="nav-item dropdown no-arrow">
                    <div class="nav-item dropdown no-arrow">
                        <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                            <span class="d-none d-lg-inline me-2 text-gray-600 small">Valerie Luna</span>
                            <img class="border rounded-circle img-profile" src="avatars/avatar1.jpeg" />
                        </a>
                        <div class="dropdown-menu shadow dropdown-menu-end animated-grow-in">
                            <a class="dropdown-item" href="#">..</a>
                            <a class="dropdown-item" href="#">..</a>
                            <a class="dropdown-item" href="#">.</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">...</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
</nav >
    )

}
export default Navbar;