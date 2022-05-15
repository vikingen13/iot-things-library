import React from 'react';
import { Flex, Heading, View, Image } from '@aws-amplify/ui-react';

const Header = ({aUserName}) => {
    return (
        <View as="div" 
        padding="1rem" 
        boxShadow="0px 03px 5px 0px var(--amplify-colors-neutral-60)"
        backgroundColor="#607d8b"
        >
            <Flex justifyContent="space-between" alignItems="baseline">
                <Image src="./img/LoRaWAN_Logo.svg" width="8vw"/>                
                <Heading level="4" color="#eeeeee"> User: {aUserName}</Heading>
            </Flex>
        </View>
    );
};

export default Header;