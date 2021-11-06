export abstract class IHealthService {
  abstract getText(): Promise<string>;
}
