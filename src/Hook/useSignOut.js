import {useContext, useEffect} from 'react';
import CloudBase_Context from "../Context/Context_Info/CloudBase_Context";
import {useHistory, useLocation} from "react-router-dom";


const useSignOut = () => {
    const location = useLocation();
    const history = useHistory()
    const CloudBase = useContext(CloudBase_Context)

    // useEffect(() => {
    //     const Location_Group = location.pathname.split('/').filter((item, index) => {
    //         return item;
    //     })
    //
    //     const result = Location_Group.find((item) => {
    //         return item === 'Main'
    //     })
    //
    //     if (!result) {
    //         console.log('进入 !Main页面')
    //         const loginState = CloudBase.auth.hasLoginState();
    //         if (loginState) {
    //             console.log('has login state')
    //             CloudBase.auth.signOut()
    //
    //         } else {
    //             console.log('do not has login state,do nothing')
    //         }
    //     } else {
    //         console.log('进入Main页面')
    //         let oldTime = new Date().getTime();
    //         let newTime = new Date().getTime();
    //         //1分钟
    //         let outTime = 5 * 60 * 1000;
    //         // let outTime = 1000;
    //
    //         const listener = () =>{
    //             oldTime = new Date().getTime()
    //         }
    //         window.document.addEventListener("mousemove", listener)
    //         const Timer = window.setInterval(() => {
    //             newTime = new Date().getTime()
    //             if (newTime - oldTime > outTime) {
    //                 console.log('执行自动登出')
    //                 CloudBase.auth.signOut()
    //                 window.clearInterval(Timer)
    //                 window.document.removeEventListener('mousemove',listener)
    //                 history.push('/')
    //             }
    //         }, 5000)
    //     }
    //
    // }, []);
}

export default useSignOut