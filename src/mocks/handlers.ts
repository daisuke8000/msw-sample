import { graphql, GraphQLVariables } from 'msw';

export const handlers = [
  graphql.query('GetUserInfo', (req, res, ctx) => {
    const authenticatedUser = sessionStorage.getItem('is-authenticated');
    if (!authenticatedUser) {
      return res(
        ctx.status(400),
        ctx.errors([
          {
            message: 'Not authenticated',
            errorType: 'AuthenticationError',
          },
        ])
      );
    }
    return res(
      ctx.status(200),
      ctx.data({
        user: {
          auth: authenticatedUser,
          firstname: 'USER_FIRSTNAME',
          lastname: 'USER_LASTNAME',
        },
      })
    );
  }),

  graphql.mutation('Login', (req, res, ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const username: string = req.variables.username;
    sessionStorage.setItem('is-authenticated', username);
    return res(
      ctx.status(201),
      ctx.data({
        login: {
          username,
        },
      })
    );
  }),
];
