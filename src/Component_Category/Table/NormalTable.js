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
import rowsBackUp from "./TestData/Data";


const columns = [
    {
        name: 'name', title: '姓名',
    },
    {
        name: 'gender', title: '性别',
    },
    {
        name: 'workStartDate', title: '入职时间',
    },
    {
        name: 'department', title: '所属部门',
    },
];


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

const CellTooltip = props => (
    <DataTypeProvider
        for={columns.map(({name}) => name)}
        formatterComponent={TooltipFormatter}
        {...props}
    />
);

const TableHeaderContent = (props) => {

    return (
        <TableHeaderRow.Content
            column={props.column}
            style={{
                fontSize: '1rem',
                fontWeight: "bold"
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
        CloudBase.db.collection("Appointments").where({
            startDateStamp: _.gte(selectedStartDate.getTime()).and(_.lte(selectedEndDate.getTime())),
            name: _.eq(userData.Name)
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
                                onClick={(e)=>{
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


const NormalTable = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState([5, 10, 15]);
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState([{columnName: 'owner', value: 'D'}]);
    const [rows, setRows] = useState([])
    const exporterRef = useRef(null);

    const startExport = useCallback(() => {
        exporterRef.current.exportGrid();
    }, [exporterRef]);

    const onSave = (workbook) => {
        console.log('onsave call')
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'DataGrid.xlsx');
        });
    };

    return (
        <Paper elevation={3}>
            <Grid
                rows={rows}
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
                <IntegratedPaging/>
                <CellTooltip/>
                <Table

                />
                <TableHeaderRow
                    contentComponent={TableHeaderContent}
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
                <PagingPanel
                    pageSizes={pageSizes}
                    messages={pagePanelMessages}
                />
            </Grid>
            <GridExporter
                ref={exporterRef}
                rows={rows}
                columns={columns}
                onSave={onSave}
            />
        </Paper>
    );
};

export default memo(NormalTable);
