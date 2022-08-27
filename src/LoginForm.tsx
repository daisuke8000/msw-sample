import React, { useCallback, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const LOG_IN = gql`
  mutation Login($username: String!) {
    login(username: $username) {
      username
    }
  }
`;

interface LoginSessionDetails {
  id: number;
  username: string;
}

// login form
export const LoginForm = () => {
  const [username, setUserName] = useState('');
  // mutation
  const [Login, { data, loading, error }] = useMutation<{ Login: LoginSessionDetails }, { username: string }>(LOG_IN, {
    variables: { username },
  });

  const handleUsernameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }, []);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      Login({
        variables: {
          username,
        },
      }).catch((err) => console.log(err));
    },
    [username, Login]
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while fetching the user data ({error.message})</p>;
  }

  if (data) {
    return <UserInfo />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input id='username' name='username' value={username} onChange={handleUsernameChange} />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

interface UserInfo {
  firstname: string;
  lastname: string;
}

interface User {
  user: UserInfo;
}

const GET_USER_INFO = gql`
  query GetUserInfo {
    user {
      firstname
      lastname
    }
  }
`;

const UserInfo = () => {
  // queries
  const { loading, data, error } = useQuery<User>(GET_USER_INFO);

  if (loading) return <p>Loading ...</p>;

  return (
    <>
      {data && (
        <>
          <h3>FirstName:</h3>
          <div>{data.user.firstname}</div>
          <h3>LastName:</h3>
          <div>{data.user.lastname}</div>
        </>
      )}
      {error && (
        <>
          <div>{error.message}</div>
        </>
      )}
    </>
  );
};
