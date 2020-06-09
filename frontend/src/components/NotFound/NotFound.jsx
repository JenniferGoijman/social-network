import React from 'react';
import { connect } from 'react-redux';

const NotFound = props => {
    console.log(props)
    return (
        <div>
            <h2>Esta página no está disponible.</h2>
            <p>Es posible que el enlace que has seguido sea incorrecto o que se haya eliminado la página. 
                <a href={'/' + props.myUser.username}> Volver a Jennstagram.</a>
               </p>    
        </div>
    )
}


const mapStateToProps = ({user}) => ({ myUser: user.myUser});
export default connect(mapStateToProps)(NotFound);