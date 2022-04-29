const Popup2 = props => {
    
    return (
        <div className="popup-box ">
        <div className="box w-5">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    )
}

export default Popup2;