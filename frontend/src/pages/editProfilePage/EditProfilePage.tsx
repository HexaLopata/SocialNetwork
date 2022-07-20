import React, { FC } from 'react'
import classes from './EditProfilePage.module.css'
import { connect } from 'react-redux'
import EditProfileForm from '../../components/appComponents/editProfileForm/EditProfileForm'
import { Props } from '../../types/Props'
import { Account } from '../../types/Account'
import { RootState } from '../../redux/store'

interface EditProfileProps extends Props {
    account: Account | null
}

const EditProfilePage: FC<EditProfileProps> = ({ account }) => {
    return (
        <div className={classes.editPageContainer}>
            <EditProfileForm account={account}/>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    account: state.account.account,
})

export default connect(mapStateToProps)(EditProfilePage)
