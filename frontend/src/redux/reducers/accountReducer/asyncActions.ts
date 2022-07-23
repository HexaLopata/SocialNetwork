import {
    setAccount,
    setProfilePicture,
    setBackgroundPicture,
    addFriend,
    setFriends,
    setRequests,
    deleteRequest,
} from '.'
import AccountService from '../../../services/AccountService'
import { Account } from '../../../types/Account'
import { FriendRequest } from '../../../types/FriendRequest'
import { sendRequest, uploadAllImages } from '../../helpers'
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

export const acceptFriendRequest = (request: FriendRequest, csrf: string) => {
    const friend = request.from_account as Account
    return (dispatch: AppDispatch) => {
        if (request.id) {
            if (!friend || !friend.id) return
            AccountService.addFriend(friend.id, csrf).then(() => {
                dispatch(addFriend(friend))
                dispatch(deleteRequest(request))
            })
        }
    }
}

export const rejectFriendRequest = (request: FriendRequest, csrf: string) => {
    return (dispatch: AppDispatch) => {
        if (request.id) {
            AccountService.deleteFriendRequest(request.id, csrf).then(() => {
                dispatch(deleteRequest(request))
            })
        }
    }
}

export const fetchFriends = () => {
    return (dispatch: AppDispatch) => {
        AccountService.fetchFriends().then((response) => {
            dispatch(setFriends(response.data))
        })
    }
}

export const fetchFriendRequests = () => {
    return (dispatch: AppDispatch) => {
        AccountService.fetchFriendRequests().then((response) => {
            dispatch(setRequests(response.data))
        })
    }
}
