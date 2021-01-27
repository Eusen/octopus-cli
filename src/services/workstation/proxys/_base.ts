export abstract class WorkstationCreatorBase {
  constructor(public name: string) {
  }

  abstract create(): Promise<void>;
}
