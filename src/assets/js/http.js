import axios from 'axios';
import Vue from 'vue';
import qs from 'qs';

axios.defaults.timeout = 200000;
axios.defaults.baseURL = '/zwzzj';

axios.defaults.withCredentials = true; // 意思是携带cookie 信息，保持session一致

let loading; // 加载框

// http request 拦截器
axios.interceptors.request.use(config => {
  // loading = Loading.service({
  //   fullscreen: true,
  //   text: '拼命加载中',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.8)'
  // });
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(response => {
  // loading.close();
  if (response.status !== 200) {
    Message({
      message: response.data.message,
      center: true,
      type: 'error',
      duration: 1500,
      customClass: 'xz-alert-common'
    });
  }
  return response;
}, error => {
  // loading.close();
  return Promise.reject(error);
});


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  let URL = url;
  if (params) {
    for (const key in params) {
      URL += params[key] + "/";
    }
    URL = URL.substr(0, URL.length - 1);
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: URL,
      // params:params,
      withCredentials: true
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    });
  })
}


export function exportFn(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: params,
      withCredentials: true
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    })
  })
}

/**
 * 封装get请求
 * 参数放在body内
 * @param url
 * @param params
 * @constructor
 */
export function POSTbyJSON(url, data = {}) {
  console.log(data);
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;'
      },
      transformRequest: [function(fData, headers) {
        // console.log(fData);
        headers['Content-Type'] = 'application/json'
        return JSON.stringify(qs.parse(fData));
      }]
    }).then(function(response) {
      resolve(response.data)
    }).catch(err => {
      reject(err);
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  // let d = qs.parse(data);
  // console.log(d);
  // let params = new URLSearchParams();
  // for(let key in data){
  //     if(Array.isArray(data[key])){
  //         for(let val in data[key]){
  //             params.append(key,data[key][val])
  //         }
  //     }else{
  //         params.append(key,data[key]);
  //     }
  // }
  // let params = qs.stringify(data,{ allowDots: true });
  // params.append("roleIds",'2');

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      withCredentials: true,
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'repeat'
        });
      }
    }).then(response => {
      // debugger
      resolve(response.data);
    }, err => {
      reject(err)
    })
  })
}

//post请求
export function requestPost(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
};

//post请求
export function requestPostForm(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      resolve(res.data) //注意res是axios封装的对象，res.data才是服务端返回的信息
    }).catch(error => {
      reject(error)
    })
  })
};

/**
 * 封装delete请求
 * url 地址
 * data 参数  一般是数组
 */
export function Delete(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: data,
      withCredentials: true,
      paramsSerializer: params => {
        return qs.stringify(params, {
          indices: false
        })
      }
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    })
  })
};


/**
 * 封装post请求
 * 审核
 * url 地址
 * data 参数  一般是数组
 */
export function POSTByAudit(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, {
      params: params,
      withCredentials: true,
      paramsSerializer: params => {
        return qs.stringify(params, {
          indices: false
        })
      }
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    })
  })
};

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * ajax请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function ajaxPost(url, data = {}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: apiConfig() + url,
      data: data,
      dataType: "json",
      type: "post",
      success: function(data) {
        resolve(data);
      },
      error: function(err) {
        reject(err);
      }
    });
  })
}
