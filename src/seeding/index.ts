import * as mongoose from 'mongoose';
import { CategorySchema } from '../categories/shemas';
import { ProductSchema } from '../products/schemas';
import { NotificationSchema } from '../notifications/schemas';
import { UserSchema } from '../users/schemas';
import categories from './categories';
import products from './products';
import notifications from './notifications';
import users from './users';
import { hashPassword } from '../utils';

const CategoriesModel = mongoose.model('Categories', CategorySchema);
const ProductsModel = mongoose.model('Products', ProductSchema);
const NotificationsModel = mongoose.model('Notifications', NotificationSchema);
const UsersModel = mongoose.model('Users', UserSchema);

async function connect() {
  console.log('Connecting to db...');
  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  console.log('Connected.');
}

async function seed() {
  await connect();

  await seedCollection(CategoriesModel, 'Categories', categories);
  await seedCollection(ProductsModel, 'Products', products);
  await seedCollection(NotificationsModel, 'Notifications', notifications);
  await seedCollection(
    UsersModel,
    'Users',
    await Promise.all(
      users.map(async u => {
        u.password = await hashPassword(u.password);
        return u;
      }),
    ),
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
  items = await Promise.all(collection.map(c => model.create(c)));
  console.log(`${collectionName} are inserted.`);

  return items;
}

seed()
  .then(() => console.log('Done'))
  .catch(e => console.log(e))
  .finally(() => process.exit());
