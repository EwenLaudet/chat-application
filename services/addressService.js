import { sql } from "../database/database.js";

const create = async (sender, message) => {
console.log(sender);
console.log(message);
  await sql`INSERT INTO messages (sender, message) VALUES (${ sender }, ${ message })`;
};

const deleteById = async (id) => {
  try {
    await sql`DELETE FROM addresses WHERE id = ${ id }`;
  } catch (e) {
    console.log(e);
  }
};

const findAll = async () => {
  return await sql`SELECT * FROM addresses`;
};

const findByNameOrAddressLike = async (nameOrAddress) => {
  const likePart = `%${nameOrAddress}%`;

  return await sql`SELECT * FROM addresses
    WHERE name ILIKE ${ namePart } OR address ILIKE ${ namePart }`;
};

const recent = async () => {
    return await sql`SELECT * FROM messages ORDER BY id DESC LIMIT 5`;  
}

export { create, deleteById, findAll, findByNameOrAddressLike, recent };