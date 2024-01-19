import React, { useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedModal = ({ visible, result, onClose }) => {
  const translateY = useSharedValue(400);

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const showModal = () => {
    translateY.value = withSpring(0, { damping: 2, stiffness: 80 });
  };

  const hideModal = () => {
    translateY.value = withSpring(400, { damping: 2, stiffness: 80 });
  };

  const handleModalAnimation = () => {
    if (visible) {
      showModal();
    } else {
      hideModal();
    }
  };

  useRef(() => {
    handleModalAnimation();
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modal, modalStyle]}>
          <Text style={styles.resultText}>{result}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AnimatedModal;
