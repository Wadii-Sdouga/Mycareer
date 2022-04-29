
function Sidebar() {
return(

<div className="wrapper">
    <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
            <li><a href="/dashboard" className="pr-1"><i className="zmdi zmdi-view-dashboard " ></i>Dashboard</a></li>
            <li><a href="/profil"><i className="zmdi zmdi-user"></i>Profile</a></li>
            <li><a href="#"><i className="fas fa-address-card"></i>About</a></li>
            <li><a href="#"><i className="fas fa-project-diagram"></i>portfolio</a></li>
            <li><a href="#"><i className="fas fa-blog"></i>Blogs</a></li>
            <li><a href="#"><i className="fas fa-address-book"></i>Contact</a></li>
            <li><a href="#"><i className="fas fa-map-pin"></i>Map</a></li>
        </ul> 
       
    </div>
    
</div>
        )}

export default Sidebar;