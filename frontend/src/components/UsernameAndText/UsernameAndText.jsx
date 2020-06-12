import React from 'react';
import { useHistory } from 'react-router-dom';

const UsernameAndText = props => {
    const history = useHistory();

    const goToUserProfile = username => {
        history.push('/'+ username);
    }
    
    return (
        <div style={{display:'flex', alignItems:'baseline'}}>
            <span style={{fontSize:13, marginLeft:10}}>
                <span style={{fontWeight:'500', color:'#262626', fontSize:props.size, cursor:'pointer'}} 
                    onClick={goToUserProfile.bind(this, props.username)}>
                    {props.username} </span>
                    {props.text}
            </span>
        </div>  
    )
}

export default UsernameAndText;
