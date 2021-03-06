// import React from 'react';
// import {Grid, PagingPanel, Table, TableFilterRow, TableHeaderRow} from "@devexpress/dx-react-grid-material-ui";
// import {FilteringState, IntegratedFiltering, IntegratedPaging, PagingState} from "@devexpress/dx-react-grid";
// import Paper from "@material-ui/core/Paper";
//
// const MyComponent = () => {
//     return (
//         <Grid
//             rows={rows}
//             columns={columns}
//         >
//             <FilteringState
//                 filters={filters}
//                 onFiltersChange={setFilters}
//             />
//             <PagingState
//                 currentPage={currentPage}
//                 onCurrentPageChange={(value) => {
//                     console.log(value)
//                     setCurrentPage(value)
//                 }}
//                 pageSize={pageSize}
//                 onPageSizeChange={(value) => {
//                     console.log(value)
//                     setPageSize(value)
//                 }}
//             />
//             <IntegratedFiltering/>
//             <IntegratedPaging/>
//             <CellTooltip/>
//             <Table
//             />
//             <TableHeaderRow
//                 contentComponent={TableHeaderContent}
//             />
//             <TableFilterRow
//                 messages={filterRowMessages}
//             />
//             <CustomToolBar
//                 loading={loading}
//                 setLoading={setLoading}
//                 setRows={setRows}
//                 startExport={startExport}
//             />
//             <PagingPanel
//                 pageSizes={pageSizes}
//                 messages={pagePanelMessages}
//             />
//         </Grid>
//     );
// };
//
// export default MyComponent;
















// import React, { useRef, useCallback } from 'react';
// import Paper from '@material-ui/core/Paper';
// import { GridExporter } from '@devexpress/dx-react-grid-export';
// import {
//     Grid,
//     VirtualTable,
//     TableHeaderRow,
//     Toolbar,
//     ExportPanel,
// } from '@devexpress/dx-react-grid-material-ui';
// import saveAs from 'file-saver';
//
// import { orders } from '../../../demo-data/orders';
//
// const onSave = (workbook) => {
//     workbook.xlsx.writeBuffer().then((buffer) => {
//         saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
//     });
// };
//
// const columns = [
//     { name: 'Employee', title: 'Employee' },
//     { name: 'OrderNumber', title: 'Invoice Number' },
//     { name: 'CustomerStoreCity', title: 'City' },
//     { name: 'SaleAmount', title: 'Sale Amount' },
// ];
//
// export default () => {
//     const exporterRef = useRef(null);
//
//     const startExport = useCallback(() => {
//         exporterRef.current.exportGrid();
//     }, [exporterRef]);
//
//     return (
//         <Paper>
//             <Grid
//                 rows={orders}
//                 columns={columns}
//             >
//                 <VirtualTable />
//                 <TableHeaderRow />
//                 <Toolbar />
//                 <ExportPanel startExport={startExport} />
//             </Grid>
//             <GridExporter
//                 ref={exporterRef}
//                 rows={orders}
//                 columns={columns}
//                 onSave={onSave}
//             />
//         </Paper>
//     );
// };