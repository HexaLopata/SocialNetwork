import React from 'react'
import classes from './EditProfilePage.module.css'
import { connect } from 'react-redux'
import EditProfileForm from '../../components/appComponents/editProfileForm/EditProfileForm'

function EditProfilePage({ account }) {
    return (
        <div className={classes.editPageContainer}>
            <EditProfileForm account={account}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    account: state.account.account,
})

export default connect(mapStateToProps)(EditProfilePage)
