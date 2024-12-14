import {useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home()
{
	const [info, setInfo]= useState([]);
	const nav = useNavigate();	

	useEffect( () => {
		let urladd= "http://localhost:9000/getdata";
		axios.get(urladd)
		.then(res => {
			setInfo(res.data);
			console.log(info); 
			})
		.catch(err => console.log(err));
	}, []);
	

	const delStu = (rno) =>{
	let urladd= "http://localhost:9000/remove";
	let d = {data: {rno}}
	axios.delete(urladd, d)
	.then(res =>{
		alert("record deleted");
		window.location.reload();
	})
	
	.catch(err => alert("del issue" + err));
	}

	const updateStu= (rno, name, marks) =>{
	nav("/update", {state:{r:rno, n:name, m:marks}})
	
	}

	return(
	<>
	<center>
	<h1> Home Page </h1>
	
	<table border="4" style={{"width": 50%""}}>
	<tr>
		<th> Rno </th>
		<th> Name </th>
		<th> Marks </th>
		<th> Delete</th>
		<th> Update </th>
	</tr>
	{
	info.map ((e) => (
		<tr style={{"text-align":"center"}}>
		<td> {e.rno } </td>
		<td> { e.name } </td>
		<td> { e.marks } </td>
	<td> <button onClick={ () =>{
	if(window.confirm('r u sure??'))delStu(e.rno)}}>
	 Delete </button> </td>

	<td> <button onClick={ () =>{
	updateStu(e.rno, e.name, e.marks);}}>
	 Update </button> </td>
		</tr>
	))
	
	}

	</table>
	</center>
	</>
	);
	
}