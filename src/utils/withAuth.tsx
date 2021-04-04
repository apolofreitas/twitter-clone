import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuth from '~/hooks/useAuth'

export default function withAuth<T>(WrappedComponent: React.FC<T>) {
  const Wrapper: React.FC<T> = (props) => {
    const { currentUser, isLoadingUserData } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoadingUserData && currentUser === null) router.replace('/')
    }, [isLoadingUserData])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}
