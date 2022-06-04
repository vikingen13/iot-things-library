import './Header.css'
import React from 'react';
import { Flex, Heading, View, Image } from '@aws-amplify/ui-react';
import { MdAccountCircle } from "react-icons/md";


const Header = ({aUserName}) => {
    return (
        <View as="div" 
            className="header"
        >
            <Flex justifyContent="space-between">
                <Image src="./img/LoRaWAN_Logo.svg" width="8vw"/>                
                <Heading className="header_Username" level="4"><MdAccountCircle/><span class="header_aligned-with-icon">{aUserName}</span></Heading>
            </Flex>
        </View>
    );
};

export default Header;