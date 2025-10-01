import { appDatasource } from '../datasource';
import { Role, User } from '../entities';

async function init() {
  await appDatasource.initialize();
  
  console.log('Data Source has been initialized!');
  console.log('Seeding initial data...');

  const roleRepository = appDatasource.getRepository(Role);
  
  const adminRole = await roleRepository.save({ roleName: 'Admin' });
  const editorRole = await roleRepository.save({ roleName: 'Editor' });
  const viewerRole = await roleRepository.save({ roleName: 'Viewer' });

  const users = [
    { username: 'Alice', email: 'alice@mail.com', password: 'p1', roles: [adminRole, editorRole, viewerRole] },
    { username: 'Bob', email: 'bob@mail.com', password: 'p2', roles: [adminRole, editorRole, viewerRole] },
    { username: 'Charlie', email: 'charlie@mail.com', password: 'p3', roles: [viewerRole] },
    { username: 'David', email: 'david@mail.com', password: 'p4', roles: [editorRole] },
    { username: 'Eve', email: 'eve@example.com', password: 'p5', roles: [editorRole, viewerRole] },
  ];

  const userRepository = appDatasource.getRepository(User);

  await Promise.all(users.map((user) => userRepository.save(user)));

  console.log('Seeding completed.');

  await appDatasource.destroy();
}

init().catch((err) => {
  console.error('Error during Data Source initialization or seeding:', err);
  process.exit(1);
});
