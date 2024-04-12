import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const loginAms = createAsyncThunk("login/getToken",
asyns(requestData, thunkAPI) => {
    try{
        const res = await axios.post("https://apps.intersport.pl/ams/api/v2/auth/token", requestData)
     return res.data;
    } catch(err){
        return thunkAPI.rejectWithValue(error.message);
    }
}

)

// const auth = () => {
//     const requestData = {
//       login,
//       password,
//       deviceId,
//       appVersion,
//     };

//     axios
//       .post("https://apps.intersport.pl/ams/api/v2/auth/token", requestData)
//       .then(response => {
//         const token = response.data.token;
//         dispatch(userToken(token))
//         console.log(response.data);
       
//         navigation.navigate('Locations');
//     })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Error fetching data");
//       });
//   };