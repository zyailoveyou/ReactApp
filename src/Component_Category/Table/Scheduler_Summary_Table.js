import React, {memo, useContext, useEffect, useState, useRef, useCallback} from 'react';
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from "@material-ui/core/TableCell";
import cn from 'date-fns/locale/zh-CN'
import Input_Selector_Component from "../Input/Input_Selector_Component";
import LinearProgress from "@material-ui/core/LinearProgress";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
    DataTypeProvider,
    PagingState,
    IntegratedPaging,
    FilteringState,
    IntegratedFiltering,
    ExportPanel,
} from "@devexpress/dx-react-grid";
import {GridExporter} from '@devexpress/dx-react-grid-export';
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    PagingPanel,
    TableFilterRow,
    VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import {Button} from "@material-ui/core";
import User_Context from "../../Context/Context_Info/User_Context";
import CloudBase_Context from "../../Context/Context_Info/CloudBase_Context";
import {saveAs} from 'file-saver'
import theme from "../../MyTheme/Theme";
import getFlatDepartmentFromTree from "../../Function_List/getFlatDepartmentFromTree";
import TreeData_Context from "../../Context/Context_Info/TreeData_Context";
import {getTreeFromFlatData} from "react-sortable-tree";





const pagePanelMessages = {
    showAll: '全部',
    rowsPerPage: '每页显示',
    info: '第 {from} 页 每页 {to} 条 (共计{count} 页)'

}


const filterRowMessages = {
    filterPlaceholder: '过滤内容',
}


const TooltipFormatter = ({row: {phone, birthDate}, value}) => (
    <Tooltip title={<div>{value}</div>}
    >
    <span>
      {value}
    </span>
    </Tooltip>
);



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


const CustomToolBar = ({style, children, loading, setLoading, setRows, startExport, ...restProps}) => {
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const {userData, setUserData} = useContext(User_Context)
    const CloudBase = useContext(CloudBase_Context)


    const loadData = () => {
        setLoading(true)
        const _ = CloudBase.db.command;
        console.log(userData.Uid)
        CloudBase.db.collection("Appointments").where({
            startDateStamp: _.gte(selectedStartDate.getTime()).and(_.lte(selectedEndDate.getTime())),
            Uid: _.eq(userData.Uid)
        }).get().then((res) => {
            console.log(res.data)
            setRows(res.data)
            setLoading(false)
        });

    }


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={cn}>
            <Box>
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
                        <KeyboardDateTimePicker
                            variant="inline"
                            ampm={false}
                            value={selectedStartDate}
                            onChange={setSelectedStartDate}
                            format="yyyy/MM/dd HH:mm"
                        />
                        <Box style={{
                            marginLeft: '1rem',
                            marginRight: '1rem',
                        }}
                        >-</Box>
                        <KeyboardDateTimePicker
                            variant="inline"
                            ampm={false}
                            value={selectedEndDate}
                            onChange={setSelectedEndDate}
                            format="yyyy/MM/dd HH:mm"
                        />
                        <Box style={{
                            marginLeft: "auto"
                        }}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                size={'medium'}
                                style={{
                                    outline: 'none',
                                    marginLeft: '1rem'
                                }}
                                onClick={loadData}
                            >查询信息
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
                {loading ? <LinearProgress/> : null}
            </Box>
        </MuiPickersUtilsProvider>
    )
}

const FilterCell = (props) => {
    const {column} = props;
    return (
        <TableCell>
            <Input_Selector_Component
                Title="所属部门"
                Data_Set_Name={'Department'}
                Data_Group={[
                    '工程部', '销售部'
                ]}
                Has_Icon={false}
                Value={'工程部'}
            />
        </TableCell>
    )
};


