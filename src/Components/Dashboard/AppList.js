import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import BackendService from "../../Services/Services"
import Cookies from 'universal-cookie';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

let apps_rows = [];

function preventDefault(event) {
    event.preventDefault();
}

export default function AppList({my_tab}) {
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get("jwt");
        const app_key = cookie.get("app_key");
        const email = cookie.get("email");
        const fetchData = async () => {
            try {
                const app_lists_resp = await BackendService.read_apps(email, app_key, token);
                if (app_lists_resp.status == 200) {
                    setLoading(true);
                    if(app_lists_resp != null)
                    {
                        if(apps_rows.length == 0) // if we add the option to have multiple apps we should modify this
                            apps_rows.push(app_lists_resp.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData().then();
    }, [isLoading]);

    if (isLoading && (my_tab == 1)) {
        return (
            <React.Fragment>
                <TableContainer component={Paper}>
                    <Title>Applications</Title>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >App Name</TableCell>
                            <TableCell >Nr Tables</TableCell>
                            <TableCell >Tables</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {
                                apps_rows.map((row) => (
                                    <TableRow>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell >{row.table_nr}</TableCell>
                                        <TableCell >{row.tables}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        );
    }
}
