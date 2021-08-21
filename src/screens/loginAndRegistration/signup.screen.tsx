import {
    Alert,
    Button,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import React, {FC, useEffect, useState} from "react";
import {ButtonComponent} from "../../components/button.component";
import {Theme} from "../../styles/style";
import {AuthService} from "../../firebase/auth.service";
import {useNavigation} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import {FBAuth} from "../../firebase/firebase.config";
import {useDispatch} from "react-redux";
import {AuthenticationActions} from "../../store/authentication/authentication.actions";
import {LoginAndRegistrationProps} from "./loginAndRegistration.stack";


type SignUpScreenNavigationProp = NativeStackNavigationProp<LoginAndRegistrationProps, "SignUp">
type Props = {
    navigation: SignUpScreenNavigationProp
}

export const SignUpScreen: FC<Props> = ({navigation}) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [canSignUp, setCanSignUp] = useState(false)

    function handleSignUp(){
        // Login with Email and Password
        dispatch(AuthenticationActions.signUp({
            email,
            password
        }))
    }

    // Check if SignUp is Enabled
    useEffect(() => {
        if(email.length != 0 &&
            password.length != 0 &&
            confirmPassword.length != 0 &&
            password == confirmPassword
        ){
            setCanSignUp(true)
            return
        }
        setCanSignUp(false)
    },[email, password, confirmPassword])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput placeholder={"Email"}
                               value={email}
                               onChangeText={setEmail}
                               style={Theme.Styles.topTextField}
                               textContentType={"emailAddress"}
                               autoCapitalize={"none"}
                    />
                    <TextInput placeholder={"Password"}
                               value={password}
                               onChangeText={setPassword}
                               secureTextEntry={true}
                               style={Theme.Styles.centerTextField}
                               //textContentType={"newPassword"}
                    />
                    <TextInput placeholder={"Conferma password"}
                               value={confirmPassword}
                               onChangeText={setConfirmPassword}
                               secureTextEntry={true}
                               style={Theme.Styles.bottomTextField}
                               //textContentType={"newPassword"}
                    />
                    <ButtonComponent title={"Crea profilo"} onPress={handleSignUp} disabled={!canSignUp} customStyle={{marginTop: 16}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 34,
        fontWeight: "bold"
    },
    form: {
        marginVertical: 16,
        width: '100%'
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8
    },
})