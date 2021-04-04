import useAuth from '~/hooks/useAuth'

function IndexPage() {
  const {
    currentUser,
    signInWithGoogle,
    signInWithEmailAndPassword,
    signOut,
  } = useAuth()

  return (
    <div>
      <h1>Home Page!!</h1>

      <button onClick={signInWithGoogle}>Sign in with Google</button>

      <button
        onClick={() => {
          signInWithEmailAndPassword('example@email.com', 'password')
        }}
      >
        Sign in with Email and Password
      </button>

      <button onClick={signOut}>Sign out</button>

      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  )
}

export default IndexPage
