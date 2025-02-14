import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ImageBackground
} from 'react-native';

const CityForm = ({ setCity, closeForm }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      setCity(inputValue);
      closeForm();
    }
  }, [inputValue, setCity, closeForm]);

  return (
    <ImageBackground style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.inner}>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                value={inputValue}
                placeholder="City"
                onChangeText={setInputValue}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const formShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  android: {
    elevation: 5,
  },
});

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    ...formShadow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  input: {
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderColor: '#8781c5',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    width: '20%',
    height: 40,
    backgroundColor: '#8781c5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CityForm;
