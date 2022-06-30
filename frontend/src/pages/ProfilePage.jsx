import React from 'react'
import Post from '../components/post/Post'
import Block from '../components/block/Block'
import SimpleButton from '../components/simpleButton/SimpleButton'
import classes from './ProfilePage.module.css'
import { connect } from 'react-redux'

function ProfilePage({ account }) {
    return (
        <div className={classes.profileContainer}>
            <div className={classes.profileInfoContainer}>
                <img
                    src={account.profilePicture}
                    alt='Изображение'
                    className={classes.profilePicture} />
                <Block className={classes.profileInfo}>
                    <h1>{account.first_name + ' ' + account.last_name}</h1>
                    <h4>Дата рождения: {account.birthdate}</h4>
                    <h4>Друзей: Много</h4>
                    <SimpleButton
                        variant='dark'
                        style={{ padding: '10px 15px', position: 'absolute', bottom: '20px', right: '20px' }}
                        children='Редактировать'
                    />
                </Block>
            </div>
            <Post
                body='Твоя мать шикарная женщина'
                authorName='Кирилл'
                imageSrc='https://sun9-12.userapi.com/impg/E-tWdaia67jSMjXfR_V5yH3taRLYOvGzMkyL3A/_a1YCGk-GDc.jpg?size=1920x1080&quality=95&sign=c84621a045ecebd928cc0f3f939d7c66&type=album'
            />
        </div>
    )
}

const mapStateToProps = (state) => ({ account: state.account.account})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
