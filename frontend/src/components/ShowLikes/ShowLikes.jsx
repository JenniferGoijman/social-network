import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, List} from 'antd';
import { like } from '../../redux/actions/posts';
import { IMAGES_URL } from '../../api-config';
import { useHistory } from 'react-router-dom';
import './ShowLikes.scss';

import Follow from '../Profile/Follow/Follow';
import Unfollow from '../Profile/Unfollow/Unfollow';


const ShowLikes = ({post, currentUser, myUser}) => {
    const [visible, setVisible] = useState();
    const showModal = () => { setVisible(true); };
    const hideModal = () => { setVisible(false); };
    const history = useHistory();
    
    const goToUserProfile = (user)=> {
        history.push('/'+ user.username);
        hideModal();
    }

    return (
        <div>
            {post.likes?.length > 0 && 
                <div style={{fontWeight:'500', color:'black'}} onClick={showModal}>
                    {post.likes.length} Me gusta</div>}
            {!post.likes?.length > 0 && 
                <div style={{color:'black'}}>Sé el primero en
                    <span style={{fontWeight:'500', cursor:'pointer'}} 
                        onClick={like.bind(this, post.id, currentUser?currentUser.id:null)}> indicar que te gusta esto</span>
                </div>}

            <Modal title="Me gusta" visible={visible} onOk={hideModal} onCancel={hideModal} footer={null} className="showLikes">
                <List header={null} footer={null} dataSource={[
                    post.likes.map(like => {
                        const isMe = myUser?.id === like.user.id;
                        const isAlreadyFollowed = myUser?.followings?.filter(f => f.id === like.user.id).length>0 ? true : false;
                        return(
                        <div className="userLike" key={like.user.id}>
                            <div className="imgName">
                                <img src={IMAGES_URL + like.user.pic} alt="Foto de perfil" />
                                <div className="names">
                                    <div className="username" onClick={goToUserProfile.bind(this, like.user)}>{like.user.username}</div>
                                    <span style={{marginLeft:10}}>{like.user.name}</span>
                                </div>
                            </div>
                            { !isMe && !isAlreadyFollowed && 
                                 <Follow myUser={myUser} currentUser={like.user} locationUser={""}/>}
                            { !isMe && isAlreadyFollowed && 
                                <Unfollow myUser={myUser} currentUser={like.user} locationUser={""}/>}
                        </div>
                        )}
                    )
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


const mapStateToProps = ({user}) => ({ myUser: user.myUser });
export default connect(mapStateToProps)(ShowLikes);