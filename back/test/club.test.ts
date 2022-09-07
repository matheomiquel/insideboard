import { app } from "../app";
import request, { agent } from "supertest";
import { describe, expect } from "@jest/globals";
import { clubModel } from '@data/database/model'

const clubName = 'toto'
const newClubName = 'tata'
agent(app);

describe("test crud", () => {
  afterEach(() => {
    clubModel.collection.drop();
  });
  it("should create a new post", async () => {
    const createClub = await request(app)
      .post("/club")
      .send({ name: clubName })
    expect(createClub.statusCode).toEqual(201);
    expect(createClub.body.name).toEqual(clubName)


    const getClubs = await request(app)
      .get("/club")
    expect(getClubs.statusCode).toEqual(200);
    expect(Array.isArray([getClubs.body])).toBe(true)
    expect(getClubs.body.length).toEqual(1)

    const updatedClub = await request(app)
      .put(`/club/${createClub.body.id}`)
      .send({ name: newClubName })
    expect(updatedClub.statusCode).toEqual(200);
    expect(updatedClub.body.name).toEqual(newClubName)
   

    const deleteClub = await request(app)
      .delete(`/club/${createClub.body.id}`)
    expect(deleteClub.statusCode).toEqual(204);

    const getClubAfterDelete = await request(app)
      .get("/club")
    expect(getClubAfterDelete.body.length).toEqual(0)
  });
});
