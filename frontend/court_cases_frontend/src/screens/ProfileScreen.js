import FormContainer from "../components/FormContainer";
import React from 'react'
import PasswordForm from '../components/PasswordForm';
import ProfileInfo from '../components/ProfileInfo';


function ProfileScreen (){
    
    return (
        <FormContainer>
            <ProfileInfo/>
            <PasswordForm/>
        </FormContainer>

        
    );
    }
     
    export default ProfileScreen;