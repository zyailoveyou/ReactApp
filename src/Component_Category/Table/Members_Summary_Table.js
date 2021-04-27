import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import cn from 'date-fns/locale/zh-CN'
import LinearProgress from "@material-ui/core/LinearProgress";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {DataTypeProvider, FilteringState, IntegratedFiltering, PagingState,VirtualTableState} from "@devexpress/dx-react-grid";
import {GridExporter} from '@devexpress/dx-react-grid-export';
import {
    Grid,
    Table,
    TableColumnResizing,
    TableFilterRow,
    TableHeaderRow,
    Toolbar,
    VirtualTable
} from '@devexpress/dx-react-grid-material-ui';
import {Button} from "@material-ui/core";
import User_Context from "../../Context/Context_Info/User_Context";
import CloudBase_Context from "../../Context/Context_Info/CloudBase_Context";
import {saveAs} from 'file-saver'
import theme from "../../MyTheme/Theme";
import Department_Select_For_Members_Summary_Table from "../Input/Department_Select_For_Members_Summary_Table";
import User_Rows_Context from "../../Context/Context_Info/User_Rows_Context";
import Dialog_Load from "../Dialog/Dialog_Load";
import TreeData_Context from "../../Context/Context_Info/TreeData_Context";
import getFlatDepartmentFromTree from "../../Function_List/getFlatDepartmentFromTree";
import Dot_Progress from "../Progress_Bar/Dot_Progress";


const TableRow = (props) => {
    return (
        <Table.Row {...props}
                   style={{
                       background: theme.palette.primary.main
                   }}
        >
            {props.children}
        </Table.Row>
    )
}

const TableHeaderContent = (props) => {
    return (
        <TableHeaderRow.Content
            column={props.column}
            style={{
                color: "white",
            }}
            {...props}

        >
            {props.children}
        </TableHeaderRow.Content>
    )
}


const CustomToolBar = (
    {
        style,
        children,
        loading,
        setLoading,
        startExport,
        getInitialData,
        onSaveUser,
        ...restProps
    }
) => {
    const rowInfo = useContext(User_Rows_Context)
    // const loadData = () => {
    //     getInitialData()
    // }
    const onSave = () => {
        onSaveUser()
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={cn}>
            <Box>
                {loading ? <LinearProgress/> : null}
                <Toolbar.Root
                    {...restProps}
                    style={{
                        ...style,
                        justifyContent: "flex-end",
                    }}
                >
                    {children}
                    <Box style={{
                        display: "flex",
                        width: '100%',
                        justifyContent: 'center',
                    }}>
                        <Box style={{
                            display: "flex",
                            justifyContent: "flex-start",
                        }}>
                            {/*<Button*/}
                            {/*    variant={"contained"}*/}
                            {/*    color={"primary"}*/}
                            {/*    size={'medium'}*/}
                            {/*    style={{*/}
                            {/*        outline: 'none',*/}
                            {/*    }}*/}
                            {/*    onClick={loadData}*/}
                            {/*>查询员工*/}
                            {/*</Button>*/}
                        </Box>
                        <Box style={{
                            marginLeft: "auto"
                        }}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                size={'medium'}
                                style={{
                                    outline: 'none',
                                }}
                                onClick={onSave}
                            >保存数据
                            </Button>
                            <Button
                                variant={"contained"}
                                color={"secondary"}
                                size={'medium'}
                                style={{
                                    outline: 'none',
                                    marginLeft: '1rem'
                                }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    console.log('点击')
                                    startExport()
                                }}
                            >导出Excel
                            </Button>
                        </Box>
                    </Box>
                </Toolbar.Root>
            </Box>
        </MuiPickersUtilsProvider>
    )
}

const selectCell = (props) => {
    const {column, value, row,children} = props;
    console.log(row)
    console.log(children)
    console.log(value)
    return (
        function () {
            if (column.name === 'department') {
                return (
                    <Table.Cell {...props} >
                        <Department_Select_For_Members_Summary_Table
                            Title="所属部门"
                            row={row}
                            Value={row.Department}
                        />
                    </Table.Cell>
                )
            } else {
                return (
                    <Table.Cell {...props} >
                        <span>
                            {children}
                        </span>
                    </Table.Cell>
                )
            }
        }()

    )
};


