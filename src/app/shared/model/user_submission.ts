export class UserSubmission {
  constructor(
    public userId: number,
    public questionId: number,
    public submittedAnswerId: number,
    public status: string,
    public lifelines: string[]
  ) {}
}
