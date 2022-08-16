import CourtTable from "../courts/CourtsTable/CourtTable";
import { Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

function HomeScreen (){
    return (
        <Container>
            <h3 style={{'textAlign': 'center'}}>Сайт реестра юридических дел Управления Федерального казначейства по Московской области</h3>
            <Image src={"/Roskazna.png"} style={{ "display": "block", "marginLeft": "auto", "marginRight": "auto", 'maxHeight': '700px'}} fluid></Image>
        </Container>
    );
    }
     
    export default HomeScreen;