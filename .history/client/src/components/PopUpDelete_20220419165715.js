const Popup2 = props => {
    
    return (
        <div className="popup-box ">
        <div className="box w-20">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    )
}

export default Popup2;