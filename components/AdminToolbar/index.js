import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkUserIsAdmin } from '../../Utiles'
import './styles.scss'

const AdminToolbar = (props) => {

    const currentUser = useSelector(state => state.user.currentUser)
    

const isAdmin = checkUserIsAdmin(currentUser)

if (!isAdmin) return null

    return (

   <div className="adminToolbar">
       <ul> 
           <li>
<Link to="/admin"> My admin </Link>
            </li>
       </ul>
       </div>


    )
}

export default AdminToolbar