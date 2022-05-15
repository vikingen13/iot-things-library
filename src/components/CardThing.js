import React from 'react';
import { Card,Heading,Text, View, useTheme, Button,Flex, Icon } from '@aws-amplify/ui-react';
import { API} from 'aws-amplify';
import { deleteIotThing } from '../graphql/mutations'
import { MdContentCopy } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Modal from 'react-modal';



const CardThing = ({iotThing}) => {
    const { tokens } = useTheme();
    const [showCopied, setShowCopied] = React.useState(false);


    function copyToClipBoard(anIotThing) {
        navigator.clipboard.writeText(JSON.stringify(iotThing,null,2));        
        setShowCopied(true);
        setTimeout(function() { setShowCopied(false); }, 500);
    }


    return (
        <div className='cardThing'>                
            <Heading> {iotThing.devEUI}</Heading>
            
            <br/>
            <Flex alignItems="baseline" justifyContent="flex-start">
                <Text justifyContent="left">Type: {iotThing.Type}</Text>
            </Flex>
            <Flex alignItems="baseline" justifyContent="flex-start">
                <Text align="left">Model: {iotThing.Model}</Text>
            </Flex>
            <br/>
            <Flex alignItems="baseline" justifyContent="flex-start">
                <Text align="left">app EUI: {iotThing.AppEUI}</Text>
            </Flex>
            <Flex alignItems="baseline" justifyContent="flex-start">
                <Text align="left">app Key: {iotThing.AppKey}</Text>
            </Flex>
            <br/>
            <Text>{iotThing.description}</Text>
            <br/>
            <Button onClick={() => copyToClipBoard(iotThing)}><MdContentCopy/><Text>{ showCopied ? 'Copied!' : 'Copy' }</Text></Button>
        </div>
    );
};

export default CardThing;