import { useAppSelector } from './typedHooks'

const useCSRF = () => {
    return useAppSelector((state) => state.auth.csrf)
}

export default useCSRF
