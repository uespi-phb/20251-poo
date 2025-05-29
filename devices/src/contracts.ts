export interface Switchable {
  isTurnedOn(): boolean
  turnOn(): void
  turnOff(): void
}

export interface Connectable {
  isConnected(): boolean
  connect(): void
  disconnect(): void
}

export interface Printable {
  print(): void
}

export interface Programmable {
  isScheduled(): boolean
  schedule(timeOn: Date, timeOff: Date): void
}
