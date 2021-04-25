import React from 'react';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';

const Myco = (props) => {
    let {testgroup,setRefresh}= props
    return (
        <Box>
            this is myco
            <Button onClick={()=>{
                let temper = testgroup.test1
                console.log(temper)
                temper = temper +1
                console.log(temper)
                testgroup.test1 = temper
                console.log('this is second')
                console.log(testgroup)
                setRefresh((pre)=>{
                    return !pre
                })
            }}>button</Button>
        </Box>
    );
};

export default Myco;
