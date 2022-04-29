
function Sidebar() {
return(
<div id="sidebar">
    <header>
      <a href="#">MyCarrer</a>
      <div id="circle"></div>
    </header>
    <ul class="nav">
      <li>
        <a href="/dashboard">
          <i class="zmdi zmdi-view-dashboard"></i> Dashboard
        </a>
      </li>
      <li>
        <a href="/carrer">
          <i class="zmdi zmdi-link"></i> Carrière
        </a>
      </li>
      <li>
        <a href="/profil">
          <i class="zmdi zmdi-account" name="profil"></i> Mon Profil 
        </a>
      </li>
      <li>
        <a href="#">
          <i class="zmdi zmdi-favorite"></i> Evaluations
        </a>
      </li>
      
      <li>
        <a href="#">
          <i class="zmdi zmdi-settings"></i> Services
        </a>
      </li>
      <li>
        <a href="#">
          <i class="zmdi zmdi-comment-more"></i> Contact
        </a>
      </li>
    </ul>
  </div>)}

export default Sidebar;