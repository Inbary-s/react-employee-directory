import React, {useState, useEffect} from "react";
import API from "../utils/API";

export default ()=>{
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(()=>{
        API().then(data=>{setFiltered(data.data.results);setData(data.data.results)})
    },[])

    useEffect(() => {
        const filter = data.filter(user=>user.name.first.toLowerCase().includes(input) || user.name.last.toLowerCase().includes(input));
        setFiltered(filter);
    }, [input])

    return(
        <>
        <input placeholder="Type to search" className="text-center" onChange={(e)=>{setInput(e.target.value)}}/>
        <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Image</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Birthday</th>
                </tr>
            </thead>
            <tbody>
                {filtered.map(user=>
                    <tr key={user.id.value}>
                    <td><img src = {user.picture.thumbnail} alt="user"/></td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.dob.date}</td>
                </tr>
                    )}
            </tbody>
            </table>
        </>
    )
}