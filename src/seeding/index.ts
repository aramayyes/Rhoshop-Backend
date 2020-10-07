import * as mongoose from 'mongoose';
import { NotificationSchema } from '../notifications/schemas';
import { CategorySchema } from '../categories/shemas';
import notifications from './notifications';
import categories from './categories';

const NotificationsModel = mongoose.model('Notifications', NotificationSchema);
const CategoriesModel = mongoose.model('Categories', CategorySchema);

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/roshop', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

async function seed() {
  await connect();

  const categoryDocs = await seedCollection(
    CategoriesModel,
    'Categories',
    categories,
  );

  const notificationDocs = await seedCollection(
    NotificationsModel,
    'Notifications',
    notifications,
  );
}

async function seedCollection(
  model: mongoose.Model<mongoose.Document>,
  collectionName: string,
  collection: any[],
) {
  let items = await model.find({});

  if (items.length != 0) {
    console.log(`${collectionName} are already inserted. Skipping...`);
    return items;
  }

  console.log(`Inserting ${collectionName}...`);
  items = await Promise.all(collection.map(c => CategoriesModel.create(c)));
  console.log(`${collectionName} are inserted.`);

  return items;
}

seed()
  .catch(e => console.log(e))
  .finally(() => process.exit());
