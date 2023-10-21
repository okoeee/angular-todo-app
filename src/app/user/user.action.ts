
export namespace UserAction {
  export class Verify {
    static readonly type = "[User] Verify"
  }
  export class Login {
    static readonly type = "[User] Login"
    constructor(
      public payload: {
        email: string,
        password: string
      }
    ) {}
  }
  export class Logout {
    static readonly type = "[User] Logout"
  }
}
