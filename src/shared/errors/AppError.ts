export default class AppError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {}
}
