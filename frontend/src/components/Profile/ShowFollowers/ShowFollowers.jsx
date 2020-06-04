import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, List} from 'antd';
import './ShowFollowers.scss';
//import { getFollowers } from '../../../redux/actions/followers';
import { IMAGES_URL } from '../../../api-config';
import { getById } from '../../../redux/actions/users'

import Follow from '../Follow/Follow';
import Unfollow from '../Unfollow/Unfollow';

const ShowFollowers = props => {
    const [visible, setVisible] = useState();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };

    useEffect(() => { 
        getById(props.currentUser?.id); 
    }, []);
    return (
        <div>
            <div className="data followers" onClick={showModal}>
                <span className="bold">{props.currentUser?.followers.length}</span> seguidores
            </div>
            <Modal title="Seguidores" visible={visible} onOk={hideModal} onCancel={hideModal} footer={null}>
                <List header={null} footer={null} dataSource={[
                    // props.followers.map(follower => 
                    //     <div className="userFollowers" key={follower.id}>
                    //         <div className="imgName">
                    //             <img src={IMAGES_URL + follower.pic} alt="Foto de perfil" />
                    //             <div className="names">
                    //                 <span className="username">{follower.username}</span>
                    //                 <span>{follower.name}</span>
                    //             </div>
                    //         </div>
                    //         { props.myUser?.id !== follower.id && props.myFollowings?.filter(f => f.id === follower.id).length>0 
                    //             && <Follow myUser={props.myUser} user={follower} />}
                    //         { props.myUser?.id !== follower.id && !props.myFollowings?.filter(f => f.id === follower.id).length>0 
                    //             && <Unfollow myUser={props.myUser} user={follower} />}
                    //     </div> )
                    
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
export default connect(mapStateToProps)(ShowFollowers);