
export namespace TodoAction {
  export class GetAll {
    static readonly type = "[Todo] GetAll";
  }
  export class Post {
    static readonly type ="[Todo] Post";
    constructor(
      public payload: {
        title: string,
        body: string
      }
    ) {}
  }
}
