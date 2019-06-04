import axios from 'axios';
import config from '../../config';

const state = {
    apps: [],
    appCount: null
  };
  

  
  const actions = {
    getApps ({ commit }) {
        axios.get("apps/").then(({ data }) => {
            if (data){
              this.state.apps = data.results;
              this.state.appCount = data.count;
            }
           
          })
          .catch(() =>{
            //emitAlert("error", "Could not communicate with the backend!");
          })
    },
    updateApp (state, data ){
        axios.patch("apps/" + data.id + "/", data )
        .then(({ data }) => {
          this.success = true;
           // emitAlert(
           //   "success",
           //   "Proxy application " +
           //   data.name + "has been edited!"
           // );
        })
    },
  };
  
  const mutations = {
    UPDATE_APPS (state, apps){
        state.apps = apps

    }
  };
  
  export default {
    state,
    actions,
    mutations
  };
  