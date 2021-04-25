import {getFlatDataFromTree} from "react-sortable-tree";


const getFlatDepartmentFromTree =(treeData) =>{

    const flatData = getFlatDataFromTree({
        treeData: treeData,
        getNodeKey: ({treeIndex}) => treeIndex,
        ignoreCollapsed: true,
    })

    console.log(flatData)

    let newArray = []
    flatData.forEach((item) => {
        if (item.parentNode != null) {
            newArray.push(
                {
                    expanded: item.node.expanded,
                    parentNode: item.parentNode.id,
                    id: item.node.id,
                    title: item.node.title,
                    treeIndex: item.treeIndex
                }
            )
        } else {
            newArray.push({
                expanded: item.node.expanded,
                parentNode: 0,
                id: item.node.id,
                title: item.node.title,
                treeIndex: item.treeIndex,
            })
        }
    })

    return newArray
}
export default getFlatDepartmentFromTree