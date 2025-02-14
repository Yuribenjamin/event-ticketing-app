import { Event } from "../modules/events/event.entity";
import { User } from "../modules/users/user.entity";
import { ulid } from "ulid";
import { AppDataSource } from "../data-source";

const seedDatabase = async () => {
  console.log("🔄 Initializing database connection...");

  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const eventRepo = AppDataSource.getRepository(Event);

  try {
    const users = [
      { id: ulid(), name: "Ibrahim", email: "ibrahim@example.com" },
      { id: ulid(), name: "Muhammed", email: "muhammed@example.com" },
      { id: ulid(), name: "Simon", email: "simon@example.com" },
    ];

    await Promise.all(
      users.map(async (userData) => {
        const existingUser = await userRepo.findOne({
          where: { email: userData.email },
        });
        if (!existingUser) {
          await userRepo.save(userRepo.create(userData));
          console.log(`✅ User created: ${userData.name} (ID: ${userData.id})`);
        } else {
          console.log(
            `🔹 User already exists: ${existingUser.name} (ID: ${existingUser.id})`,
          );
        }
      }),
    );

    const events = [
      {
        id: ulid(),
        name: "React Conference 2025",
        date: new Date("2025-04-15T09:00:00Z"),
        totalTickets: 100,
        availableTickets: 100,
      },
      {
        id: ulid(),
        name: "NestJS Summit",
        date: new Date("2025-06-20T09:00:00Z"),
        totalTickets: 150,
        availableTickets: 150,
      },
    ];

    await Promise.all(
      events.map(async (eventData) => {
        const existingEvent = await eventRepo.findOne({
          where: { name: eventData.name },
        });
        if (!existingEvent) {
          await eventRepo.save(eventRepo.create(eventData));
          console.log(
            `✅ Event added: ${eventData.name} (ID: ${eventData.id})`,
          );
        } else {
          console.log(
            `🔹 Event already exists: ${existingEvent.name} (ID: ${existingEvent.id})`,
          );
        }
      }),
    );

    console.log("✅ Database seeding completed successfully");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await AppDataSource.destroy();
    console.log("🔌 Database connection closed");
    process.exit();
  }
};

seedDatabase().catch((err) => {
  console.error("🚨 Unexpected error:", err);
  process.exit(1);
});
