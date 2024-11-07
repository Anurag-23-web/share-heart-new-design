import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';

const UploadStory = () => {
    return (
        <div>
            {/* <Header /> */}
            <div className='formSec mb-5'>
                <div className='formheading'>
                    <h3>Upload your Jesus Story now</h3>
                    <p>Please submit the consent form</p>
                </div>
                <Form className='form-lable-mangne'>
                    <Form.Group className="form-group">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Recorded at</Form.Label>
                        <Form.Control type="text" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Phone</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Your Church Web link</Form.Label>
                        <Form.Select aria-label="Default select example" className='form-control'>
                            <option>Select (or) Type here</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 checkbox-label-font">
                        {['checkbox'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                                <Form.Check // prettier-ignore
                                    type={type}
                                    id={`default-${type}`}
                                    label={`I agree to the unrestricted use and publication of my testimony video on shareheart.com and by my church`}
                                />

                                <Form.Check
                                    type={type}
                                    label={`I agree to receive further communication regarding Free T-Shirt selection & Other Promotions`}
                                    id={`disabled-default-${type}`}
                                />
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group className="mb-0">
                        <div className='formBtn'><Button type='submit' variant='danger'>Update now</Button></div>
                    </Form.Group>
                </Form>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default UploadStory;
