
function Sidebar() {
 
if( localStorage.getItem('email_sess')=='admin@admin')
return(
    <div className="wrapper">
      <div className="sidebar">
      <a href="/dashboard" className=""><h2>MyCarrer</h2></a>
        <ul>
          <li className="menu">
            <a href="/dashboard" className="">
            <i className="zmdi zmdi-view-dashboard  pr-3" ></i>Dashboard
          </a>
          </li>
          <li className="menu">
            <a href="/profil">
            <i className="zmdi zmdi-account pr-3"></i>Profile
          </a>
          </li>
          <li className="menu">
            <a href="/carriere">
            <i className="zmdi zmdi-case pr-3"></i>carriére
          </a>
          </li>
          <li className="menu">
            <a href="/admin/user">
            <i className="zmdi zmdi-settings pr-3"></i>Admin
          </a>
          </li>
        
          <li className="menu">
            <a href="#"><i className="fas fa-address-book"></i>Contact
            </a>
            </li>
          <li className="menu">
            <a href="/"><i className="zmdi zmdi-power-off pr-3"></i>Logout
            </a>
            </li>
        </ul>

      </div>

    </div>)
    else{
      return(
        <div className="wrapper">
        <div className="sidebar">
          <h2>MyCarrer</h2>
          <ul>
            <li className="menu">
              <a href="/dashboard" className="">
              <i className="zmdi zmdi-view-dashboard  pr-3" ></i>Dashboard
            </a>
            </li>
            <li className="menu">
              <a href="/profil">
              <i className="zmdi zmdi-account pr-3"></i>Profile
            </a>
            </li>
            <li className="menu">
              <a href="/carriere">
              <i className="zmdi zmdi-case pr-3"></i>carriére
            </a>
            </li>
           
            <li className="menu">
              <a href="#"><i className="fas fa-address-book"></i>Contact
              </a>
              </li>
            <li className="menu">
              <a href="/"><i className="zmdi zmdi-power-off pr-3"></i>Logout
              </a>
              </li>
          </ul>
  
        </div>
  
      </div>
      )
    }
  
}

export default Sidebar;