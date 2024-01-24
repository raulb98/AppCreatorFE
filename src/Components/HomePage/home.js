import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function HomePage() {

    async function handleClick() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const token = userToken?.jwt;
        const username = userToken?.name;
        console.log(username, token);
        return fetch('https://arbufe49zb.execute-api.eu-north-1.amazonaws.com/V1/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: username,
              token: token,
            })
          }).then(data => data.json())
    };

    const Display_Create_Tabs=()=> {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const token = userToken?.jwt;
        if(token){
            return(
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="AppCreator" title="AppCreatorButton">
                        <Form>
                            <Form.Group className="mb-3" controlId="AppName">
                                <Form.Label>Application Name</Form.Label>
                                <Form.Control type="email" placeholder="Enter Application Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="AppDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleClick}>
                                    Create
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            )
        }
    }

    return (
        <div className="App">
            <Display_Create_Tabs />
        </div>
    );
}

export default HomePage;
