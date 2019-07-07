


//const API_PATH = '/api/'

function getHeaders(jsonFormat){


  const headers = {'Access-Control-Allow-Origin' : '*',
      'X-Requested-With' : 'XMLHttpRequest',
      'Content-Type': jsonFormat ? 'application/json' : 'application/x-www-form-urlencoded'
  }

  const optionsHeaders = {
    headers,
    credentials: 'same-origin' //'include'  //
  };

  return optionsHeaders;
}

function getHeadersMultipart(){



  const headers = {'Access-Control-Allow-Origin' : '*',
    'X-Requested-With' : 'XMLHttpRequest'
  }

  const optionsHeaders = {
    headers,
    credentials: 'same-origin' //'include'  //
  };

  return optionsHeaders;
}


export default class ApiUtils {

  static getServer(url) {
    const {location} = window;
    // API_PATH +
    return location.protocol+'//'+location.host  +  url;
  }

  static  handleResponse(response) {
    return response.json()
        .then(data => {
           if (!response.ok) {
            if (response.status === 401) {
              // auto logout if 401 response returned from api
              //ApiUtils.logout();
            }
            const error = (response && response.errors) || (data && data.message) || response.statusText;
            return Promise.reject(error, response.status);
          }
          return data;
        });
  }

  static logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  }

  static doPostMultipart(url, body) {

    const requestOptions = {
      method: 'POST',
      ...getHeadersMultipart(),
      body: body
    };

    return fetch(url, requestOptions).then(ApiUtils.handleResponse);
  }

  static doPost(url, body, jsonFormat = false, token) {

    const requestOptions = {
      method: 'POST',
      ...getHeaders(jsonFormat, token),
      body: body
    };

    return fetch(this.getServer(url), requestOptions).then(ApiUtils.handleResponse);
  }

  static doGet(url, body, jsonFormat = false) {

    const requestOptions = {
      method: 'GET',
      ...getHeaders(jsonFormat),
    };

    //return fetch(ApiUtils.getServer(url), requestOptions).then(ApiUtils.handleResponse);
    return fetch(url, requestOptions).then(ApiUtils.handleResponse);
  }

  static doPut(url, body, jsonFormat = false) {
    const requestOptions = {
      method: 'PUT',
      ...getHeaders(jsonFormat),
      body: body
    };

    return fetch(url, requestOptions).then(ApiUtils.handleResponse);
  }

  static doDelete(url, jsonFormat = false) {
    const requestOptions = {
      method: 'DELETE',
      ...getHeaders(jsonFormat),
    };

    return fetch(url, requestOptions).then(ApiUtils.handleResponse);
  }

}