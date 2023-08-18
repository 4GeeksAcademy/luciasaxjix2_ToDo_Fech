import React, { useState, useEffect } from "react";

const urlBase = "https://playground.4geeks.com/apis/fake/todos/user/luciasajix2"
const estadoIncial = {
	label: "", done: false
}

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState(estadoIncial)
	const [lista, setLista] = useState([])
const handleChange = (event) => {
		setTarea({
			...tarea,
			[event.target.name]: event.target.value
		})
}
	const handleInput = async (e) => {
		if (e.keyCode == 13) {
			try {
				let response = await fetch(urlBase, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify([...lista, tarea])
				})
				if (response.ok) {
					getTask()
				}
			} catch (error) {
				console.log(error)

			}
		}
	}


	const deleteTask = async (index) => {
		let tempArr = lista.slice() //copiar el estado lista en una variable auxiliar
		tempArr = tempArr.filter((item, index2) => { return index2 != index })
		try {
			let response = await fetch(urlBase, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(tempArr)
			})
			if (response.ok) {
				getTask()
			}
		} catch (error) {
			console.log(error)

		}
	}


	const getTask = async () => {
		try {
			let response = await fetch(urlBase)
			let data = await response.json()
			if (response.ok) {
				setLista(data)
			}
			if (response.status == 404) {
				//crear un usuario
				createUser()
			}
		} catch (error) {
			console.log(error)

		}
	}
	const createUser = async () => {
		try {
			let response = await fetch(urlBase, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
			if (response.ok) {
				getTask()
			}
		} catch (error) {
			console.log(error)

		}
	}
	useEffect(() => { getTask() }, [])

	return (
			<>
				<div className="container text-center mt-5 caja ">
					<div className="container text-center mt-5 display-5 todos">ToDos</div>
					<div className="paper">
						<input className="container border-top-0 border-light" placeholder="Usuario"
							onKeyUp={
								(e) => { handleUser(e) }
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
													<button type="button" className="btn btn-outline-light boton text-danger" onClick={e => { deleteTask(index) }}><i class="fa-solid fa-x"></i>
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