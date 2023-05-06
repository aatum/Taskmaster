import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -300,
    paddingHorizontal: 20,
    
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskList: {
    flex: 1,
  },
  task: {
    fontSize: 18,
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'space-between',
  },
  taskContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 75,
  },
  taskName: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  taskListContainer: {
    paddingTop: 40,
    paddingBottom: 50
  },
  radioContainer: {
    marginVertical: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#6200ee',
  },
  radioHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  headerCell: {
    textAlign: 'center'
  },  
  addTaskButtonContainer: {  
    marginTop: 40,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default styles;
