import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import cn from 'date-fns/locale/zh-CN'
import LinearProgress from "@material-ui/core/LinearProgress";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {DataTypeProvider, FilteringState, IntegratedFiltering, PagingState,} from "@devexpress/dx-react-grid";
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
import Dialog_Load from "../Dialog/Dialog_Load";
import User_Rows_Context from "../../Context/Context_Info/User_Rows_Context";
import Menu_For_Vacation from "../Menu/Menu_For_Vacation";





const columns = [
    {
        name: 'userInfo', title: '员工信息',
        getCellValue: row => (row.data ? row.data.Career : '未知')
    },
    {
        name: 'department', title: '部门',
        getCellValue: row => (row.data ? row.data.Career : '未知')
    },
    {
        name: 'title', title: '标题',
        getCellValue: row => (row.data ? row.data.Name : '未知'),
    },
    {
        name: 'content', title: '内容',
        getCellValue: row => (row.data ? row.data.Gender : '未知'),
    },
    {
        name: 'startTime', title: '起始日期',
        getCellValue: row => (row.data ? row.data.Email : '未知'),
    },
    {
        name: 'endTime', title: '结束日期',
        getCellValue: row => (row.data ? row.data.QQ : '未知'),
    },
    {
        name: 'type', title: '类型',
        getCellValue: row => (row.data ? row.data.Phone : '未知')
    },
    {
        name: 'subtype', title: '二级类型',
        getCellValue: row => (row.data ? row.data.Phone : '未知')
    },

    {
        name: 'handler', title: '操作',
        getCellValue: row => (row.data ? row.data.Province : '未知')
    },
];



const selectCell = (props) => {
    const {column, value, row,children} = props;
    console.log(row)
    console.log(children)
    console.log(value)
    return (
        function () {
            if (column.name === 'handler') {
                return (
                    <Table.Cell {...props} >
                        <Menu_For_Vacation />
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


const CustomToolBar = (
    {
        style,
        children,
        loading,
        setLoading,
        startExport,
        getInitialData,
        onSaveAppointments,
        ...restProps
    }
) => {
    const rowInfo = useContext(User_Rows_Context)
    const onSave = () => {
        onSaveAppointments()
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


const Vacation_Approval_Table = (props) => {


    const {userData, setUserData} = useContext(User_Context)
    const CloudBase = useContext(CloudBase_Context)

    const [userRows, setUserRows] = useState([])
    const [filters, setFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [loading, setLoading] = useState(false)
    const [send, setSend] = useState(false)

    const exporterRef = useRef(null);

    const [columnWidths] = useState([
        {columnName: 'userInfo', width:120},
        {columnName: 'department', width: 120},
        {columnName: 'title', width: 120},
        {columnName: 'content', width: 'auto'},
        {columnName: 'startTime', width: 120},
        {columnName: 'endTime', width: 120},
        {columnName: 'type', width: 50},
        {columnName: 'subtype', width: 120},
        {columnName: 'handler', width: 120},
    ]);

    const noDataMessage = {
        noData: '暂无数据',
    }

    const filterRowMessages = {
        filterPlaceholder: '过滤',
    }


    const startExport = () => {
        exporterRef.current.exportGrid();
    };

    const onSave = (workbook) => {
        console.log('onsave call')
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'DataGrid.xlsx');
        });
    };


    const onSaveAppointments = () => {
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


     const getInitialData = async () => {
        setLoading(true)
        const _ = CloudBase.db.command;
        // CloudBase.db.collection("Appointments").limit(1000).get().then((res) => {
        //     console.log(res.data)
        //     setUserRows(res.data)
        //     setLoading(false)
        // });

        const res = await CloudBase.db.collection("User").where({
            Uid:"0a9f3a1c41a244079a0f79e1076d6d22"
        }).get()

         console.log(res.data)
         console.log(res.data[0].Authority)
    }

    useEffect(()=>{
        getInitialData()
    },[])

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

    return (
        <Paper elevation={3}>
            <Box style={{}}>
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
                    <TableColumnResizing
                        resizingMode={'nextColumn'}
                        defaultColumnWidths={columnWidths}
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
                        startExport={startExport}
                        getInitialData={getInitialData}
                        onSaveAppointments={onSaveAppointments}
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
    );
};

export default Vacation_Approval_Table;
