const { response } = require("express");
const request = require("supertest");
const app = require("../index");

// Inventory CRUD service test suite
describe("Inventory API", () => {
  var id;
  // CREATE inventory tests
  describe("Create Inventory Item", () => {
    // Ensure valid POST requests return the created item in JSON with status 201
    it("POST /createItem --> create item", () => {
      return request(app)
        .post("/createItem")
        .send({
          name: "Item name",
          quantity: 0,
          unitValue: 0,
          location: "Location name",
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          id = response.body.id;
          expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: "Item name",
              quantity: 0,
              unitValue: 0.0,
              location: "Location name",
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            })
          );
        });
    });
  });

  // GET inventory items tests
  describe("Get Inventory Items", () => {
    // Ensure valid GET requests return a JSON array of items with status 200
    it("GET /getItems --> array of items", () => {
      return request(app)
        .get("/getItems")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                quantity: expect.any(Number),
                unitValue: expect.any(Number),
                location: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              }),
            ])
          );
        });
    });
  });

  // UPDATE inventory items tests
  describe("Update Inventory Items", () => {
    // Ensure valid UPDATE requests return a JSON object of the updated item with status 200
    it("PUT /updateItem --> update item", () => {
      return request(app)
        .put("/updateItem")
        .send({
          id: id,
          name: "Updated name",
          quantity: 1,
          unitValue: 1.0,
          location: "Updated location",
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: "Updated name",
              quantity: 1,
              unitValue: 1.0,
              location: "Updated location",
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            })
          );
        });
    });
  });

  // DELETE inventory items tests
  describe("DELETE Inventory Items", () => {
    // Ensure valid DELETE requests return a status code of 200
    it("DELETE /deleteItem --> delete item", () => {
      return request(app)
        .delete("/deleteItem")
        .send({
          id: id,
        })
        .expect(200);
    });
  });

  afterAll(as);
});
