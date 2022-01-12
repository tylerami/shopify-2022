const { response } = require("express");
const request = require("supertest");
const app = require("../index");

// Location API service test suite
describe("Location API", () => {
  var id;
  // CREATE location test
  describe("Create Location", () => {
    // Ensure valid POST requests return the created location in JSON with status 201
    it("POST /createLocation --> create location", () => {
      return request(app)
        .post("/createLocation")
        .send({
          name: "Location name",
          address: "123 address St.",
          city: "city",
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          id = response.body.id;
          expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: "Location name",
              address: "123 address St.",
              city: "city",
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            })
          );
        });
    });
  });

  // GET inventory items tests
  describe("Get Locations", () => {
    // Ensure valid GET requests return a JSON array of locations with status 200
    it("GET /getLocations --> array of locations", () => {
      return request(app)
        .get("/getLocations")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                address: expect.any(String),
                city: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              }),
            ])
          );
        });
    });
  });

  // DELETE location tests
  describe("DELETE Inventory Items", () => {
    // Ensure valid DELETE requests return a status code of 200
    it("DELETE /deleteLocation --> delete location", () => {
      return request(app)
        .delete("/deleteLocation")
        .send({
          id: id,
        })
        .expect(200);
    });
  });
});
