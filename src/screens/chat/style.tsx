import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  smsContainer: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: 'darkgrey',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    marginBottom: 16,
  },
  sendTime: {
fontSize: 10, 
fontStyle:'italic',
 margin: 4
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    padding: 8,
    margin: 4,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  partnerMessage: {
    backgroundColor: '#E8E8E8',
    padding: 8,
    margin: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E8E8E8',
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  senInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  userIconContainer: {
    paddingRight: 8,
  },
});
