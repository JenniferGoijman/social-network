import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { getAll }  from '../../redux/actions/users'
const { Option } = Select;

const Search = props => {
    console.log(props)
    useEffect(() => { getAll(); }, []);
    const [data, setData] = useState();
    const [value, setValue] = useState(undefined);

    const handleSearch = value => {
        if (value) {
            setData(props.users.filter(u => u.id!==props.myUser.id).filter(d => d.username.includes(value)));
        } else {
            setData([])
        }
    };
    
    const handleChange = value => {
        setValue(value)
    };
    
    const options = data?.map(d => <Option key={d.id}>{d.username}</Option>); // agregar onClick que te lleve al perfil
    
    return (
        <Select
        showSearch
        value={value}
        placeholder={props.placeholder}
        style={props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
    >
        {options}
    </Select>
    )
}

const mapStateToProps = ({user}) => ({ users: user.users, myUser: user.user });
export default connect(mapStateToProps)(Search);
//export default Search;