import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import Cookies from 'universal-cookie';
import BackendService from '../../Services/Services'

export default function DisplayCreateTabs({tab}) {
    const [isSubmit, setIsSubmit] = React.useState(false);
    const app_name = useRef(null);
    const description = useRef(null);

    const handleAppsClick = (event) => {
        event.preventDefault();
        setIsSubmit(true);
      };
  
      React.useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get("jwt");
        const email = cookie.get('email');
        if (isSubmit) {
          const fetchData = async () => {
          try{
                const login_resp = await BackendService.create_app(email, app_name.current.value, description.current.value, token);
                if(login_resp.status == 200)
                {
                    setIsSubmit(false);
                }
            }catch( error ){ setIsSubmit(false); console.log(error); }
        };
        fetchData().then();
      }
    }, [isSubmit]);

    const cookie = new Cookies();
    const token = cookie.get("jwt");
    if(token && (tab == 1)){
      return(
                <Tabs
                defaultActiveKey="profile"
                id="CreateAppTabs"
                className="mb-3"
            >
                <Tab eventKey="AppCreator" title="AppCreatorButton">
                    <Form onSubmit={handleAppsClick}>
                    <TextField
                                required
                                fullWidth
                                id="app_name"
                                label="AppName"
                                name="app_name"
                                type="text"
                                inputRef={app_name}
                                margin='normal'
                                color={"info"}
                            />
                            <TextField
                                required
                                fullWidth
                                id="Description"
                                label="Description"
                                name="Description"
                                type="Description"
                                margin='normal'
                                inputRef={description}
                                color={"info"}
                            />
                        <Button variant="primary" type="submit">
                                Create
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        )
    }
  }