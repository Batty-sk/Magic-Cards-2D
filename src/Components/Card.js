
function Card(props){
    return (
        <div className="col-2 card-space " id={props.id} onClick={props.plrselect} style={{minWidth:'85px',minHeight:'150px'}}> 
        <div className="card-outer outer-parent " id={props.id2}>
                <div className="card-inner rounded-lg" >
                    <div className="card-front" >
                        <img src={props.pattern} alt="" srcset="" />
                    </div>
                    <div className="card-back card-transform-back" >
                        <img src={props.back} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Card