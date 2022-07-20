import { setAccount, setProfilePicture, setBackgroundPicture } from '.'
import AccountService from '../../../services/AccountService'
import { sendRequest } from '../../helpers'
import { uploadAllImages } from '../../helpers'
import { AppDispatch } from '../../store'

export const fetchAccount = () => {
    return (dispatch: AppDispatch) => {
        AccountService.fetchAccount().then((response) => {
            dispatch(setAccount(response.data))
        })
    }
}

export const updateAccount = (
    firstName: string,
    lastName: string,
    birthdate: string,
    profilePictureFile: File | null,
    backgroundPictureFile: File | null,
    csrf: string
) => {
    return (dispatch: AppDispatch) => {
        uploadAllImages(
            [
                { name: 'profilePicture', file: profilePictureFile },
                { name: 'backgroundPicture', file: backgroundPictureFile },
            ].filter((f) => f.file !== null),
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
                        profilePicture?.id || null,
                        backgroundPicture?.id || null,
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
