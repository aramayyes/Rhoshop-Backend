import * as mongoose from 'mongoose';
import { NotificationSchema } from '../notifications/schemas';
import notifications from './notifications';

const NotificationsModel = mongoose.model('Notifications', NotificationSchema);

mongoose
  .connect('mongodb://localhost:27017/roshop', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Adding notifications');
    return Promise.all(notifications.map(n => NotificationsModel.create(n)));
  })
  .then(() => console.log('Notifications added.'))
  .catch(e => console.log(e))
  .finally(() => process.exit());
