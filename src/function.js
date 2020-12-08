import Orientation from 'react-native-orientation-locker';

class Function {
  setData(urlnya, formdatanya){
    fetch(urlnya,{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdatanya
    })
  }

  getData(urlnya, formdatanya){
    return fetch(urlnya)
  }

  async fetchData(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()
    return json;
  }

  lockScreen(name){
    if (name == 'portrait'){
      // Orientation.removeOrientationListener();    
      // Orientation.removeDeviceOrientationListener();    
      // Orientation.removeLockListener();    
      Orientation.lockToPortrait();    
    }else{
      Orientation.unlockAllOrientations();          
    }
  }

}

const funct = new Function();
export default funct;