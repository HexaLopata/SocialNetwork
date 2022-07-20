import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAccount } from '../../../redux/reducers/accountReducer/asyncActions'
import { RootState, TDispatch } from '../../../redux/store'
import { Account } from '../../../types/Account'
import { Props } from '../../../types/Props'

interface AccountLoaderProps extends Props {
    fetchAccount: () => void
    account: Account | null
    isAuthenticated: boolean
}

export const AccountLoader: FC<AccountLoaderProps> = ({
    children,
    fetchAccount,
    account,
    isAuthenticated,
}) => {
    useEffect(() => {
        if (isAuthenticated) fetchAccount()
    }, [isAuthenticated, fetchAccount])

    if (!isAuthenticated) return <>{children}</>

    return <>{account ? <>{children}</> : <div>Загрузка</div>}</>
}

const mapStateToProps = (state: RootState) => ({
    account: state.account.account,
    isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch: TDispatch) => ({
    fetchAccount: () => dispatch(fetchAccount()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountLoader)
