import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	port: number
	portDeamon: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 8,
			regex: Regex.IP,
		},
		{
			type: 'number',
			id: 'port',
			label: 'Target Port',
			width: 3,
			min: 1,
			max: 65535,
			default: 55123,
		},
		{
			type: 'number',
			id: 'portDeamon',
			label: 'Daemon Port',
			width: 3,
			min: 1,
			max: 65535,
			default: 54200,
		},
	]
}
