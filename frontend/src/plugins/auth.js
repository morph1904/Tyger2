


export default {
    request(req, token) {
      this.axios.defaults.headers.call(this, req, { Authorization: `JWT  ${token}` });
    },
  
    response(res) {
      if (res.request.responseURL.endsWith('api-token-auth/')) {
        
        //console.log(res.data)
        return res.data;
      }
    }
  };

  