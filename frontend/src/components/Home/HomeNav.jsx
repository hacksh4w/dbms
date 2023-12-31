import "./homeNav.css";
import logo from "../../assets/logo.jpg";
//import bgImage from "../../assets/family_planning.webp";

function HomeNav() {
  return (
    <div className="header-container">
      <div className="header-wrapper">
        <div className="logo">
          <img src={logo}/>
          <p>Fosterhome</p>
        </div>
        <div className="btns">
          <div>
            <button className="btn1">Home</button>
          </div>
          <div>
            <button className="btn1">Support</button>
          </div>
          <div>
            <button className="btn3">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
