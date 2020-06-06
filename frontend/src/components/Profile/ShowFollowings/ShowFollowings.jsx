import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, List} from 'antd';
import './ShowFollowings.scss';
import { IMAGES_URL } from '../../../api-config';
import { getById } from '../../../redux/actions/users'

import Follow from '../Follow/Follow';
import Unfollow from '../Unfollow/Unfollow';
import UsernameBold from '../../UsernameBold/UsernameBold';

const ShowFollowings = props => {
    const [visible, setVisible] = useState();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };
    const hasFollowings = props.currentUser.followings.length>0? true : false;
    
    useEffect(() => { 
        getById(props.currentUser?.id); 
    }, []);

    return (
        <div>
            <div className="data" onClick={hasFollowings?showModal:null} style={hasFollowings?{cursor:'pointer'}:{}}>
                <span className="bold">{props.currentUser?.followings.length}</span> siguiendo
            </div>
            <Modal title="Siguiendo" visible={visible} onOk={hideModal} onCancel={hideModal} footer={null} className="showFollowings">
                <List header={null} footer={null} dataSource={[
                    props.currentUser.followings.map(followed => {
                        const isMe = props.myUser?.id === followed.id;
                        const isAlreadyFollowed = props.myUser?.followings?.filter(f => f.id === followed.id).length>0 ? true : false;
                        return(
                        <div className="userFollowings" key={followed.id}>
                            <div className="imgName">
                                <img src={IMAGES_URL + followed.pic} alt="Foto de perfil" />
                                <div className="names">
                                    <UsernameBold user={followed} />
                                    <span style={{marginLeft:10}}>{followed.name}</span>
                                </div>
                            </div>
                            { !isMe && !isAlreadyFollowed && <Follow myUser={props.myUser} currentUser={followed} locationUser={props.locationUser}/>}
                            { !isMe && isAlreadyFollowed && <Unfollow myUser={props.myUser} currentUser={followed} locationUser={props.locationUser}/>}
                        </div>)
                    })
                ]} 
                    renderItem={item => (
                        <List.Item>                            
                            {item}
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    )
}

const mapStateToProps = ({user}) => ({ myUser: user.myUser, currentUser: user.currentUser });
export default connect(mapStateToProps)(ShowFollowings);