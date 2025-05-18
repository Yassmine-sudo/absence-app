import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import API from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student'); // student | teacher | admin
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await API.post('/auth/signup', { username, email, role, password });
      Alert.alert('Succès', 'Compte créé avec succès');
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur', err.response?.data?.message || 'Inscription échouée');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput placeholder="Nom d'utilisateur" style={styles.input} onChangeText={setUsername} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Rôle (admin / teacher / student)" style={styles.input} onChangeText={setRole} />
      <TextInput placeholder="Mot de passe" style={styles.input} secureTextEntry onChangeText={setPassword} />
      <Button title="Créer un compte" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});
