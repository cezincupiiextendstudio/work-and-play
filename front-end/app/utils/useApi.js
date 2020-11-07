const BASE_URL = 'https://work-and-play.herokuapp.com/api/';

export const useApi = async ({
  url,
  method = 'GET',
  body = {},
  publicRoute = false,
}) => {
  const apiResponse = {
    error: '',
    data: Object(),
    ok: Boolean(),
  };

  const canDo = true;

  // if (!publicRoute) {
  //   if (getExpiresAt() < new Date()) {
  //     canDo = await getAccessTokenFromRT();
  //   }
  // }

  if (canDo) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ0b2tlbl92ZXJzaW9uIjo2LCJleHAiOjE2MDQ5NDEyNzEsImlhdCI6MTYwNDc2ODE3MX0.vggK8O2jU8AV41gVxPcJg-738chCGuc6o7MYb-C4p4w`,

        'X-CSRFToken':
          'ZOHjHcafzTKzROFBTYpy3IkfgRe9oatsFrFUTZ0Hsm2DaRjsaX9Q0jcsHxb0DiHx',
      },
      credentials: 'include',
    };

    if (method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${BASE_URL + url}`, options).catch(err => {
        console.log('fetch: ', err);
      });

      if (response) {
        apiResponse.ok = response.ok;
        if (response.ok) {
          apiResponse.data = await response.json();
        } else {
          apiResponse.error = await response.json();
        }
      }
    } catch (error) {
      console.log('fetch err: ', error);
    }
  }

  return apiResponse;
};
