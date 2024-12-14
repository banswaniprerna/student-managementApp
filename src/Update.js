import{ useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Update(){
	const loc = useLocation();
	
	const [rno, setRno]= useState("");
	const [name, setName]= useState("");
	const [marks, setMarks]= useState("");
	const [ans, setAns]= useState("");

	const hRno= (event) =>{ setRno(event.target.value); }
	const hName= (event) =>{ setName(event.target.value); }
	const hMarks= (event) =>{ setMarks(event.target.value); }

	
	useEffect(() =>{
	setRno(loc.state.r);
	setName(loc.state.n);
	setMarks(loc.state.m);
	}, []);

	const save= (event) =>{
	event.preventDefault();
	let data ={rno, name, marks};
	let urladd ="http://localhost:9000/modify";
	console.log(data);
	axios.put(urladd, data)
	.then(res =>{
	if(res.data.affectedRows == 1)
	{
		console.log("hi");
		setAns("record Updated");
		setRno("");
		setName("");
		setMarks("");

		}
	})

	.catch(err =>{
		if(err.code== "ERR_NETWORK")
		setAns("pls try after a while");
		})
	}


	return(
	<>
	<center>
	<h1> Update Page</h1>
	<form onSubmit={save}>
	<input type="number" placeholder="enter rno"
	onChange={hRno} value={rno} disabled={true} />
	<br/>
	<br/>
	
	<input type="text" placeholder="enter ur sweet name" 
	onChange={hName} value={name} />
	<br/>
	<br/>
	
	<input type="number" placeholder="enter ur marks"
	onChange={hMarks} value={marks} />
	<br/>
	<br/>
	
	<input type="submit" value= "Update" />
	<br/>
	<br/>
	
	</form>
	<h1>{ ans } </h1>
	</center>
	</>
	);
}


	





























