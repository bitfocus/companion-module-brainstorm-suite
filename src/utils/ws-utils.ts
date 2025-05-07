export function getJsonCommand(type: string, type_Data: string, funtion_name: string, funtion_args: any[]): string {
	const jsonCommand = {
		head: {
			type,
			data: type_Data,
		},
		body: {
			fn: funtion_name,
			args: funtion_args,
		},
	}
	return JSON.stringify(jsonCommand)
}

export async function sendWsRender(host: string, msg: string): Promise<{ success: boolean; msg: string }> {
	return new Promise((resolve, reject) => {
		const wsrender = new WebSocket(`ws://${host}`, 'json')

		wsrender.onopen = () => {
			wsrender.send(msg)
		}

		wsrender.onmessage = (e) => {
			let res: string = ''
			try {
				const responsejson = JSON.parse(e.data) // Parsear el mensaje recibido
				if (responsejson && typeof responsejson === 'object') {
					// Validar que el objeto tenga la estructura esperada
					res = responsejson || ''
				} else {
					console.warn('Respuesta no válida:', e.data)
				}
			} catch (err) {
				console.error(`JSON mal formado: ${e.data} - Error: ${err}`)
			}

			resolve({
				success: res !== '', // Éxito si res no está vacío
				msg: res, // Mensaje procesado o vacío si no es válido
			})
			wsrender.close()
		}

		wsrender.onerror = (err) => {
			wsrender.close()
			const error = new Error('Socket error: ' + (err.currentTarget as WebSocket).readyState)
			console.error(error.message)
			reject(error)
		}
	})
}
