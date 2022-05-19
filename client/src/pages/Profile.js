
const Profile = ({user}) => {

 
  return (
    <div>
        <h2>{user.username}</h2>
        <h4>{user.email}</h4>
    </div>
  )
}

export default Profile