import React,{memo} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import theme from "../../MyTheme/Theme";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';


const useStyles = makeStyles({
    Table_Head: {
        background:theme.palette.primary.main,
        color:theme.palette.primary.contrastText,
    },
    Icon_Style:{
        outline:"none !important",
    }
});


const createData = (name, section1, section2, section3, section4) => {
    return { name, section1, section2, section3, section4 };
}


const rows = [
    createData('test1', '大大', 6.0, 24, 4.0),
    createData('test2', '大大', 9.0, 37, 4.3),
    createData('test3', '小小', 16.0, 24, 6.0),
    createData('test4', '小小', 3.7, 67, 4.3),
    createData('test5', '小小', 16.0, 49, 3.9),
    createData('test6', '小小', 6.0, 24, 4.0),
    createData('test7', '大大', 9.0, 37, 4.3),
    createData('test8', '大大', 16.0, 24, 6.0),
    createData('test9', '大大', 3.7, 67, 4.3),
    createData('test10', '多多', 16.0, 49, 3.9),
    createData('test11', '多多', 6.0, 24, 4.0),
    createData('test12', '多多', 9.0, 37, 4.3),
    createData('test13', '少少', 16.0, 24, 6.0),
    createData('test14', '少少', 3.7, 67, 4.3),
    createData('test15', '少少', 16.0, 49, 3.9),
];

const Table_Component = (props) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    console.log(page*rowsPerPage)
    console.log(rows.length)
    console.log(page*rowsPerPage - rows.length)
    const emptyRows = Math.max(0,(page+1)*rowsPerPage - rows.length)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    return (
        <Paper elevation={3}>
            <Table
                className={classes.table}
                size={dense ? 'small' : 'medium'}
            >

                <TableHead>
                    <TableRow>
                        <TableCell align={"left"} classes={{
                            head:classes.Table_Head
                        }}>目录</TableCell>
                        <TableCell align={"right"} classes={{
                            head:classes.Table_Head
                        }}>项目1&nbsp;</TableCell>
                        <TableCell align={"right"} classes={{
                            head:classes.Table_Head
                        }}>项目2&nbsp;</TableCell>
                        <TableCell align={"right"} classes={{
                            head:classes.Table_Head
                        }}>项目3&nbsp;</TableCell>
                        <TableCell align={"right"} classes={{
                            head:classes.Table_Head
                        }}>项目4&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page*rowsPerPage,(page+1)*rowsPerPage).
                    map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align={"left"} style={{
                                width:'20%'
                            }}>
                                {row.name}
                            </TableCell>
                            <TableCell align={"right"}>{row.section1}</TableCell>
                            <TableCell align={"right"}>{row.section2}</TableCell>
                            <TableCell align={"right"}>{row.section3}</TableCell>
                            <TableCell align={"right"}>{row.section4}</TableCell>
                        </TableRow>
                    ))}
                    {
                        emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component={'div'}
                count={rows.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                nextIconButtonProps={{
                    classes: {
                        root:classes.Icon_Style
                    }
                }}
                backIconButtonProps={{
                    classes: {
                        root:classes.Icon_Style
                    }
                }}
            />
        </Paper>
    );
};

export default memo(Table_Component);
