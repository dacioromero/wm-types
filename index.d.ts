interface IEventListener<T extends Event = Event> {
  (evt: T): void
}

interface IEventListenerObject<T extends Event = Event> {
  handleEvent(evt: T): void
}

type IEventListenerOrListenerObject<T extends Event = Event> =
  | IEventListener<T>
  | IEventListenerObject<T>

export interface MonetizationEventDetail {
  paymentPointer: string
  requestId: string
}

export interface MonetizationProgressEventDetail extends MonetizationEventDetail {
  finalized: boolean
}

export interface MonetizationProgressEventDetail extends MonetizationEventDetail {
  amount: string
  assetCode: string
  assetScale: number
}

export type MonetizationEvent = CustomEvent<MonetizationEventDetail>

export type MonetizationPendingEvent = MonetizationEvent
export type MonetizationStartEvent = MonetizationEvent
export type MonetizationStopEvent = CustomEvent<MonetizationProgressEventDetail>
export type MonetizationProgressEvent = CustomEvent<MonetizationProgressEventDetail>

export interface MonetizationEventMap {
  monetizationpending: MonetizationPendingEvent
  monetizationstart: MonetizationStartEvent
  monetizationstop: MonetizationStopEvent
  monetizationprogress: MonetizationProgressEvent
}

export type MonetizationState = 'stopped' | 'pending' | 'started'

// Most implementations use a div rather instead of a plain EventTarget
export interface Monetization extends EventTarget {
  state: MonetizationState

  addEventListener<T extends keyof MonetizationEventMap>(
    type: T,
    listener: IEventListenerOrListenerObject<MonetizationEventMap[T]> | null,
    options?: boolean | AddEventListenerOptions
  ): void

  removeEventListener<T extends keyof MonetizationEventMap>(
    type: T,
    listener: IEventListenerOrListenerObject<MonetizationEventMap[T]> | null,
    options?: EventListenerOptions | boolean
  ): void
}

declare global {
  interface Document {
    monetization?: Monetization
  }
}
