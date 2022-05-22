// import './userActivityList.css'
import { DataGrid } from "@mui/x-data-grid"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from "react-router-dom"
import { useState } from "react"

export const UserActivityList = ({ postEvents, postComments }) => {
    const [postEventsData, setPostEventsData] = useState(postEvents)

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Event Name", width: 200, 
            renderCell: (params) => {
                console.log(params)
                return (
                <div className='userActivityListItem'>
                    <img className='userActivityListImg' src={params.row.img} alt="event" /> 
                    {params.row.name}
                </div>
                )
            }
        },
        { field: "date", headerName: "Date", width: 120},
        { field: "start_time", headerName: "Start Time"},
        { field: "action", headerName: "Action", width: 150, 
            renderCell: (params) => {
                return (
                    <>
                    <Link to={'/events' + params.row.id}>
                        <ModeEditIcon />
                    </Link>
                    </>
                )
            }
        }
    ]
    return (
        <div className="userActivityList">
          <DataGrid
            rows={postEventsData}
            disableSelectionOnClick
            columns={columns}
            pageSize={6}
            checkboxSelection
          />
        </div>
      );
}
