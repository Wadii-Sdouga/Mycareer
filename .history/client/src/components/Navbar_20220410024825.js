
function Sidebar() {
  return (

    <div className="wrapper">
      <div className="sidebar">
        <h2>MyCarrer</h2>
        <ul>
          <li className="menu">
            <a href="/dashboard" className="">
            <i className="zmdi zmdi-view-dashboard  pr-1" ></i>Dashboard
          </a>
          </li>
          <li className="menu">
            <a href="/profil">
            <i className="zmdi zmdi-user"></i>Profile
          </a>
          </li>
          <li className="menu"><a href="#">
            <i className="fas fa-address-card"></i>About
          </a>
          </li>
          <li className="menu">
            <a href="#">
            <i className="fas fa-project-diagram"></i>portfolio
          </a>
          </li>
          <li className="menu"><a href="#">
            <i className="fas fa-blog"></i>Blogs
          </a>
          </li>
          <li className="menu">
            <a href="#"><i className="fas fa-address-book"></i>Contact
            </a>
            </li>
          <li className="menu">
            <a href="#"><i className="fas fa-map-pin"></i>Map
            </a>
            </li>
        </ul>

      </div>

    </div>
  )
}

export default Sidebar;