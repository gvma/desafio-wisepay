import Task from './models/Task';

const dbInit = () => {
  Task.sync();
}

export default dbInit;