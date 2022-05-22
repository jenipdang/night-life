import { useState } from 'react';
import dateformat from 'dateformat';
import './profile.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Profile = ({ user }) => {
	return (
		<>
			<div className='user'>
				<div className='userTitleContainer'>
					<h1 className='userTitle'>User Profile</h1>
				</div>
				<div className='userContainer'>
					<div className='userShow'>
						<div className='userShowBottom'>
							<span className='userShowTitle'>Account Details</span>
							<div className='userShowInfo'>
								<PermIdentityIcon className='userShowIcon' />
								<span className='userShowInfoTitle'>{user.username}</span>
							</div>
							<span className='userShowTitle'>Active Since</span>
							<div className='userShowInfo'>
								<CalendarTodayIcon className='userShowIcon' />
								<span className='userShowInfoTitle'>
									{user.created_at
										? dateformat(user.created_at, 'dddd, mmmm dS yyyy')
										: ''}
								</span>
							</div>
							<span className='userShowTitle'>Contact Details</span>
							<div className='userShowInfo'>
								<MailOutlineIcon className='userShowIcon' />
								<span className='userShowInfoTitle'>{user.email}</span>
							</div>
						</div>
					</div>
					<div className='userUpdate'>
						<span className='userUpdateTitle'>Edit</span>
						<form className='userUpdateForm'>
							<div className='userUpdateLeft'>
								<div className='userUpdateItem'>
									<label>Username</label>
									<input
										type='text'
										placeholder={user.username}
										className='userUpdateInput'
									/>
								</div>
								<div className='userUpdateItem'>
									<label>Email</label>
									<input
										type='text'
										placeholder={user.email}
										className='userUpdateInput'
									/>
								</div>
							</div>
							<div className='userUpdateRight'>
								<button className='userUpdateButton'>Update</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className='userShow'>
      <span className='userShowTitle'>Posted Events</span>
					<ul>
						{user.created_events?.map((created_event) => (
							<li key={created_event.id}>
								<h5 className='userShowInfoTitle'>{created_event.name}</h5>
							</li>
						))}
					</ul>
			</div>
			<div className='userShow'>
      <span className='userShowTitle'>Comments History</span>
					<ul>
						{user.comments?.map((comment) => (
							<li key={comment.id}>
								<h5 className='userShowInfoTitle' >{comment.content}</h5>
							</li>
						))}
					</ul>
			</div>
		</>
	);
};
export default Profile;
