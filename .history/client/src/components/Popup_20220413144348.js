const Popup = props => {
    
    return (
    
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      
    )
}

export default Popup;