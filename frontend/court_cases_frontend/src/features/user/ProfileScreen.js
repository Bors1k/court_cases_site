import FormContainer from "../FormContainer";
import React from 'react'
import PasswordForm from './PasswordForm';
import ProfileInfo from './ProfileInfo';


function ProfileScreen (){
    
    return (
        <FormContainer>
            <ProfileInfo/>
            <PasswordForm/>
        </FormContainer>

        
    );
    }
     
    export default ProfileScreen;