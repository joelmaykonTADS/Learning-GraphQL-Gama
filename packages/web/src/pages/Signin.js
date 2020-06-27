import React, { useState } from 'react';

export default function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('teste');
		fetch('http://localhost:8000/authenticate',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				})
			})
			.then((res) => res.json())
			.then(() => {
				console.log('Success!');
			});
	};
	const handleEmailChange = (event) => setEmail(event.target.value);
	const handlePasswordChange = (event) => setPassword(event.target.value);

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<label htmlFor="email">E-mail</label>
				<input
					id="email"
					type="email"
					inputMode="email"
					value={email}
					onChange={handleEmailChange}
					autoComplete="username"
				/>
			</fieldset>
			<fieldset>
				<label htmlFor="password">Senha</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={handlePasswordChange}
					autoComplete="current-password"
				/>
			</fieldset>
			<button type="submit">Entrar</button>
		</form>
	);
}
