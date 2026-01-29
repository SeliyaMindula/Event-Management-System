import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../users/users.service';
import { UserRole } from '../../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Create Super Admin
    let existingSuperAdmin = await usersService.findByEmail('superadmin@example.com');
    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash('SuperAdmin123!', 10);
      await usersService.create({
        email: 'superadmin@example.com',
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        name: 'Super Administrator',
      });
      console.log('Super Admin created successfully:');
      console.log('Email: superadmin@example.com');
      console.log('Password: SuperAdmin123!');
      console.log('Role: SUPER_ADMIN\n');
    } else {
      console.log('Super Admin already exists\n');
    }

    // Create Admin
    let existingAdmin = await usersService.findByEmail('admin@example.com');
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      await usersService.create({
        email: 'admin@example.com',
        password: hashedPassword,
        role: UserRole.ADMIN,
        name: 'Administrator',
      });
      console.log('Admin created successfully:');
      console.log('Email: admin@example.com');
      console.log('Password: Admin123!');
      console.log('Role: ADMIN\n');
    } else {
      console.log('Admin already exists\n');
    }

    // Create Student
    let existingStudent = await usersService.findByEmail('student@example.com');
    if (!existingStudent) {
      const hashedPassword = await bcrypt.hash('Student123!', 10);
      await usersService.create({
        email: 'student@example.com',
        password: hashedPassword,
        role: UserRole.STUDENT,
        name: 'Student User',
      });
      console.log('Student created successfully:');
      console.log('Email: student@example.com');
      console.log('Password: Student123!');
      console.log('Role: STUDENT\n');
    } else {
      console.log('Student already exists\n');
    }

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();

