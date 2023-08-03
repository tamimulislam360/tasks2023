const { expect } = require("chai");
const request = require("supertest");
const app = require("../index");
const Task = require("../models/Task");

describe("Task Management API", () => {
  let taskId;

  // Test for creating a new task
  it("should create a new task", async () => {
    const taskData = {
      title: "Sample Task",
      description: "This is a sample task.",
    };

    const res = await request(app).post("/api/tasks").send(taskData);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
    expect(res.body.title).to.equal(taskData.title);
    expect(res.body.description).to.equal(taskData.description);

    taskId = res.body._id;
  });

  // Test for partial update of a task (e.g., update status only)
  it("should partially update a task", async () => {
    const updateData = {
      status: "completed",
    };

    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send(updateData);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
    expect(res.body._id).to.equal(taskId);

    // Ensure that only the status field is updated
    expect(res.body.status).to.equal(updateData.status);

    // Check that the other fields (title, description) remain unchanged
    const task = await Task.findById(taskId);
    expect(task.title).to.not.equal(updateData.title);
    expect(task.description).to.not.equal(updateData.description);
  });

  // Test for updating multiple fields of a task
  it("should update multiple fields of a task", async () => {
    const updateData = {
      title: "Updated Task Title",
      status: "in-progress",
    };

    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send(updateData);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
    expect(res.body._id).to.equal(taskId);

    // Ensure that both title and status fields are updated
    expect(res.body.title).to.equal(updateData.title);
    expect(res.body.status).to.equal(updateData.status);

    // Check that the description remains unchanged
    const task = await Task.findById(taskId);
    expect(task.description).to.not.equal(updateData.description);
  });

  // Test for fetching all tasks
  it("should fetch all tasks", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });

  // Test for deleting a task
  it("should delete a task", async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("Task deleted successfully");
  });
});
