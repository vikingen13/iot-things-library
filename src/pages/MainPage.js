import React, { useState, useEffect } from 'react';
import { API} from 'aws-amplify';
import { Collection,Button, View, Card,SwitchField,Flex, TextField, SelectField } from '@aws-amplify/ui-react';
import { listIotThings, listThingModels } from '../graphql/queries';
import { createIotThing, updateIotThing,deleteIotThing, createThingModel } from '../graphql/mutations'

import Modal from 'react-modal';
import CardThing from '../components/CardThing';
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline, MdOutlineUnfoldMore } from "react-icons/md";


const initialFormState = { 
    devEUI: '',
    AppEUI: '',
    AppKey: '',
    Type: '',
    Model: '',
    description: ''
}

const initialModelFormState = {
    Model: '',
    Type:''
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

const MainPage = () => {   

    const [iotThings, setThings] = useState([]);
    const [models, setModels] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modelModalIsOpen, setModelIsOpen] = React.useState(false);
    const [createThingMode, setCreateThingMode] = useState('create');
    const [formData, setFormData] = useState(initialFormState);
    const [modelFormData, setModelFormData] = useState(initialModelFormState);
    const [safeMode, setSafeMode] = useState(true);
    const [typeInputMode, setTypeInputMode] = useState('select')
    
    useEffect(() => {
        fetchThings();
        fetchModels();
    }, []);

    function openModalCreate() {
        setCreateThingMode('create');
        setFormData(initialFormState);
        setIsOpen(true);
    }

    function openModalUpdate(anIotThing) {
        setCreateThingMode('update');
        setFormData(anIotThing);
        setIsOpen(true);
    }

    function openModalModel(){
        setModelIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }
    
    function closeModal() {
        setIsOpen(false);
        setModelIsOpen(false);
        //we update the list
        refreshDisplay();
    }    

    function switchTypeInputMode(){
        typeInputMode === 'select'? setTypeInputMode('add') : setTypeInputMode('select');
    }

    async function fetchModels() {
        const apiData = await API.graphql({ query: listThingModels });
        setModels(apiData.data.listThingModels.items);
    }

    async function fetchThings() {
        const apiData = await API.graphql({ query: listIotThings });
        setThings(apiData.data.listIotThings.items);
    }


    async function createThing() {
        if (!formData.devEUI || !formData.Model) return;
        await API.graphql({ query: createIotThing, variables: { input: formData } });
        setThings([ ...iotThings, formData ]);
        setFormData(initialFormState);
        closeModal();
      }

      async function updateThing() {
        let myThing = {}
        console.log(formData);
        if (!formData.devEUI || !formData.Model) return;
        myThing = formData;
        delete myThing.createdAt;
        delete myThing.updatedAt;
        await API.graphql({ query: updateIotThing, variables: { input: myThing } });
        setFormData(initialFormState);
        closeModal();
      }


    async function deleteThing({ id }) {
        const newIoTArray = iotThings.filter(iotThing => iotThing.id !== id);
        setThings(newIoTArray);
        await API.graphql({ query: deleteIotThing, variables: { input: { id } }});
    }

    async function createModel() {
        console.log((!modelFormData.Model || !modelFormData.Type));
        console.log(modelFormData.Model);
        console.log(modelFormData.Type);
        if (!modelFormData.Model || !modelFormData.Type) return;
        await API.graphql({ query: createThingModel, variables: { input: modelFormData } });
        setModels([ ...models, modelFormData ]);
        setModelFormData(initialModelFormState);
        closeModal();
      }


    function refreshDisplay(){
        //we erase the list
        setThings([]);
        //we set the list
        fetchThings();
    }

    return (
        <div className="MainPage">            
            
            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Create Thing">

                <div className='createThing'>
                            <Flex alignItems="baseline" justifyContent="right">
                                <TextField
                                    label="Dev EUI"
                                    size="small"
                                    direction="row"
                                    alignItems="baseline"
                                    onChange={e => setFormData({ ...formData, 'devEUI': e.target.value})}
                                    placeholder="devEUI"
                                    value={formData.devEUI}
                                />
                            </Flex>
                            <br/>
                            <Flex alignItems="baseline" justifyContent="right">                                
                                <TextField
                                    label="App EUI"
                                    size="small"
                                    direction="row"
                                    alignItems="baseline"
                                    onChange={e => setFormData({ ...formData, 'AppEUI': e.target.value})}
                                    placeholder="AppEUI"
                                    value={formData.AppEUI}
                                />
                            </Flex>
                            <br/>
                            <Flex alignItems="baseline" justifyContent="right">
                                <TextField
                                    label="AppKey"
                                    size="small"
                                    direction="row"
                                    alignItems="baseline"
                                    onChange={e => setFormData({ ...formData, 'AppKey': e.target.value})}
                                    placeholder="AppKey"
                                    value={formData.AppKey}
                                />
                            </Flex>
                            <br/>
                            <Flex alignItems="baseline" justifyContent="right">
                                <SelectField
                                    label="Type"
                                    size="small"
                                    alignItems="baseline"
                                    direction="row"
                                    placeholder="Select a type..."
                                    onChange={e => setFormData({ ...formData, 'Type': e.target.value})}
                                    options={models.flatMap(x => x.Type).filter((v, i, a) => a.indexOf(v) === i)}
                                    width="14rem"
                                ></SelectField>
                            </Flex>
                            <br/>
                            <Flex alignItems="baseline" justifyContent="right">
                                <SelectField
                                    label="Model"
                                    alignItems="baseline"
                                    direction="row"
                                    size="small"
                                    placeholder="Select a model..."
                                    onChange={e => setFormData({ ...formData, 'Model': e.target.value})}
                                    options={models.flatMap(x => x.Model).filter((v, i, a) => a.indexOf(v) === i)}
                                    width="14rem"
                                ></SelectField>
                            </Flex>
                            <br/>
                            <Flex alignItems="baseline" justifyContent="right">
                                <TextField
                                    label="Description"
                                    size="small"
                                    direction="row"
                                    alignItems="baseline"
                                    onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                                    placeholder="description"
                                    value={formData.description}
                            />
                            </Flex>
                            <br/>        
                            <Flex alignItems="baseline" justifyContent="center">                        
                                {createThingMode==='create' && <Button size="small" onClick={() => createThing()} >{createThingMode}</Button>}
                                {createThingMode==='update' && <Button size="small" onClick={() => updateThing(formData)} >{createThingMode}</Button>}            
                            </Flex>
                        </div>
            
            </Modal>
            <Modal
            isOpen={modelModalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Create Model">

                <div className='createModel'>
                            <Flex alignItems="baseline" justifyContent="right">
                                <TextField
                                    label="Model"
                                    size="small"
                                    direction="row"
                                    alignItems="baseline"
                                    onChange={e => setModelFormData({ ...modelFormData, 'Model': e.target.value})}
                                    placeholder="Model"
                                    value={modelFormData.Model}
                                />
                            </Flex>
                            <br/>
                            <Flex alignItems="center" justifyContent="center" direction="column">                                
                                <SelectField
                                    label="Type"
                                    size="small"
                                    alignItems="baseline"
                                    direction="row"
                                    placeholder="Select a type..."
                                    onChange={e => setModelFormData({ ...modelFormData, 'Type': e.target.value})}
                                    options={models.flatMap(x => x.Type).filter((v, i, a) => a.indexOf(v) === i)}
                                    width="14rem"
                                    isDisabled={!(typeInputMode==='select')}
                                ></SelectField>
                                <MdOutlineUnfoldMore
                                    onClick={switchTypeInputMode}
                                />
                                <TextField
                                    label="Type"
                                    size="small"
                                    direction="row"
                                    alignItems="baseline"
                                    onChange={e => setModelFormData({ ...modelFormData, 'Type': e.target.value})}
                                    placeholder="Type"
                                    isDisabled={!(typeInputMode==='add')}
                                    value={modelFormData.Type}
                                />                                
                            </Flex>
                            <br/>
                            <Flex alignItems="baseline" justifyContent="center">                        
                                <Button size="small" onClick={() => createModel()} >Create</Button>
                            </Flex>
                        </div>
            
            </Modal>

            <View as="div" padding="1rem">
            <Flex justifyContent="right" gap="1rem">
                <SwitchField
                    thumbColor='lightgreen'
                    trackColor='#607d8b'
                    isDisabled={false}
                    label="Safe Mode"
                    labelPosition="start"
                    defaultChecked
                    onChange={() => setSafeMode(!safeMode)}
                    />
            </Flex>

                <br/>
                <Collection type="list" isSearchable items={iotThings} gap="1.5rem" direction="row"
                justifyContent="center"
                wrap="wrap">

                    {(iotThing, index) => (
                        <View key={iotThing.id} width="30rem">
                            <Card padding="1rem" variation="elevated">
                                <CardThing key={index} iotThing={iotThing} index={index} refreshCallback={refreshDisplay} />
                                
                            </Card>
                            <br/>
                            <Flex direction="row" gap="1rem" justifyContent="center">
                                {!safeMode && <Button onClick={() => openModalUpdate(iotThing)}><MdEditNote/></Button>}
                                {!safeMode && <Button onClick={() => deleteThing(iotThing)}><MdDeleteOutline/></Button>}
                            </Flex>
                        </View>


                    )}

                </Collection>
            </View>
            <br/>
            <Flex gap="1.5rem" justifyContent="center">
            <Button variation="primary" onClick={openModalCreate}>Create Thing</Button>
            <Button variation="primary" onClick={openModalModel}>Create Model</Button>
            </Flex>
            <br/><br/>       
        </div>
    );
};

export default MainPage;