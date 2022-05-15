import './App.css';
import Amplify, { Interactions } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Tabs, TabItem} from '@aws-amplify/ui-react';
import MainPage from './pages/MainPage.js'
import SearchPage from './pages/SearchPage.js'
import Header from "./components/Header.js"

Amplify.configure(awsconfig);

function isAdmin(aUser){
    let myAnswer = false;

    let myGroups = aUser.signInUserSession.accessToken.payload["cognito:groups"];
    if (myGroups != undefined) {
        if(myGroups.includes('admin')){
            myAnswer = true;
        }        
    }

    return myAnswer;
}

function App() {

  return (
    <Authenticator loginMechanisms={['username']} hideSignUp={true}>
    {({ signOut, user }) => (
        
        <div className="App">          
            <Header aUserName={user.username} />  
            <Tabs justifyContent="flex-end">
                <TabItem title="Main">
                    <br/>
                    <SearchPage user={user} user2={user}/>
                </TabItem>
                <TabItem title="Admin" isDisabled={!isAdmin(user)}>
                    <br/>
                    <MainPage user={user} user2={user}/>
                </TabItem>
                <TabItem onClick={signOut} title="Logout">
                    Cannot click

                </TabItem>
            </Tabs>
        </div>
    )}
    </Authenticator>
  );
}

export default App;
