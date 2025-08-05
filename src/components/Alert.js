function Alert(props) {
  return (
    
<div 
  className="alert alert-danger position-sticky start-0 w-100"
  role="alert"
  style={{ top: '0px', zIndex: 1050 , display:'none' }} // top offset is necessary
>
  {props.message}
</div>



    
  );
}

export default Alert;
