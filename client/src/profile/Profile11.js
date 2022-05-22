
const Profile = ({ user }) => {
	return (
		<div style={{ margin: '20px' }} className='container'>
			<div className='card mb-3 content'>
				<h1 className='m-3 pt-3'>Profile</h1>
				<div className='card-body'>
					<div className='row'>
						<div className='col-md-3'>
							<h5>Username</h5>
						</div>
						<div className='col-md-9 text-secondary'>{user.username}</div>
					</div>
					<hr />
					<div className='row'>
						<div className='col-md-3'>
							<h5>Email</h5>
						</div>
						<div className='col-md-9 text-secondary'>{user.email}</div>
					</div>
					<hr />
					<div className='card md-3 content'>
						<h1 className='m-3'>Recent Activities</h1>
						<div className='card-body'>
							<div className='row'>
								<div className='col-md-9 text-secondary'>
									<ul>
										{user.created_events?.map((created_event) => (
											<li key={created_event.id}>
												<h5>{created_event.name}</h5>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
