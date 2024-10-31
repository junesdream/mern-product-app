import { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";

Chai.use(chaiHttp);

describe("GET /api/users", () => {
	it("should return a list of users", async () => {
		const res = await chai.request(server).get("/api/users");
		expect(res).to.have.status(200);
		expect(res.body).to.be.a("array");
	});
});
