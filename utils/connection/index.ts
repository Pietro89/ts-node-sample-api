import { createConnection, getConnection, getManager } from "typeorm";
import { populatePermission } from "../permissions";
import { User } from "../../src/entity";

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },

  async createPermissions() {
    await getConnection();
    await populatePermission();
  },

  async createTestUsers() {
    await getConnection();
    // Create a test user too
    const user = new User();
    user.email = "test@test.com";

    await getManager().save(user);
  },
    /*
  async createTestPacks() {
    await getConnection();
    let repo = getManager().getRepository(Pack);

    const pack1 = repo.create({
      packName: "A test pack",
      packMotto: "A test motto",
    });

    await repo.save(pack1);
    const pack2 = repo.create({
      packName: "A test pack 2",
      packMotto: "A test motto 2",
    });
    await repo.save(pack2);
  },
  async createTestRoutes() {
    await getConnection();
    let repo = getManager().getRepository(Route);
    const route1 = repo.create({
      area: "Melbourne",
      difficulty: RouteDifficultyEnum.MEDIUM,
      totalDistance: 40000,
    });
    await repo.save(route1);
    const route2 = repo.create({
      area: "Collingwood",
      difficulty: RouteDifficultyEnum.MEDIUM,
      totalDistance: 3400,
    });
    await repo.save(route2);
  },*/
};

export { connection };
