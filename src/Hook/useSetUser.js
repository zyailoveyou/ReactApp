import React, {useState} from 'react';
import User_Data from "../Context/Data/User_Data";

const useSetUser = (userData) => {
    const [User, SetUser] = useState(User_Data);

    const setData = (data_name, data) => {
        SetUser((prevCorporation) => {
            return {...prevCorporation, [data_name]: data};
        })
    }
};

export default useSetUser;
