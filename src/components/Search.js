import React, {useState, useEffect} from "react";
import API from "../utils/API";

export default ()=>{
    const [data, setData] = useState({users:[]});
    const [filtered, setFiltered] = useState({users:[]});
    const [ascend, setAscend] = useState(true);

    useEffect(()=>{
        API().then(data=>{
            const modData = data.data.results.map(user=>{
                const date = user.dob.date.split('-')
                return ({
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    phone: user.phone,
                    dob: `${date[1]}/${date[2].split('T')[0]}/${date[0]}`,
                    image: user.picture.thumbnail
                })
            })
            setFiltered({users:modData});setData({users:modData})})
    },[])

    const handleSearch = (val)=>{
        setFiltered({users:data.users.filter(user=> user.name.toLowerCase().includes(val)||user.email.includes(val)||user.phone.includes(val))})
    }
    
    const handleSort = (type) => {
        const sorted = ascend ? filtered.users.sort((a,b)=>
            a[type] > b[type] ? 1 : a[type] < b[type] ? -1 : 0      
        ) : filtered.users.sort((a,b)=>
        a[type] < b[type] ? 1 : a[type] > b[type] ? -1 : 0      
    )
        setAscend(!ascend)
        setFiltered({users:sorted})
    }

    return(
        <>
        <input placeholder="Type to search" className="text-center" onChange={(e)=>{handleSearch(e.target.value.toLowerCase())}}/>
        <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col" className="img"></th>
                <th onClick={()=> handleSort('name')}scope="col"><i class="fas fa-arrows-alt-v"></i>Name</th>
                <th onClick={()=> handleSort('email')}scope="col"><i class="fas fa-arrows-alt-v"></i>Email</th>
                <th onClick={()=> handleSort('phone')}scope="col"><i class="fas fa-arrows-alt-v"></i>Phone</th>
                <th onClick={()=> handleSort('dob')}scope="col"><i class="fas fa-arrows-alt-v"></i>Birthday</th>
                </tr>
            </thead>
            <tbody>
                {filtered.users.map(user=>
                    <tr key={user.dob}>
                    <td><img src = {user.image} alt="user"/></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.dob}</td>
                </tr>
                    )}
            </tbody>
            </table>
        </>
    )
}