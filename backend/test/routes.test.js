import { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

Chai.use(chaiHttp);

describe("GET /api/products", () => {
	it("should return a list of products", async () => {
		const res = await chai.request(server).get("/api/products");
		expect(res).to.have.status(200);
		expect(res.body).to.be.a("array");
	});
});
