import "./gen.css"
function Dropbox(props) {
    return (
        <div className="dropdown">
            <div className="dropdown-btn"></div>
                <div className="dropdown-content">
                <h5 >{props.props}</h5>
                </div>
        </div>
)
}


export default Dropbox;