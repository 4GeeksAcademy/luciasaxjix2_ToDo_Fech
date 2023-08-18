import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])
	const [username,setUsername]=useState("")

	const URI = "https://playground.4geeks.com/apis/fake/todos/user/"

	const handleInput = (e) => {
		let texto = e.target.value
		if (e.keyCode == 13) {
			setTarea(texto)
			setLista([...lista, texto])
		}
	}

	const deleteTask = (index) => {
		let tempArr = lista.slice() //copiar el estado lista en una variable auxiliar
		tempArr = tempArr.filter((item, index2) => { return index2 != index })
		setLista(tempArr)
	}

	const handleUser = (e) => {
		let nombreUsuario = e.target.value
		setUsername(nombreUsuario)
	}

	useEffect(()=>{},[])
	
	return (
		<>
			<div className="container text-center mt-5 caja ">
				<div className="container text-center mt-5 display-5 todos">ToDos</div>
				<div className="paper">
				<input className="container border-top-0 border-light" placeholder="Usuario"
						onKeyUp={
							(e) => { handleUser(e)}
						} />
					<input className="container border-top-0 border-light" placeholder="Agregar Tarea"
						onKeyUp={
							(e) => { handleInput(e) }
						} />
					<div>
						<ul className="list-group list-group-flush ">
							{
								lista && lista.length > 0 ?
									<>{
										lista.map((item, index) => {
											return <li className="list-group-item border" key={index}>
												{item}
												<button type="button" className="btn btn-outline-light boton text-danger"onClick={e => { deleteTask(index) }}><i class="fa-solid fa-x"></i>
												</button>
											</li>
										})
									}</>
									: "Agregar tarea"	
							}
						</ul>
					</div>
				</div>

			</div>
		</>
	);
};

export default Home;