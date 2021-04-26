import React, {Component, useContext, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {isDescendant} from './utils/tree-data-utils';
import classnames from './utils/classnames';
import './node-renderer-default.css';
import TextField from '@material-ui/core/TextField';
import {changeNodeAtPath, getNodeAtPath} from "./utils/tree-data-utils";
import TreeData_Context from "../../../../Context/Context_Info/TreeData_Context";
import Typography from "@material-ui/core/Typography";
import Members_Context from "../../../../Context/Context_Info/Members_Context";
import Grid from "@material-ui/core/Grid";
import CloudBase_Context from "../../../../Context/Context_Info/CloudBase_Context";

const NodeRendererDefault = (props) => {

    const {
        scaffoldBlockPxWidth,
        toggleChildrenVisibility,
        connectDragPreview,
        connectDragSource,
        isDragging,
        canDrop,
        canDrag,
        node,
        title,
        subtitle,
        draggedNode,
        path,
        treeIndex,
        isSearchMatch,
        isSearchFocus,
        buttons,
        className,
        style,
        didDrop,
        treeId,
        isOver, // Not needed, but preserved for other renderers
        parentNode, // Needed for dndManager
        rowDirection,
        ...otherProps
    } = props;
    const [openEdit, setOpenEdit] = useState(false)
    const {treeData, setTreeData} = useContext(TreeData_Context)
    const CloudBase = useContext(CloudBase_Context)
    const {
        nowDepartmentNode,
        setNowDepartmentNode,
        nowDepartmentNodePath,
        nowSelectedMember,
        setNowSelectedMember,
        setNowDepartmentNodePath,
        members,
        setMembers,
        setLoadingAuthority,
        showMembers,
        setShowMembers,
    } = useContext(Members_Context)
    const [inputValue, setInputValue] = useState(node.title)
    const inputRef = useRef()
    const nodeTitle = title || node.title;
    const nodeSubtitle = subtitle || node.subtitle;
    const rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null;


    let handle;
    if (canDrag) {
        if (typeof node.children === 'function' && node.expanded) {
            // Show a loading symbol on the handle when the children are expanded
            //  and yet still defined by a function (a callback to fetch the children)
            handle = (
                <div className="rst__loadingHandle">
                    <div className="rst__loadingCircle">
                        {[...new Array(12)].map((_, index) => (
                            <div
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                className={classnames(
                                    'rst__loadingCirclePoint',
                                    rowDirectionClass
                                )}
                            />
                        ))}
                    </div>
                </div>
            );
        } else {
            // Show the handle used to initiate a drag-and-drop
            handle = connectDragSource(<div className="rst__moveHandle"/>, {
                dropEffect: 'copy',
            });
        }
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    let buttonStyle = {left: -0.5 * scaffoldBlockPxWidth};
    if (rowDirection === 'rtl') {
        buttonStyle = {right: -0.5 * scaffoldBlockPxWidth};
    }

    return (
        <div style={{height: '100%'}} {...otherProps}>
            {toggleChildrenVisibility &&
            node.children &&
            (node.children.length > 0 || typeof node.children === 'function') && (
                <div>
                    <button
                        type="button"
                        aria-label={node.expanded ? 'Collapse' : 'Expand'}
                        className={classnames(
                            node.expanded ? 'rst__collapseButton' : 'rst__expandButton',
                            rowDirectionClass
                        )}
                        style={buttonStyle}
                        onClick={() =>
                            toggleChildrenVisibility({
                                node,
                                path,
                                treeIndex,
                            })
                        }
                    />

                    {node.expanded && !isDragging && (
                        <div
                            style={{width: scaffoldBlockPxWidth}}
                            className={classnames('rst__lineChildren', rowDirectionClass)}
                        />
                    )}
                </div>
            )}

            <div className={classnames('rst__rowWrapper', rowDirectionClass)}>
                {/* Set the row preview to be used during drag and drop */}
                {connectDragPreview(
                    <div
                        className={classnames(
                            'rst__row',
                            isLandingPadActive && 'rst__rowLandingPad',
                            isLandingPadActive && !canDrop && 'rst__rowCancelPad',
                            isSearchMatch && 'rst__rowSearchMatch',
                            isSearchFocus && 'rst__rowSearchFocus',
                            rowDirectionClass,
                            className
                        )}
                        style={{
                            opacity: isDraggedDescendant ? 0.5 : 1,
                            ...style,
                        }}
                    >
                        {handle}

                        <div
                            className={classnames(
                                'rst__rowContents',
                                !canDrag && 'rst__rowContentsDragDisabled',
                                rowDirectionClass
                            )}

                            onClick={() => {
                                console.log('node clicked')
                                console.log(treeData)
                                console.log(node)
                                console.log(path)
                                if (node && node.hasOwnProperty('Members')) {
                                    console.log('enter set Members')
                                    console.log(node)
                                    setNowDepartmentNode(node)
                                    setNowDepartmentNodePath(path)
                                    if (node.Members) {
                                        setNowSelectedMember(node.Members[0])
                                    } else {
                                        setNowSelectedMember(null)
                                    }

                                }
                            }}
                        >
                            <div className={classnames('rst__rowLabel', rowDirectionClass)} style={{
                                cursor: "pointer"
                            }}>
                                {
                                    openEdit ?
                                        <TextField
                                            style={{
                                                width: 120
                                            }}
                                            inputRef={inputRef}
                                            autoFocus={true}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    console.log('enter')
                                                    console.log(e.target.value)
                                                    let changedNode = node
                                                    changedNode.title = e.target.value
                                                    console.log(treeData)
                                                    let newTree = changeNodeAtPath({
                                                        treeData: treeData,
                                                        path: path,
                                                        getNodeKey: ({treeIndex}) => treeIndex,
                                                        newNode: changedNode
                                                    })
                                                    console.log(newTree)
                                                    setTreeData(newTree)
                                                    setOpenEdit(false)
                                                }

                                            }
                                            }
                                            onBlur={(e) => {
                                                console.log('enter')
                                                console.log(e.target.value)
                                                let changedNode = node
                                                changedNode.title = e.target.value
                                                let newTree = changeNodeAtPath({
                                                    treeData: treeData,
                                                    path: path,
                                                    getNodeKey: ({treeIndex}) => treeIndex,
                                                    newNode: changedNode
                                                })
                                                console.log(newTree)
                                                setTreeData(newTree)
                                                setOpenEdit(false)
                                            }
                                            }
                                            onChange={(e) => {
                                                setInputValue(e.target.value)
                                            }}
                                            value={inputValue}
                                        /> :

                                        <Typography variant={"body1"}
                                                    style={{
                                                        marginRight: 50
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        console.log(treeData)
                                                        setOpenEdit(true)
                                                    }}>
                                            {typeof nodeTitle === 'function'
                                                ? nodeTitle({
                                                    node,
                                                    path,
                                                    treeIndex,
                                                })
                                                : nodeTitle}
                                        </Typography>

                                }
                                {nodeSubtitle && (
                                    <span className="rst__rowSubtitle">
                      {typeof nodeSubtitle === 'function'
                          ? nodeSubtitle({
                              node,
                              path,
                              treeIndex,
                          })
                          : nodeSubtitle}
                    </span>
                                )}
                            </div>

                            <div className="rst__rowToolbar">
                                {buttons.map((btn, index) => (
                                    <div
                                        key={index} // eslint-disable-line react/no-array-index-key
                                        className="rst__toolbarButton"
                                    >
                                        {btn}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

NodeRendererDefault.defaultProps = {
    isSearchMatch: false,
    isSearchFocus: false,
    canDrag: false,
    toggleChildrenVisibility: null,
    buttons: [],
    className: '',
    style: {},
    parentNode: null,
    draggedNode: null,
    canDrop: false,
    title: null,
    subtitle: null,
    rowDirection: 'ltr',
};

NodeRendererDefault.propTypes = {
    node: PropTypes.shape({}).isRequired,
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    path: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    treeIndex: PropTypes.number.isRequired,
    treeId: PropTypes.string.isRequired,
    isSearchMatch: PropTypes.bool,
    isSearchFocus: PropTypes.bool,
    canDrag: PropTypes.bool,
    scaffoldBlockPxWidth: PropTypes.number.isRequired,
    toggleChildrenVisibility: PropTypes.func,
    buttons: PropTypes.arrayOf(PropTypes.node),
    className: PropTypes.string,
    style: PropTypes.shape({}),
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    parentNode: PropTypes.shape({}), // Needed for dndManager
    isDragging: PropTypes.bool.isRequired,
    didDrop: PropTypes.bool.isRequired,
    draggedNode: PropTypes.shape({}),
    // Drop target
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool,

    // rtl support
    rowDirection: PropTypes.string,
};

export default NodeRendererDefault;
