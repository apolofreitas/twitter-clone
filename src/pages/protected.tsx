import withAuth from '~/utils/withAuth'

function ProtectedPage() {
  return (
    <div>
      <h1>Protected Page!!</h1>
    </div>
  )
}

export default withAuth(ProtectedPage)
