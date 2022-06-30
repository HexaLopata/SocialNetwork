import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAccount } from '../../redux/reducers/accountReducer/actions'

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
                <div>Загрузка</div>
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