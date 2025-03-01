// const URL = 'http://localhost:5000/library/admin/accounts'
describe("#AdminController Test", () => {
  test("#getAllUsers, sholud be return a list of users separated by roles", (done) => {
    const expected = [
      {
        users_admin: [
          {
            id: 4,
            name: "Igreja Batista do Henrique Jorge",
            email: "ibhj@dev.com.br",
            role: "admin",
          },
          {
            id: 1,
            name: "Isabelle",
            email: "bel@dev.com.br",
            role: "admin",
          },
        ],
        users_default: [
          {
            id: 3,
            name: "leo",
            email: "leo@dev.com.br",
            role: "default",
          },
        ],
        users_owner: [
          {
            id: 2,
            name: "Eric",
            email: "eric@dev.com.br",
            role: "owner",
          },
        ],
        total_users: 4,
      },
    ];
  });
  test.todo("#updateUserRole, sholud be update a user");

  class ResponseMock {
    private jsonMock: any;

    json(value: any) {
      this.jsonMock = value;
    }

    status(value: any) {
      return this;
    }
  }
});
