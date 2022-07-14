import { useSelector } from 'react-redux'

const useCSRF = () => {
    return useSelector((state) => state.auth.csrf)
}

export default useCSRF
