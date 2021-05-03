import React, { useContext } from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'
import { BlackButton } from '../components/BlackButton';
import { PermissionsContext } from '../context/PermissionContext';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext(PermissionsContext);

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Es ecesario el uso del GPS para usar esta aplicación</Text>

            <BlackButton 
                title="Permiso"
                onPress={ askLocationPermission }
            />

            <Text style={{ marginTop: 20 }}>
                { JSON.stringify(permissions, null, 5)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20

    }
    
});