import React, { useState, useEffect } from 'react';
import { API} from 'aws-amplify';
import { Collection,Button, View, Card,SearchField,Text, useTheme,Flex, TextField } from '@aws-amplify/ui-react';
import { listIotThings } from '../graphql/queries';

import Modal from 'react-modal';
import CardThing from '../components/CardThing';
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";


const initialFormState = { 
    devEUI: '',
    AppEUI: '',
    AppKey: '',
    Type: '',
    Model: '',
    description: ''
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

const SearchPage = () => {
    let subtitle;
    const [iotThings, setThings] = useState([]);
    const [isFirstDisplay, setFirstDisplay] = useState(true)

    async function fetchThings(aDevEUI) {
        const apiData = await API.graphql({ query: listIotThings,variables: {filter: { devEUI: {eq: aDevEUI } } }});
        setThings(apiData.data.listIotThings.items);
        setFirstDisplay(false)
    }


    return (
        <div className="MainPage">            

            <View as="div" padding="1rem">
                <Flex justifyContent="center">
                    <SearchField
                    label="Enter your device's Dev EUI"
                    placeholder="Search here..."
                    labelHidden={false}                    
                    onSubmit= {e => fetchThings(e)}
                    />
                </Flex>
                <br/>
                {(iotThings.length ===0 && !isFirstDisplay) && <Text>There is no corresponding device</Text>}
                <Collection type="list" items={iotThings} gap="1.5rem" direction="row"
                justifyContent="center"
                wrap="wrap">
                    {(iotThing, index) => (
                        <View key={iotThing.id}>
                            <Card padding="1rem" variation="elevated">
                                <CardThing key={index} iotThing={iotThing} index={index}/>
                                
                            </Card>
                        </View>
                    )}

                </Collection>
            </View>
        </div>
    );
};

export default SearchPage;