"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
describe('routes', function () {
    it('save', function () {
        //Testing ever conditional branch, with 3 branches. We will do two tests for error branches for more assurances
        // First branch, straight line code, error case (only one possible output), 400 error code
        const req1 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { value: "something" } });
        const res1 = httpMocks.createResponse();
        (0, routes_1.save)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "name" was missing');
        const req5 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { value: "something else" } });
        const res5 = httpMocks.createResponse();
        (0, routes_1.save)(req5, res5);
        assert.strictEqual(res5._getStatusCode(), 400);
        assert.deepStrictEqual(res5._getData(), 'required argument "name" was missing');
        // Second branch, straight line code, error case (only one possible input), 400 error code
        const req2 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: "Peepo" } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.save)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), 'required argument "value" was missing');
        // Second branch, straight line code, error case (only one possible input), 400 error code
        const req6 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: "Help" } });
        const res6 = httpMocks.createResponse();
        (0, routes_1.save)(req6, res6);
        assert.strictEqual(res6._getStatusCode(), 400);
        assert.deepStrictEqual(res6._getData(), 'required argument "value" was missing');
        // Third branch, straight line code, not replacing something, 200 code
        const req3 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: "Jared", value: "hellomrjared" } });
        const res3 = httpMocks.createResponse();
        (0, routes_1.save)(req3, res3);
        assert.strictEqual(res3._getStatusCode(), 200);
        assert.deepStrictEqual(res3._getData(), { message: 'Saved successfully' });
        //Third branch, straight line code, replacing something, 200 code
        const req4 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: "Jared", value: "hellomrstudent" } });
        const res4 = httpMocks.createResponse();
        (0, routes_1.save)(req4, res4);
        assert.strictEqual(res4._getStatusCode(), 400);
        assert.deepStrictEqual(res4._getData(), 'A deck with the name you just inputted already exists. Please try again with a different name');
        // Called to clear all saved files created in this test
        //    to not effect future tests
        (0, routes_1.resetForTesting)();
    });
    it('saveScore', function () {
        //First error, 1st test -> name is undefined, 2nd test -> name is not a string
        const req1 = httpMocks.createRequest({ method: 'POST', url: '/saveScore', body: { deck: "something different", score: 5 } });
        const res1 = httpMocks.createResponse();
        (0, routes_1.saveScore)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "name" was missing');
        const req2 = httpMocks.createRequest({ method: 'POST', url: '/saveScore', body: { name: 5, deck: "something nothing", score: 6 } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.saveScore)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), 'required argument "name" was missing');
        //First error, 1st test -> deck is undefined, 2nd test -> deck is not a string
        const req3 = httpMocks.createRequest({ method: 'POST', url: '/saveScore', body: { name: "yourname", score: 6 } });
        const res3 = httpMocks.createResponse();
        (0, routes_1.saveScore)(req3, res3);
        assert.strictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), 'required argument "deck" was missing');
        const req4 = httpMocks.createRequest({ method: 'POST', url: '/saveScore', body: { name: "myname", deck: 17, score: 8 } });
        const res4 = httpMocks.createResponse();
        (0, routes_1.saveScore)(req4, res4);
        assert.strictEqual(res4._getStatusCode(), 400);
        assert.deepStrictEqual(res4._getData(), 'required argument "deck" was missing');
        //First error, 1st test -> score is undefined, 2nd test -> score is not a number
        const req5 = httpMocks.createRequest({ method: 'POST', url: '/saveScore', body: { name: "ourname", deck: "331 is torture" } });
        const res5 = httpMocks.createResponse();
        (0, routes_1.saveScore)(req5, res5);
        assert.strictEqual(res5._getStatusCode(), 400);
        assert.deepStrictEqual(res5._getData(), 'required argument "score" was missing');
        const req6 = httpMocks.createRequest({ method: 'POST', url: '/saveScore', body: { name: "ourname", deck: "331 is torture", score: "some of the time" } });
        const res6 = httpMocks.createResponse();
        (0, routes_1.saveScore)(req6, res6);
        assert.strictEqual(res6._getStatusCode(), 400);
        assert.deepStrictEqual(res6._getData(), 'required argument "score" was missing');
        //Successful
        const req7 = httpMocks.createRequest({ method: 'POST', url: '/saveScore', body: { name: "ourname", deck: "331 is torture", score: 15 } });
        const res7 = httpMocks.createResponse();
        (0, routes_1.saveScore)(req7, res7);
        assert.strictEqual(res7._getStatusCode(), 200);
        assert.deepStrictEqual(res7._getData(), { message: 'Saved successfully' });
        // Called to clear all saved scores created in this test
        //    to not effect future tests
        (0, routes_1.resetScoresForTesting)();
    });
    it('load', function () {
        //Testing ever conditional branch, with at least two tests per each branch (3 branchs, minimum of two tests each)
        // 3rd branch, 1st Successful test, 200 code
        // First need to save something in order to load it
        const saveReq = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: "Jim", value: "hellothere" } });
        const saveResp = httpMocks.createResponse();
        (0, routes_1.save)(saveReq, saveResp);
        // Now we can actually (mock a) request to load the deck
        const loadReq = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "Jim" } });
        const loadRes = httpMocks.createResponse();
        (0, routes_1.load)(loadReq, loadRes);
        // Validate that both the status code and the output is as expected
        assert.strictEqual(loadRes._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes._getData(), { value: "hellothere" });
        //3rd branch, 2nd Sucessful test, 200 code
        // First need to save something in order to load it
        const saveReq2 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: "test", value: "this is our second test" } });
        const saveResp2 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq2, saveResp2);
        // Now we can actually (mock a) request to load the deck
        const loadReq2 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "test" } });
        const loadRes2 = httpMocks.createResponse();
        (0, routes_1.load)(loadReq2, loadRes2);
        // Validate that both the status code and the output is as expected
        assert.strictEqual(loadRes2._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes2._getData(), { value: "this is our second test" });
        //3rd branch, 3rd Sucessful test, 200 code
        // First need to save something in order to load it
        const saveReq3 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: "thoughts", value: "cs can really suck" } });
        const saveResp3 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq3, saveResp3);
        // Now we can actually (mock a) request to load the deck
        const loadReq3 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "thoughts" } });
        const loadRes3 = httpMocks.createResponse();
        (0, routes_1.load)(loadReq3, loadRes3);
        // Validate that both the status code and the output is as expected
        assert.strictEqual(loadRes3._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes3._getData(), { value: "cs can really suck" });
        //
        //1st branch, failed by undefined name, 1st test, 400 error code
        // First need to save something in order to load it
        const saveReq4 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: undefined, value: "i hate programming" } });
        const saveResp4 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq4, saveResp4);
        // Now we can actually (mock a) request to load the deck
        const loadReq4 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: undefined } });
        const loadRes4 = httpMocks.createResponse();
        (0, routes_1.load)(loadReq4, loadRes4);
        // Validate that the status code is as expected
        assert.strictEqual(loadRes4._getStatusCode(), 400);
        assert.deepStrictEqual(loadRes4._getData(), 'required argument "name" was missing');
        //1st branch, failed by undefined name, 2nd test, 400 error code
        // First need to save something in order to load it
        const saveReq5 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: undefined, value: "jared we need your light" } });
        const saveResp5 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq5, saveResp5);
        // Now we can actually (mock a) request to load the deck
        const loadReq5 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: undefined } });
        const loadRes5 = httpMocks.createResponse();
        (0, routes_1.load)(loadReq5, loadRes5);
        // Validate that the status code is as expected
        assert.strictEqual(loadRes5._getStatusCode(), 400);
        assert.deepStrictEqual(loadRes4._getData(), 'required argument "name" was missing');
        //2nd branch, failed by virtue of no previous deck under this name, 1st test, 404 error code
        // DO NOT want to save something AND SEND IT because this error is if there was nothing fully saved
        const loadReq6 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "KevinTheSecond" } });
        const loadRes6 = httpMocks.createResponse();
        (0, routes_1.load)(loadReq6, loadRes6);
        // Validate that the status code is as expected
        assert.strictEqual(loadRes6._getStatusCode(), 404);
        //2nd branch, failed by virtue of no previous deck under this name, 2nd test, 404 error code
        // DO NOT want to save something AND SEND IT because this error is if there was nothing fully saved
        const loadReq7 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "LetsGoBackToProofsPlease" } });
        const loadRes7 = httpMocks.createResponse();
        (0, routes_1.load)(loadReq7, loadRes7);
        // Validate that the status code is as expected
        assert.strictEqual(loadRes7._getStatusCode(), 404);
        // Called to clear all saved files created in this test
        //    to not effect future tests
        (0, routes_1.resetForTesting)();
    });
    it('list', function () {
        /*//Testing ever conditional branch, with 2 branches. We will not do more than one test for the first branch, but will
        //do 3 for the second branch
    
        //Do not want to save something for the first branch, which is if there are no saved files, 404 error code
        const loadReq = httpMocks.createRequest(
        {method: 'GET', url: '/list', query: {}});
        const loadRes = httpMocks.createResponse();
        list(loadReq, loadRes);
        // Validate that the status code is as expected
        assert.strictEqual(loadRes._getStatusCode(), 404);*/
        //"Error" checking above broke it because empty list is not an error
        //Now we must load in decks to ensure that also works
        //All three following tests are second branch, with a code of 200
        // First need to save something in order to load it
        //Test 1
        const saveReq2 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: "James", value: "\"abstract art\"" } });
        const saveResp2 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq2, saveResp2);
        // Now we can try our list function
        const loadReq2 = httpMocks.createRequest({ method: 'GET', url: '/list', query: { name: "James" } });
        const loadRes2 = httpMocks.createResponse();
        (0, routes_1.list)(loadReq2, loadRes2);
        // Validate that both the status code and the output is as expected
        assert.strictEqual(loadRes2._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes2._getData(), { list: ["James"] });
        //Test 2, we should have the saved value from the previous response come in
        const saveReq3 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: "test", value: "this is our second test" } });
        const saveResp3 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq3, saveResp3);
        // Now we can try our list function
        const loadReq3 = httpMocks.createRequest({ method: 'GET', url: '/list', query: { name: "test" } });
        const loadRes3 = httpMocks.createResponse();
        (0, routes_1.list)(loadReq3, loadRes3);
        // Validate that both the status code and the output is as expected
        assert.strictEqual(loadRes3._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes3._getData(), { list: ["James", "test"] });
        //Test 3, we should have both previous saved values in here
        // First need to save something in order to load it
        const saveReq4 = httpMocks.createRequest({ method: 'POST', url: '/save',
            body: { name: "psychiatrist", value: "jared seems disillusioned with society" } });
        const saveResp4 = httpMocks.createResponse();
        (0, routes_1.save)(saveReq4, saveResp4);
        // Now we can try our list function
        const loadReq4 = httpMocks.createRequest({ method: 'GET', url: '/list', query: { name: "psychiatrist" } });
        const loadRes4 = httpMocks.createResponse();
        (0, routes_1.list)(loadReq4, loadRes4);
        // Validate that both the status code and the output is as expected
        assert.strictEqual(loadRes4._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes4._getData(), { list: ["James", "test", "psychiatrist"] });
        // Called to clear all saved files created in this test
        //    to not effect future tests
        (0, routes_1.resetForTesting)();
    });
    it('listScores', function () {
        /*//1 test for the first branch, with error, 3 for second
        const loadReq = httpMocks.createRequest(
        {method: 'GET', url: '/loadScores', query: {}});
        const loadRes = httpMocks.createResponse();
        listScores(loadReq, loadRes);
        // Validate that the status code is as expected
        assert.strictEqual(loadRes._getStatusCode(), 404);*/
        //"Error" checking above broke it because empty list is not an error
        const saveReq2 = httpMocks.createRequest({ method: 'POST', url: '/saveScore',
            body: { name: "James", deck: "331 is super hell", score: 70 } });
        const saveResp2 = httpMocks.createResponse();
        (0, routes_1.saveScore)(saveReq2, saveResp2);
        // Now we can try our list function
        const loadReq2 = httpMocks.createRequest({ method: 'GET', url: '/loadScores', query: { name: "James", deck: "331 is super hell", score: 70 } });
        const loadRes2 = httpMocks.createResponse();
        (0, routes_1.listScores)(loadReq2, loadRes2);
        // Validate that both the status code and the output is as expected
        assert.strictEqual(loadRes2._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes2._getData(), { list: [{ name: "James", deck: "331 is super hell", score: 70 }] });
        (0, routes_1.resetScoresForTesting)();
        const saveReq3 = httpMocks.createRequest({ method: 'POST', url: '/saveScore',
            body: { name: "me", deck: "mom come pick me up I'm scared", score: 45 } });
        const saveResp3 = httpMocks.createResponse();
        (0, routes_1.saveScore)(saveReq3, saveResp3);
        // Now we can try our list function
        const loadReq3 = httpMocks.createRequest({ method: 'GET', url: '/loadScores', query: { name: "me", deck: "mom come pick me up I'm scared", score: 45 } });
        const loadRes3 = httpMocks.createResponse();
        (0, routes_1.listScores)(loadReq3, loadRes3);
        // Validate that both the status code and the output is as expected
        assert.strictEqual(loadRes3._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes3._getData(), { list: [{ name: "me", deck: "mom come pick me up I'm scared", score: 45 }] });
        const saveReq4 = httpMocks.createRequest({ method: 'POST', url: '/saveScore',
            body: { name: "help", deck: "they are making me right so many tests I am so scared", score: 100 } });
        const saveResp4 = httpMocks.createResponse();
        (0, routes_1.saveScore)(saveReq4, saveResp4);
        // Now we can try our list function
        const loadReq4 = httpMocks.createRequest({ method: 'GET', url: '/loadScores', query: { name: "help", deck: "they are making me right so many tests I am so scared", score: 100 } });
        const loadRes4 = httpMocks.createResponse();
        (0, routes_1.listScores)(loadReq4, loadRes4);
        // Validate that both the status code and the output is as expected (THIS INCLUDES VALUE FROM TEST 2)
        assert.strictEqual(loadRes4._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes4._getData(), { list: [{ name: "me", deck: "mom come pick me up I'm scared", score: 45 }, { name: "help", deck: "they are making me right so many tests I am so scared", score: 100 }] });
        // Called to clear all saved sccores created in this test
        //    to not effect future tests
        (0, routes_1.resetScoresForTesting)();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQTJHO0FBRzNHLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFFakIsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUVULCtHQUErRztRQUcvRywwRkFBMEY7UUFDMUYsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FDaEMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBQyxFQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxhQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNwQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQ2hDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBQyxFQUFDLENBQUMsQ0FBQztRQUNyRSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxhQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdB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