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

let rows = [];

function preventDefault(event) {
    event.preventDefault();
}

export default function AppList({my_tab}) {
    const [isLoading, setLoading] = React.useState(false);
    const [dataToReadApps, setDataToReadApps] = React.useState({});

    React.useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get("jwt");
        const username = cookie.get("email");
        const foreign_key = cookie.get("fk");
        const fetchData = async () => {
            try {
                const login_resp = await BackendService.read_apps(username, token, foreign_key);
                if (login_resp.status == 200) {
                    setLoading(true);
                    rows.push(login_resp.data);
                    cookie.set("ak", login_resp.data["app_key"]);
                    console.log(login_resp.data["app_key"]);
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
                <Title>Applications</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.table_nr}</TableCell>
                                    <TableCell>{row.tables}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Title>Applications</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody></TableBody>
                </Table>
            </React.Fragment>
        )
    }
}
