
import ApiUtils from '../utils/ApiUtils'
import keys from 'lodash/keys'
import isObject from 'lodash/isObject'

const endPoints = {
  STATUS: '/api/status',
};

function getUrlPath(...data){

  const urlParams =  data && data.length > 0 ?  [...data].pop() : null;
  const _data = urlParams && isObject(urlParams) ?  data.slice(0, data.length -1) : data;
  const newParams =  urlParams && isObject(urlParams) ?  keys(urlParams).map(key=> key + '=' + urlParams[key]).join('&') : '';
  return _data.filter(item => !!item).join('/') + (newParams && newParams.length > 0 ? '?' + newParams: '' );
}

export default class Service {




  /// boats


  static getAllStatus() {
    const urlPath = getUrlPath(endPoints.STATUS);
    return ApiUtils.doGet(urlPath);
  }

  static getStatus( id) {
    const urlPath = getUrlPath(endPoints.STATUS, id);
    return ApiUtils.doGet(urlPath);
  }

  static addStatus(status) {
    const params = JSON.stringify({status});
    const urlPath = getUrlPath(endPoints.STATUS);
    return ApiUtils.doPost(urlPath, params, true);
  }

  static updateStatus( status) {
    const params = JSON.stringify({status});
    const urlPath = getUrlPath(endPoints.STATUS, status);
    return ApiUtils.doPut(urlPath, params, true);
  }

  static deleteStatus(id) {
    const urlPath = getUrlPath(endPoints.STATUS, id);
    return ApiUtils.doDelete(urlPath);
  }



}