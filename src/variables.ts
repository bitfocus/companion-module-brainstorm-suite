import type { ModuleInstance } from './main.js'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions([])
}

export function SetVariableValue(self: ModuleInstance, variableId: string, value: string): void {
	self.setVariableValues({ [variableId]: value })
}
