import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  Platform,
} from 'react-native';

const OtpVerification = ({
  phoneNumber,
  onVerify,
  onResend,
  resendDelay = 30,
  otpLength = 6,
}) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const [timer, setTimer] = useState(resendDelay);
  const [loading, setLoading] = useState(false);
  const otpInputs = useRef([]);

  // Start the resend timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-submit when all OTP digits are entered
  useEffect(() => {
    if (otp.every(digit => digit !== '') && otp.length === otpLength) {
      handleVerify();
    }
  }, [otp]);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < otpLength - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      await onVerify(otp.join(''));
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(resendDelay);
    setOtp(Array(otpLength).fill(''));
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
    onResend();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the {otpLength}-digit code sent to {phoneNumber}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (otpInputs.current[index] = ref)}
            style={[
              styles.otpInput,
              digit !== '' && styles.otpInputFilled,
              Platform.OS === 'ios' && styles.otpInputIOS,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={value => handleOtpChange(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            selectTextOnFocus
            editable={!loading}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={loading || otp.some(digit => digit === '')}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Didn't receive the code?{' '}
          {timer > 0 ? (
            <Text style={styles.timerText}>Resend in {timer}s</Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend now</Text>
            </TouchableOpacity>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  otpInputIOS: {
    paddingVertical: 15,
  },
  otpInputFilled: {
    borderColor: '#045fa5',
    backgroundColor: '#f0f7ff',
  },
  button: {
    backgroundColor: '#045fa5',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 10,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  timerText: {
    color: '#999',
  },
  resendLink: {
    color: '#045fa5',
    fontWeight: 'bold',
  },
});

export default OtpVerification;