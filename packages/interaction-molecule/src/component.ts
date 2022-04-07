export interface EmptyComponent {}

export interface Component extends EmptyComponent {
  on(eventName: string, callback: <D>(data: D) => void);
}
