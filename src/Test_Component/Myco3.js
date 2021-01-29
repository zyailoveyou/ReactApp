import React, { useState, useCallback } from "react";
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
    env: "good-5gou5n09e975182b"
});
// 1. 获取数据库引用
const db = app.database();

// 2. 模拟事务操作
function main() {
    app.callFunction({
        name:'kof',
        data:'12312312'
    }).then((res)=>{
        const result  =res.result
        console.log(result)
    })
}






function MomentLocalizationExample() {

    main()
    return (
        <div>123123</div>
    );
}

export default MomentLocalizationExample;