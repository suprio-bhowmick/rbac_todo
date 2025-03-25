import {
  MongoAbility,
  AbilityBuilder,
  createMongoAbility,
  MongoQuery,
} from "@casl/ability";

export type Actions = "toggle" | "create" | "read" | "update" | "delete";
export type Subjects = "Todo";

export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>;

export function defineAbilityFor(role: string): AppAbility {
  const { can, rules } = new AbilityBuilder<
    MongoAbility<[Actions, Subjects], MongoQuery>
  >(createMongoAbility);

  if (role === "admin") {
    can(["create", "read", "update", "delete", "toggle"], "Todo"); // Admin can do everything
  } else if (role === "editor") {
    can(["create", "read", "update", "toggle"], "Todo");
  } else if (role === "user") {
    can(["read", "toggle"], "Todo");
  } else {
    can("read", "Todo"); // Default permissions for regular users
  }

  return createMongoAbility<[Actions, Subjects], MongoQuery>(rules);
}
