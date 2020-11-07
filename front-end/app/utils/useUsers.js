import { useApi } from './useApi';
const login = async (email, password) => {
  const response = {
    ok: Boolean(),
    error: Object(),
    data: Object(),
  };

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { apiResponse } = await useApi({
      url: 'auth/login/',
      method: 'POST',
      body: {
        email,
        password,
      },
      publicRoute: true,
    });

    response.ok = apiResponse.ok;

    if (!apiResponse.ok) {
      response.error = apiResponse.error;
    } else {
      response.data = apiResponse.data;
      // setAccessToken(response.data.access_token);
      // setExpiresAt(addMinutes(response.data.access_token_lifetime));
      // setUser(response.data.user);
      //
      // if (response.data.refresh_token) {
      //   setRefreshToken(response.data.refresh_token);
      // }
    }
  } catch (error) {
    console.log('Login err: ', error);
    response.ok = false;
  }
  return response;
};

export default login;
