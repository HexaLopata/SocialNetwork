import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAccount } from '../../redux/reducers/accountReducer/actions'
import CenteredBlock from '../general/centeredBlock/CenteredBlock'
import Spinner from '../spinner/Spinner'

export const AccountLoader = ({ children, fetchAccount, account, isAuthenticated }) => {

    useEffect(() => {
        if (isAuthenticated)
            fetchAccount()
    }, [isAuthenticated])

    if (!isAuthenticated)
        return (<>{children}</>)

    return (
        <>
            {account ?
                <>{children}</>
                :
                <CenteredBlock>
                    <Spinner />
                </CenteredBlock>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    account: state.account.account,
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
    fetchAccount: () => dispatch(fetchAccount())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountLoader)