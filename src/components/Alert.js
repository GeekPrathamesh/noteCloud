
export default function Alert(props) {
    const capitalize = (word)=>{
      if (!word) return ""
      if(word==="danger") word = "error"
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1)
    }
  return ( <div className="" style={{height:"40px"}}>{props.alert && 
    <div>
      <div
        className={`alert alert-${props.alert.typ} alert-dismissible fade show`}
        role="alert"
      >
       <strong>{capitalize(props.alert.typ)}</strong> : {props.alert.msg}

      </div>
    </div>}</div>
  );
}
