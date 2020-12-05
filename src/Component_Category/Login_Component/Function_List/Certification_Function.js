const Certification  ={

    Certify_Email:function(email){
        const key = /[a-zA-z1-9.-]+@[a-zA-z1-9]+.(com|edu)$/
        if (email === ''){
            return 1
        }
        else {
            if (key.test(email)){
                return 0
            }
            else {
                return 2
            }
        }


    },


    Certify_Password : function (Password,Certification_Password) {
        const key = /(?=.*[a-zA-z]{2,})^[a-z0-9A-z-]{8,16}$/
        if (Password === "") {
            return 1
        }
        else {
            if(key.test(Password))
            {
                if (Certification_Password !== Password){
                    return 2
                }
            }
            else {
                if(!key.test(Password)){
                    return 3
                }
            }
        }
        return 0
    },


    Certify_Confirm_Password: function (Certification_Password,Password) {
        if (Certification_Password === "") {
            return 1
        }
        else {
            if (Certification_Password !== Password){
                return 2
            }
        }
        return 0
    }
}

export default Certification