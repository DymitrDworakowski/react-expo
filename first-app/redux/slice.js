import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   login: "ams_dd",
//   password: "123Qwe",
//   deviceId: "",
//   appVersion: "",
//   token: "",
// };

export const authSlice = createSlice({
  name: "auth",
  initialState:{
    login: "ams_dd",
    password: "123Qwe",
    deviceId: "",
    appVersion: "",
    token: "",
  },
  reducers: {
    userLogin: (state, action) => {
      state.login = action.payload;
    },
    userPassword: (state, action) => {
      state.password = action.payload;
    },
    userDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
    userAppVersion: (state, action) => {
      state.appVersion = action.payload;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },
  },
});


export const locationSlice = createSlice({
    name: "location",
    initialState:{
        locations: "",
    },
    reducers: {
      setLocation: (state, action) => {
        state.setLocations = action.payload;
      },
    },
  }
);