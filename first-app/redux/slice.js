import { createSlice } from "@reduxjs/toolkit";

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
        locations: [],
    },
    reducers: {
      setLocation: (state, action) => {
        state.locations = action.payload;
      },
    },
  }
);

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    withPhotos: false,
    withActiveDiscounts: false,
    name: "",
    price: { from: 0, to: 0 },
    commodityGroup: "",
    categories: [],
    producers: [],
    sexList: [],
    sizes: [],
  },
  reducers: {
    setProducers: (state, action) => {
      state.producers = [action.payload] || [];
    },
    setCategories: (state, action) => {
      state.categories = [action.payload]|| [];
    },
    setSexList: (state, action) => {
      state.sexList = [action.payload] || [];
    },
    setSizes: (state, action) => {
      state.sizes = [action.payload] || [];
    },
    setTypes: (state, action) => {
      state.commodityGroup = [action.payload] || [];
    },
  },
});