const Scheduler_Summary_Table = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState([5, 10, 15]);
    const [loading, setLoading] = useState(true)
    const [loadingAppointments, setLoadingAppointments,] = useState(true)
    const [loadingDepartment, setLoadingDepartment,] = useState(true)
    const [filters, setFilters] = useState([{columnName: 'owner', value: 'D'}]);
    const {userData, setUserData} = useContext(User_Context);
    const CloudBase = useContext(CloudBase_Context);
    const [rows, setRows] = useState([])
    const exporterRef = useRef(null);
    const [treeData, setTreeData] = useState([])

    const startExport = () => {
        exporterRef.current.exportGrid();
    };

    const onSave = (workbook) => {
        console.log('onsave call')
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'DataGrid.xlsx');
        });
    };

    useEffect(() => {
        getInitialData(new Date())
    }, [])

    useEffect(()=>{
        if (!loadingDepartment && !loadingAppointments){
            setLoading(false)
        }

    },[loadingAppointments,loadingDepartment])

    const getInitialData = (Passed_Date) => {
        setLoading(true)
        setLoadingAppointments(true)
        setLoadingDepartment(true)

        const _ = CloudBase.db.command;
        let upperTemp = new Date(Passed_Date)
        let lowerTemp = new Date(Passed_Date)
        upperTemp.setMonth((upperTemp.getMonth() - 1))
        lowerTemp.setMonth((lowerTemp.getMonth()) + 1)
        upperTemp.setDate(29)
        lowerTemp.setDate(1)

        CloudBase.app
            .callFunction({
                name: "aggregateAppointments",
            })
            .then((res) => {
                const result1 = res.result; //云函数执行结果
                console.log(result1)
                CloudBase.app
                    .callFunction({
                        name: "aggregateDepartment",
                    })
                    .then((res) => {
                        const result2 = res.result; //云函数执行结果
                        console.log(res)
                        console.log(result2)

                        const nestTree = getTreeFromFlatData({
                            flatData: result2,
                            getKey: (node) => node.id,
                            getParentKey: (node) => node.parentNode,
                            rootKey: 0
                        })

                        console.log(nestTree)

                        if (result2) {
                            console.log('set treeData')
                            setTreeData(nestTree)
                            setRows(result1)
                            setLoadingAppointments(false)
                            setLoadingDepartment(false)
                        } else {
                            console.log('failed on loading tree')
                            setTreeData(nestTree)
                            setRows(result1)
                            setLoadingAppointments(false)
                            setLoadingDepartment(false)
                        }
                    });
            })

    }


    const columns = [
        {
            name: 'name', title: '姓名',
            getCellValue: row => {
                if (row.User) {
                    return row.User[0].Name
                } else {
                    return '未知'
                }
            }
        },
        {
            name: 'department', title: '部门',
            getCellValue: row => {
                console.log(treeData)
                const newArray = getFlatDepartmentFromTree(treeData)
                console.log(newArray)
                console.log(row)
                const result = newArray.find((item) => {
                    return item.id === row.User[0].Department
                })
                console.log(result)
                return result.title
            }

        },
        {
            name: 'title', title: '标题',

        },
        {
            name: 'startDate', title: '起始时间',
            getCellValue: row => (row.startDate ? new Date(row.startDate).toLocaleString() : '未知'),
        },
        {
            name: 'endDate', title: '截止时间',
            getCellValue: row => (row.endDate ? new Date(row.endDate).toLocaleString() : '未知'),
        },
        {
            name: 'type', title: '类型',
            getCellValue: row => (row.type ? row.type.text : '未知'),

        },
        {
            name: 'subtype', title: '二级类型',
            getCellValue: row => (row.subtype ? row.subtype.text : '未知'),

        },
        {
            name: 'approved', title: '审批',
            getCellValue: row => (row.approved ? '是' : '否'),
        },
    ];

    const CellTooltip = props => (
        <DataTypeProvider
            for={columns.map(({name}) => name)}
            formatterComponent={TooltipFormatter}
            {...props}
        />
    );

    const noDataMessage = {
        noData: '暂无数据',
    }

    return (
        <Paper elevation={3}>
            <Box style={{}}>
                <Grid
                    rows={ rows}
                    columns={columns}
                >
                    <FilteringState
                        filters={filters}
                        onFiltersChange={setFilters}
                    />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={(value) => {
                            console.log(value)
                            setCurrentPage(value)
                        }}
                        pageSize={pageSize}
                        onPageSizeChange={(value) => {
                            console.log(value)
                            setPageSize(value)
                        }}
                    />
                    <IntegratedFiltering/>
                    <CellTooltip/>
                    <VirtualTable
                        height={'70vh'}
                        messages={noDataMessage}
                    />
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
                        setRows={setRows}
                        startExport={startExport}
                    />
                </Grid>
                <GridExporter
                    ref={exporterRef}
                    rows={rows}
                    columns={columns}
                    onSave={onSave}
                />
            </Box>
        </Paper>
    );
};

export default memo(Scheduler_Summary_Table);
