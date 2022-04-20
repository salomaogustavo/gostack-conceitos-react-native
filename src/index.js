import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App () {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Gustavo Salomão'
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle={ 'light-content' } backgroundColor={ '#7159c1' } />

            <SafeAreaView style={ styles.listContainer }>
                <FlatList
                    data={ projects }
                    keyExtractor={ project => project.id }
                    renderItem={ ({ item: project }) => (
                        <Text style={ styles.project }>{ project.title }</Text>
                    ) }
                />

                <TouchableOpacity 
                    activeOpacity={ styles.button.activeOpacity } 
                    style={ styles.button } 
                    onPress={ handleAddProject }
                >
                    <Text style={ styles.buttonText }>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>

            {/* <View style={ styles.container }>
                <Text style={ styles.title }>Projetos</Text>
                { projects.map(project => (
                    <Text key={ project.id } style={ styles.project }>{ project.title }</Text>
                )) }
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: '#654fac',
        marginBottom: 70,
    },
    container: {
        backgroundColor: '#654fac',
    },
    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
    },
    project: {
        color: '#FFF',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#7d62d5',
        margin: 20,
        marginHorizontal: 75,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        activeOpacity: 0.75
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
    },
});
