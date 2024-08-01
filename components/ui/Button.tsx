import { Pressable, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/Colors'

export interface Props {
  children: any
  onPress: () => void
}

const Button: React.FC<Props> = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary800,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4
  },
  pressed: {
    opacity: 0.75
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50
  }
})
