import { Connectable, Switchable } from './contracts'
import { SmartDevice } from './smart-device'

export class SmartLamp extends SmartDevice implements Switchable, Connectable {
  isConnected(): boolean {
    throw new Error('Method not implemented.')
  }
  connect(): void {
    throw new Error('Method not implemented.')
  }
  disconnect(): void {
    throw new Error('Method not implemented.')
  }
  isTurnedOn(): boolean {
    throw new Error('Method not implemented.')
  }
  turnOn(): void {
    throw new Error('Method not implemented.')
  }
  turnOff(): void {
    throw new Error('Method not implemented.')
  }
}
