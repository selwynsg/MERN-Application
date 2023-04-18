
import './Header.css'
const Header = ({ props }) => {
    return (
      <div className="header">
        <p className="header-item">CS4992.2023 {'\>'} {props}</p>
      </div>
    );
};
  
export default Header;