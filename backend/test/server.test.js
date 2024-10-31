import * as chai from "chai"; 
import chaiHttp from "chai-http"; 
import server from "../server.js"; 

chai.use(chaiHttp); 

const { expect } = chai; 

// Test case for /api/users
describe("GET /api/users", () => {
	it("should return a list of users", async () => {
		const res = await chai.request(server).get("/api/users");
		expect(res).to.have.status(200);
		expect(res.body).to.be.a("array");
	});
});

// Test case for /api/products
describe("GET /api/products", () => {
	it("should return a list of products", async () => {
		const res = await chai.request(server).get("/api/products");
		expect(res).to.have.status(200);
		expect(res.body).to.be.a("array");
	});
});
