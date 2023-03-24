import {StyleSheet, View} from 'react-native';
import React from "react";

export const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    chatContainer: {
        flex: 1,
        flexDirection: "column"
    },
    sleepContainer: {
        width: 70,
        height: 70,
        alignItems: "center"
    },
    messagesContainer: {
        flex: 1,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: 'rgba(81, 88, 94, 0.24)',
    },
    messagesHeader: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(81, 88, 94, 0.24)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesHeaderContent: {
        flex: 1,
        flexDirection: 'row',
    },
    messageBody: {
        flex: 8,
        flexDirection: "column",
        padding: 8
    },
    messageFooter: {
        flex: 2,
    },
    name: {
        flex: 8,
        paddingTop: 5,
        fontSize: 18,
        fontWeight: "bold",
    },
    initials: {
        flex: 2,
    },
    initialsContent: {
        width: 30,
        height: 30,
        borderRadius: 15,
        color: 'white',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsText: {
        color: 'white'
    },
    activePerson: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
    },
    inactivePerson: {
        flex: 1,
        flexDirection: "row",
        padding: 5
    },
    disabledPerson: {
        opacity: .5,
        flexDirection: "row",
        flex: 1,
        padding: 5
    },
    screenTitle: {
        fontSize: 32,
        marginBottom: 16
    },
    centerVerticalHorizontal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputGroupContainer: {

    },
    inputGroup: {
        marginBottom: 32,
    },
    inputLabel: {
    },
    inputField: {
        borderWidth: 1,
        borderColor: "#c0c0c0",
        fontSize: 22,
        padding: 12
    }
});