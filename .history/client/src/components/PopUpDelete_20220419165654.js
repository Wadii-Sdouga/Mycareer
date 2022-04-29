const Popup2 = props => {
    
    return (
        <div className="popup-box w-50">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    )
}

export default Popup2;