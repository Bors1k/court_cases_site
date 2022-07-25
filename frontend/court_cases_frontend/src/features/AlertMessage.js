import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function AlertMessage({title, text}) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{title}</Alert.Heading>
            <p>
            {text}
            </p>
        </Alert>
        );
    }
}
