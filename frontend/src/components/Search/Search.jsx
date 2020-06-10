import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { getAll, getByUsername }  from '../../redux/actions/users'
import { IMAGES_URL } from '../../api-config';
import './Search.scss'
const { Option } = Select;

const Search = props => {
    useEffect(() => { getAll(); }, []);
    const [data, setData] = useState();
    const value = undefined;

    const handleSearch = value => {
        if (!value) {return setData([])}
        setData(props.users.filter(d => d.username.toLowerCase().includes(value.toLowerCase()) || d.name.toLowerCase().includes(value.toLowerCase())));
    };
    
    const handleChange = value => {
        getByUsername(value);
        window.location.pathname='/'+ value;
    };

    const options = data?.map(d => 
        <Option key={d.username}>
            <div className="userSearch">
                <img src={IMAGES_URL + d.pic} alt="Foto de perfil" />
                <div className="names">
                    <span className="username">{d.username}</span>
                    <span style={{marginLeft:10}}>{d.name}</span>
                </div>
            </div>
        </Option>
        );
    
    return (
        <Select showSearch value={value} placeholder={props.placeholder} style={props.style} 
            defaultActiveFirstOption={false} showArrow={false} filterOption={false}
            onSearch={handleSearch} onChange={handleChange} notFoundContent={null}>
            {options}
        </Select>
    )
}

const mapStateToProps = ({user}) => ({ users: user.users, myUser: user.myUser });
export default connect(mapStateToProps)(Search);