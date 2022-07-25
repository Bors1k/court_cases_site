import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function AlertButton ({message, onRefresh}){
    return (<Alert variant="danger">
    <Alert.Heading>Ошибка при получении данных</Alert.Heading>
    <p>
      {message}
    </p>
    <hr />
    <div className="d-flex justify-content-end">
      <Button onClick={onRefresh} variant="outline-danger">
         Обновить
      </Button>
    </div>
  </Alert>);
}
     
export default AlertButton;