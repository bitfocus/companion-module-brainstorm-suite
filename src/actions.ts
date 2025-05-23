import type { ModuleInstance } from './main.js'
import { getJsonCommand, sendWsRender } from './utils/ws-utils.js'
import { SetVariableValue } from './variables.js'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		startVsetApp: {
			name: 'Start InfinitySet',
			options: [
				{
					id: 'appId',
					type: 'textinput',
					label: 'App ID',
					default: 'Suite60',
				},
				{
					id: 'scheme',
					type: 'dropdown',
					label: 'Scheme',
					default: 'Default',
					choices: [
						{ id: 'Default', label: 'Edit' },
						{ id: 'InfinitySetPlayout', label: 'Playout' },
						{ id: 'InfinitySetMixer', label: 'Mixer' },
					],
				},
				{
					id: 'project',
					type: 'textinput',
					label: 'Project/Version',
					default: '',
				},
				{
					id: 'autoOk',
					type: 'checkbox',
					label: 'Auto OK',
					default: false,
				},
				{
					id: 'allowInstances',
					type: 'checkbox',
					label: 'Multiple Instances',
					default: false,
				},
			],
			callback: async (event) => {
				try {
					const jsonCommand: {
						action: string
						id: string
						layout?: string
						layout_scheme?: string
						arguments?: string
						open_all?: string
						kill?: string
					} = {
						action: 'start_app',
						id: String(event.options.appId || 'suite60'),
						layout: 'InfinitySet',
						layout_scheme: typeof event.options.scheme === 'string' ? event.options.scheme : 'Default',
					}

					if (event.options.project !== '') {
						jsonCommand.open_all = String(event.options.project)
					}

					let args = ''
					// autoOk
					if (event.options.autoOk === true) {
						args += ' -G20'
					}

					if (event.options.allowInstances === true) {
						args += ' -G32'
						jsonCommand.kill = 'false'
					} else {
						jsonCommand.kill = 'true'
					}

					args = args.trim()
					jsonCommand.arguments = args

					self.log('debug', `jsonCommand: ${JSON.stringify(jsonCommand)}`)

					// Call sendWsRender and handle the result
					const result: { success: boolean; msg: string } = await sendWsRender(
						self.config.host + ':' + self.config.portDeamon,
						JSON.stringify(jsonCommand),
					)
					self.log('debug', `result: ${JSON.stringify(result)}`)

					if (result.success) {
						self.log('debug', `Action executed successfully: ${result.msg}`)
					} else {
						self.log('error', `No valid response received: ${result.msg}`)
					}
				} catch (err) {
					console.error('Error executing action:', err)
				}
			},
		},
		startAstonApp: {
			name: 'Start Aston',
			options: [
				{
					id: 'appId',
					type: 'textinput',
					label: 'App ID',
					default: 'Suite60',
				},
				{
					id: 'scheme',
					type: 'dropdown',
					label: 'Scheme',
					default: 'Default',
					choices: [
						{ id: 'Default', label: 'Edit' },
						{ id: 'Playout', label: 'Playout' },
					],
				},
				{
					id: 'project',
					type: 'textinput',
					label: 'Project/Version',
					default: '',
				},
				{
					id: 'autoOk',
					type: 'checkbox',
					label: 'Auto OK',
					default: false,
				},
				{
					id: 'allowInstances',
					type: 'checkbox',
					label: 'Multiple Instances',
					default: false,
				},
			],
			callback: async (event) => {
				try {
					const jsonCommand: {
						action: string
						id: string
						layout?: string
						layout_scheme?: string
						arguments?: string
						open_all?: string
						kill?: string
					} = {
						action: 'start_app',
						id: String(event.options.appId || 'suite60'),
						layout: 'Aston',
						layout_scheme: typeof event.options.scheme === 'string' ? event.options.scheme : 'Default',
					}

					if (event.options.project !== '') {
						jsonCommand.open_all = String(event.options.project)
					}

					let args = ''
					// Si autoOk está marcado, lo añadimos
					if (event.options.autoOk === true) {
						args += ' -G20'
					}

					if (event.options.allowInstances === true) {
						args += ' -G32'
						jsonCommand.kill = 'false'
					} else {
						jsonCommand.kill = 'true'
					}

					args = args.trim()
					jsonCommand.arguments = args

					self.log('debug', `jsonCommand: ${JSON.stringify(jsonCommand)}`)

					// Call sendWsRender and handle the result
					const result: { success: boolean; msg: string } = await sendWsRender(
						self.config.host + ':' + self.config.portDeamon,
						JSON.stringify(jsonCommand),
					)
					self.log('debug', `result: ${JSON.stringify(result)}`)

					if (result.success) {
						self.log('debug', `Action executed successfully: ${result.msg}`)
					} else {
						self.log('error', `No valid response received: ${result.msg}`)
					}
				} catch (err) {
					console.error('Error executing action:', err)
				}
			},
		},
		startEdisonApp: {
			name: 'Start Edison',
			options: [
				{
					id: 'appId',
					type: 'textinput',
					label: 'App ID',
					default: 'Edison60',
				},
				{
					id: 'scheme',
					type: 'dropdown',
					label: 'Scheme',
					default: 'EdisonDefault',
					choices: [
						{ id: 'EdisonDefault', label: 'Edit' },
						{ id: 'EdisonPresenter', label: 'Presentation' },
					],
				},
				{
					id: 'project',
					type: 'textinput',
					label: 'Project/Version',
					default: '',
				},
				{
					id: 'autoOk',
					type: 'checkbox',
					label: 'Auto OK',
					default: false,
				},
				{
					id: 'allowInstances',
					type: 'checkbox',
					label: 'Multiple Instances',
					default: false,
				},
			],
			callback: async (event) => {
				try {
					const jsonCommand: {
						action: string
						id: string
						layout?: string
						layout_scheme?: string
						arguments?: string
						open_all?: string
						kill?: string
					} = {
						action: 'start_app',
						id: String(event.options.appId || 'suite60'),
						layout: 'Edison',
						layout_scheme: typeof event.options.scheme === 'string' ? event.options.scheme : 'Default',
					}

					if (event.options.project !== '') {
						jsonCommand.open_all = String(event.options.project)
					}

					let args = ''
					// Si autoOk está marcado, lo añadimos
					if (event.options.autoOk === true) {
						args += ' -G20'
					}

					if (event.options.allowInstances === true) {
						args += ' -G32'
						jsonCommand.kill = 'false'
					} else {
						jsonCommand.kill = 'true'
					}

					args = args.trim()
					jsonCommand.arguments = args

					self.log('debug', `jsonCommand: ${JSON.stringify(jsonCommand)}`)

					// Call sendWsRender and handle the result
					const result: { success: boolean; msg: string } = await sendWsRender(
						self.config.host + ':' + self.config.portDeamon,
						JSON.stringify(jsonCommand),
					)
					self.log('debug', `result: ${JSON.stringify(result)}`)

					if (result.success) {
						self.log('debug', `Action executed successfully: ${result.msg}`)
					} else {
						self.log('error', `No valid response received: ${result.msg}`)
					}
				} catch (err) {
					console.error('Error executing action:', err)
				}
			},
		},
		startStudioApp: {
			name: 'Start eStudio',
			options: [
				{
					id: 'appId',
					type: 'textinput',
					label: 'App ID',
					default: 'Suite60',
				},
				{
					id: 'project',
					type: 'textinput',
					label: 'Project/Version',
					default: '',
				},
				{
					id: 'autoOk',
					type: 'checkbox',
					label: 'Auto OK',
					default: false,
				},
				{
					id: 'allowInstances',
					type: 'checkbox',
					label: 'Multiple Instances',
					default: false,
				},
			],
			callback: async (event) => {
				try {
					const jsonCommand: {
						action: string
						id: string
						layout?: string
						arguments?: string
						open_all?: string
						kill?: string
					} = {
						action: 'start_app',
						id: String(event.options.appId || 'suite60'),
						layout: 'Classic',
					}

					if (event.options.project !== '') {
						jsonCommand.open_all = String(event.options.project)
					}

					let args = ''
					// Si autoOk está marcado, lo añadimos
					if (event.options.autoOk === true) {
						args += ' -G20'
					}

					if (event.options.allowInstances === true) {
						args += ' -G32'
						jsonCommand.kill = 'false'
					} else {
						jsonCommand.kill = 'true'
					}

					args = args.trim()
					jsonCommand.arguments = args

					self.log('debug', `jsonCommand: ${JSON.stringify(jsonCommand)}`)

					// Call sendWsRender and handle the result
					const result: { success: boolean; msg: string } = await sendWsRender(
						self.config.host + ':' + self.config.portDeamon,
						JSON.stringify(jsonCommand),
					)
					self.log('debug', `result: ${JSON.stringify(result)}`)

					if (result.success) {
						self.log('debug', `Action executed successfully: ${result.msg}`)
					} else {
						self.log('error', `No valid response received: ${result.msg}`)
					}
				} catch (err) {
					console.error('Error executing action:', err)
				}
			},
		},
		stopApp: {
			name: 'Stop App',
			options: [],
			callback: async () => {
				try {
					const jsonCommand: { action: string; id: string } = {
						action: 'stop_app',
						id: 'stop',
					}

					self.log('debug', `jsonCommand: ${JSON.stringify(jsonCommand)}`)

					// Llamar a sendWsRender y manejar el resultado
					const result: { success: boolean; msg: string } = await sendWsRender(
						self.config.host + ':' + self.config.portDeamon,
						JSON.stringify(jsonCommand),
					)
					self.log('debug', `result: ${JSON.stringify(result)}`)

					// Manejo de éxito o error
					if (result.success) {
						self.log('debug', `Acción ejecutada con éxito: ${result.msg}`)
					} else {
						self.log('error', `No se recibió respuesta válida: ${result.msg}`)
					}
				} catch (err) {
					console.error('Error al ejecutar acción:', err)
				}
			},
		},
		actions: {
			name: 'Run Action',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Action Number',
					default: 1,
					min: 1,
					max: 512,
				},
			],
			callback: async (event) => {
				try {
					const action = (Number(event.options.num) || 1) - 1
					const inContext = 'VSet1' // o el contexto que uses dinámicamente

					// Actualizar una variable desde actions.ts
					SetVariableValue(self, 'variable1', `Action triggered with value: ${event.options.num}`)
					// self.checkFeedbacks()

					const jsonCommand = getJsonCommand('slotRunAction', inContext, 'VSetAPI.Actions.slotRunAction', [
						Number(action),
					])
					self.log('debug', `jsonCommand: ${JSON.stringify(jsonCommand)}`)

					// Llamar a sendWsRender y manejar el resultado
					const result: { success: boolean; msg: string } = await sendWsRender(
						self.config.host + ':' + self.config.port,
						jsonCommand,
					)
					self.log('debug', `result: ${JSON.stringify(result)}`)

					// Manejo de éxito o error
					if (result.success) {
						self.log('debug', `Acción ejecutada con éxito: ${result.msg}`)
					} else {
						self.log('error', `No se recibió respuesta válida: ${result.msg}`)
					}
				} catch (err) {
					console.error('Error al ejecutar acción:', err)
				}
			},
		},
		custom: {
			name: 'Configure Itemset',
			options: [
				{
					id: 'itemset',
					type: 'textinput',
					label: 'Custom itemset',
					default: 'itemset("<>Edit", "PIPE_AXIS", not itemget("<>Edit", "PIPE_AXIS"))',
				},
			],
			callback: async (event) => {
				try {
					const itemsetCommand = event.options.itemset || ''

					self.log('debug', `jsonCommand: ${itemsetCommand}`)

					// Llamar a sendWsRender y manejar el resultado
					const result: { success: boolean; msg: string } = await sendWsRender(
						self.config.host + ':' + self.config.port,
						itemsetCommand as string,
					)
					self.log('debug', `result: ${JSON.stringify(result)}`)

					// Manejo de éxito o error
					if (result.success) {
						self.log('debug', `Acción ejecutada con éxito: ${result.msg}`)
					} else {
						self.log('error', `No se recibió respuesta válida: ${result.msg}`)
					}
				} catch (err) {
					console.error('Error al ejecutar acción:', err)
				}
			},
		},
	})
}
