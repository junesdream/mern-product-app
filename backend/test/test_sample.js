import * as chai from "chai"; // Import chai as a namespace
import chaiHttp from "chai-http"; // Import chai-http
import server from "../server.js"; // Import server

const { expect } = chai; // Destructure expect from chai

chai.use(chaiHttp); // Use chaiHttp with chai

// Sample test
describe("Sample Test", () => {
	it("should pass this sample test", () => {
		expect(true).to.be.true;
	});
});