const Members_Summary_Table = (props) => {
    const {userData, setUserData} = useContext(User_Context);
    const CloudBase = useContext(CloudBase_Context);
    const {treeData, setTreeData} = useContext(TreeData_Context)
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState([5, 10, 15]);
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState([]);
    const [userRows, setUserRows] = useState([])
    const [send, setSend] = useState(false)
    const exporterRef = useRef(null);
    const [columnWidths] = useState([
        {columnName: 'name', width: 120},
        {columnName: 'gender', width: 50},
        {columnName: 'email', width: 150},
        {columnName: 'qq', width: 120},
        {columnName: 'telephone', width: 120},
        {columnName: 'career', width: 100},
        {columnName: 'province', width: 80},
        {columnName: 'city', width: 80},
        {columnName: 'address', width: 250},
        {columnName: 'department', width: 150},
    ]);
    const {loadingDepartmentTree} = props

    // const propsPassToBody = {
    //     ...( true && { bodyComponent: bodyComponent } )
    // }

    const noDataMessage = {
        noData: '暂无数据',
    }

    const columns = [
        {
            name: 'name', title: '姓名',
            getCellValue: row => (row ? row.Name : '未知'),
        },
        {
            name: 'gender', title: '性别',
            getCellValue: row => (row ? row.Gender : '未知'),
        },
        {
            name: 'email', title: '邮箱',
            getCellValue: row => (row ? row.Email : '未知'),
        },
        {
            name: 'qq', title: 'QQ',
            getCellValue: row => (row ? row.QQ : '未知'),
        },
        {
            name: 'telephone', title: '手机号码',
            getCellValue: row => (row ? row.Phone : '未知')
        },
        {
            name: 'career', title: '岗位',
            getCellValue: row => (row ? row.Career : '未知')
        },
        {
            name: 'province', title: '省',
            getCellValue: row => (row ? row.Province : '未知')
        },
        {
            name: 'city', title: '城市',
            getCellValue: row => (row ? row.City : '未知')
        },
        {
            name: 'department', title: '所属部门',
            getCellValue: row => {
                console.log(treeData)
                const newArray = getFlatDepartmentFromTree(treeData)
                console.log(newArray)
                const result = newArray.find((item) => {
                    return item.id === row.Department
                })
                console.log(result)
                return result.title
            }
        },
        {
            name: 'address', title: '住址',
            getCellValue: row => (row ? row.Address : '未知')
        },

    ];


    const pagePanelMessages = {
        showAll: '全部',
        rowsPerPage: '每页显示',
        info: '第 {from} 页 每页 {to} 条 (共计{count} 页)'

    }


    const filterRowMessages = {
        filterPlaceholder: '过滤',
    }


    const TooltipFormatter = ({row: {phone, birthDate}, value}) => (
        <Tooltip title={<div>{value}</div>}>
    <span>
      {value}
    </span>
        </Tooltip>
    );

    const CellTooltip = props => (
        <DataTypeProvider
            for={columns.map(({name}) => name)}
            formatterComponent={TooltipFormatter}
            {...props}
        />
    );

    const startExport = () => {
        exporterRef.current.exportGrid();
    };

    const onSave = (workbook) => {
        console.log('onsave call')
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'DataGrid.xlsx');
        });
    };

    const getInitialData = () => {
        setLoading(true)
        const _ = CloudBase.db.command;
        CloudBase.db.collection("User").limit(1000).get().then((res) => {
            console.log(res.data)
            setUserRows(res.data)
            setLoading(false)

        });
    }

    useEffect(()=>{
        getInitialData()
    },[])


    const onSaveUser = () => {
        setSend(true)
        console.log(userRows)
        CloudBase.app
            .callFunction({
                name: "setUserList",
                data: {
                    usersGroup: userRows,
                }
            })
            .then((res) => {
                const result = res.result; //云函数执行结果
                console.log(result)
                setSend(false)
            });

    }

    return (
        <User_Rows_Context.Provider value={{
            userRows, setUserRows
        }}>
            <Paper elevation={3}>
                <Box>
                    <Grid
                        rows={userRows}
                        columns={columns}
                    >
                        <FilteringState
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={(value) => {
                                setCurrentPage(value)
                            }}
                            pageSize={pageSize}
                            onPageSizeChange={(value) => {
                                setPageSize(value)
                            }}
                        />
                        <IntegratedFiltering/>
                        <CellTooltip/>
                        <VirtualTable
                            height={'70vh'}
                            cellComponent={selectCell}
                            messages={noDataMessage}
                        />
                        <TableColumnResizing defaultColumnWidths={columnWidths}/>
                        <TableHeaderRow
                            contentComponent={TableHeaderContent}
                            rowComponent={TableRow}
                        />
                        <TableFilterRow
                            messages={filterRowMessages}
                        />
                        <CustomToolBar
                            loading={loading}
                            setLoading={setLoading}
                            startExport={startExport}
                            getInitialData={getInitialData}
                            onSaveUser={onSaveUser}
                        />
                    </Grid>
                    <GridExporter
                        ref={exporterRef}
                        rows={userRows}
                        columns={columns}
                        onSave={onSave}
                    />

                </Box>
                <Dialog_Load load={send}></Dialog_Load>
            </Paper>
        </User_Rows_Context.Provider>
    );
};

export default memo(Members_Summary_Table);
