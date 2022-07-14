import AccountService from '../../../services/AccountService'
import { sendRequest } from '../../helpers'
import { uploadAllImages } from '../../helpers'

export const SET_ACCOUNT = 'SET_ACCOUNT'
export const SET_PROFILE_PICTURE = 'SET_PROFILE_PICTURE'
export const SET_BACKGROUND_PICTURE = 'SET_BACKGROUND_PICTURE'

export const fetchAccount = () => {
    return (dispatch) => {
        AccountService.fetchAccount().then((response) => {
            dispatch(setAccount(response.data))
        })
    }
}

export const updateAccount = (
    firstName,
    lastName,
    birthdate,
    profilePictureFile,
    backgroundPictureFile,
    csrf
) => {
    return (dispatch) => {
        uploadAllImages(
            [
                { name: 'profilePicture', file: profilePictureFile },
                { name: 'backgroundPicture', file: backgroundPictureFile },
            ].filter((f) => f.file),
            csrf
        ).then((files) => {
            const profilePicture = files.find(
                (f) => f.name === 'profilePicture'
            )
            const backgroundPicture = files.find(
                (f) => f.name === 'backgroundPicture'
            )

            sendRequest(
                dispatch,
                () =>
                    AccountService.updateAccount(
                        firstName,
                        lastName,
                        birthdate,
                        profilePicture?.id,
                        backgroundPicture?.id,
                        csrf
                    ),
                () => {
                    if (profilePicture)
                        dispatch(setProfilePicture(profilePicture))
                    if (backgroundPicture)
                        dispatch(setBackgroundPicture(backgroundPicture))
                }
            )
        })
    }
}

export const setAccount = (account) => {
    return { type: SET_ACCOUNT, payload: account }
}

export const setProfilePicture = (profilePicture) => {
    return { type: SET_PROFILE_PICTURE, payload: profilePicture }
}

export const setBackgroundPicture = (backgroundPicture) => {
    return { type: SET_BACKGROUND_PICTURE, payload: backgroundPicture }
}
