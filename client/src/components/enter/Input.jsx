import './../../css/enter/enter.css'
const Input = ( { label , validity , svg , error , onChange , placeholder ,type} ) => {
    return (
        <div className="form-floating mb-2 ">
            <input type={type} className={`form-control is-${validity}valid`} id="floatingPassword" placeholder={placeholder} onChange={onChange} />
            <label for="floatingPassword">{svg} {label}</label>
            <div className='invalid-feedback'>
                {error}
            </div>
        </div>
    )
}
export default Input