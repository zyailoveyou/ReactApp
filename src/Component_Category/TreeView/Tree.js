import React,{useState} from 'react';
import Box from "@material-ui/core/Box";
import 'react-sortable-tree/style.css';
import SortableTree from 'react-sortable-tree';
import './tree.css'
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";
// import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import FileExplorerTheme from 'react-sortable-tree-theme-solverboard';



const useStyles = makeStyles({
    test: {
        width: '100%',
        // background:theme.palette.primary.main

    },
});

const Tree = (props) => {
    const [treeData,setTreeData] = useState([
        { title: 'src/', children:  [{ title: 'index.js' }] },

    ])
    const nodeClicked = (rowInfo)=>{
        console.log(rowInfo)
    }
    const classes = useStyles()
    return (
        <Box style={{
            height:400
        }}>
            <SortableTree
                treeData={treeData}
                onChange={treeData => setTreeData( treeData )}
                innerStyle={{
                    // fontSize:'2rem'
                }}
                // generateNodeProps={
                //     (rowInfo)=>{
                //         return (
                //             {
                //                 className:classes.test,
                //
                //             }
                //         )
                //
                //     }
                //
                // }


                // style={{
                //     // background: 'red'
                // }}
                // innerStyle={{
                //     // background: 'red'
                // }}

                // getNodeKey={({ node }) => {
                //     console.log(node)
                // }}
                // generateNodeProps={
                //     rowInfo => ({
                //     })
                // }



            />
        </Box>
    );
};

export default Tree;
