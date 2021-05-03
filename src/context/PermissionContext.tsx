import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request, check, openSettings } from 'react-native-permissions';

// Estado que se va a manejar internamente (asi luce)
export interface PermissionsState {
    locationStatus: PermissionStatus;
}

// Estado inicial
export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',
}

// Exponer los permisos
type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

// Creacion del contexto
export const PermissionsContext = createContext({} as PermissionsContextProps);

// Crear el provider
export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(permissionInitState);

    

    useEffect(() => {
        
        checkLocationPermission();

        AppState.addEventListener('change', state => {

            if (state !== 'active') return;

            checkLocationPermission();
        });

    }, []);

    const askLocationPermission = async () => {

        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {

            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        } else {

            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );

        }

        if (permissionStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });

    }
    const checkLocationPermission = async () => {

        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {

            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        } else {

            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );

        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });

    }



    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission
        }}>
            { children }
        </PermissionsContext.Provider>
    );
}