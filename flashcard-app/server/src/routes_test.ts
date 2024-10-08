import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { save, list, load, saveScore, listScores, resetForTesting, resetScoresForTesting } from './routes';


describe('routes', function() {

  it('save', function(){

    //Testing ever conditional branch, with 3 branches. We will do two tests for error branches for more assurances


    // First branch, straight line code, error case (only one possible output), 400 error code
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {value: "something"}});
    const res1 = httpMocks.createResponse();
    save(req1, res1);

    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(),
      'required argument "name" was missing');

    const req5 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {value: "something else"}});
    const res5 = httpMocks.createResponse();
    save(req5, res5);

    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(),
      'required argument "name" was missing');



    // Second branch, straight line code, error case (only one possible input), 400 error code
    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {name: "Peepo"}});
    const res2 = httpMocks.createResponse();
    save(req2, res2);

    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(),
      'required argument "value" was missing');

    // Second branch, straight line code, error case (only one possible input), 400 error code
    const req6 = httpMocks.createRequest(
      {method: 'POST', url: '/save', body: {name: "Help"}});
    const res6 = httpMocks.createResponse();
    save(req6, res6);

    assert.strictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(res6._getData(),
      'required argument "value" was missing');


    // Third branch, straight line code, not replacing something, 200 code
    const req3 = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "Jared", value: "hellomrjared"}});
    const res3 = httpMocks.createResponse();
    save(req3, res3);

    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData(), {message: 'Saved successfully'});



    //Third branch, straight line code, replacing something, 200 code
    const req4 = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "Jared", value: "hellomrstudent"}});
    const res4 = httpMocks.createResponse();
    save(req4, res4);

    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), 
    'A deck with the name you just inputted already exists. Please try again with a different name');


    // Called to clear all saved files created in this test
    //    to not effect future tests
    resetForTesting();


  });


  it('saveScore', function(){
    //First error, 1st test -> name is undefined, 2nd test -> name is not a string
    const req1 = httpMocks.createRequest(
      {method: 'POST', url: '/saveScore', body: {deck: "something different", score: 5}});
    const res1 = httpMocks.createResponse();
    saveScore(req1, res1);

    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(),
      'required argument "name" was missing');


    const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/saveScore', body: {name: 5, deck: "something nothing", score: 6}});
    const res2 = httpMocks.createResponse();
    saveScore(req2, res2);

    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(),
      'required argument "name" was missing');

    //First error, 1st test -> deck is undefined, 2nd test -> deck is not a string
    const req3 = httpMocks.createRequest(
      {method: 'POST', url: '/saveScore', body: {name: "yourname", score: 6}});
    const res3 = httpMocks.createResponse();
    saveScore(req3, res3);

    assert.strictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(),
      'required argument "deck" was missing');

    const req4 = httpMocks.createRequest(
      {method: 'POST', url: '/saveScore', body: {name: "myname", deck: 17, score: 8}});
    const res4 = httpMocks.createResponse();
    saveScore(req4, res4);

    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(),
      'required argument "deck" was missing');


    //First error, 1st test -> score is undefined, 2nd test -> score is not a number
    const req5 = httpMocks.createRequest(
      {method: 'POST', url: '/saveScore', body: {name: "ourname", deck: "331 is torture"}});
    const res5 = httpMocks.createResponse();
    saveScore(req5, res5);

    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(),
      'required argument "score" was missing');

    const req6 = httpMocks.createRequest(
      {method: 'POST', url: '/saveScore', body: {name: "ourname", deck: "331 is torture", score: "some of the time"}});
    const res6 = httpMocks.createResponse();
    saveScore(req6, res6);

    assert.strictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(res6._getData(),
      'required argument "score" was missing');

    //Successful

    const req7 = httpMocks.createRequest(
      {method: 'POST', url: '/saveScore', body: {name: "ourname", deck: "331 is torture", score: 15}});
    const res7 = httpMocks.createResponse();
    saveScore(req7, res7);

    assert.strictEqual(res7._getStatusCode(), 200);
    assert.deepStrictEqual(res7._getData(),
      {message: 'Saved successfully'});


    // Called to clear all saved scores created in this test
    //    to not effect future tests
    resetScoresForTesting();
  });



  it('load', function(){

    //Testing ever conditional branch, with at least two tests per each branch (3 branchs, minimum of two tests each)

    // 3rd branch, 1st Successful test, 200 code
    // First need to save something in order to load it
    const saveReq = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "Jim", value: "hellothere"}});
    const saveResp = httpMocks.createResponse();
    save(saveReq, saveResp);
    // Now we can actually (mock a) request to load the deck
    const loadReq = httpMocks.createRequest(
        {method: 'GET', url: '/load', query: {name: "Jim"}});
    const loadRes = httpMocks.createResponse();
    load(loadReq, loadRes);
    // Validate that both the status code and the output is as expected
    assert.strictEqual(loadRes._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes._getData(), {value: "hellothere"});

    //3rd branch, 2nd Sucessful test, 200 code
    // First need to save something in order to load it
    const saveReq2 = httpMocks.createRequest({method: 'POST', url: '/save',
    body: {name: "test", value: "this is our second test"}});
    const saveResp2 = httpMocks.createResponse();
    save(saveReq2, saveResp2);
    // Now we can actually (mock a) request to load the deck
    const loadReq2 = httpMocks.createRequest(
    {method: 'GET', url: '/load', query: {name: "test"}});
    const loadRes2 = httpMocks.createResponse();
    load(loadReq2, loadRes2);
    // Validate that both the status code and the output is as expected
    assert.strictEqual(loadRes2._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes2._getData(), {value: "this is our second test"});

    //3rd branch, 3rd Sucessful test, 200 code
    // First need to save something in order to load it
    const saveReq3 = httpMocks.createRequest({method: 'POST', url: '/save',
    body: {name: "thoughts", value: "cs can really suck"}});
    const saveResp3 = httpMocks.createResponse();
    save(saveReq3, saveResp3);
    // Now we can actually (mock a) request to load the deck
    const loadReq3 = httpMocks.createRequest(
    {method: 'GET', url: '/load', query: {name: "thoughts"}});
    const loadRes3 = httpMocks.createResponse();
    load(loadReq3, loadRes3);
    // Validate that both the status code and the output is as expected
    assert.strictEqual(loadRes3._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes3._getData(), {value: "cs can really suck"});

    //

    //1st branch, failed by undefined name, 1st test, 400 error code
    // First need to save something in order to load it
    const saveReq4 = httpMocks.createRequest({method: 'POST', url: '/save',
    body: {name: undefined, value: "i hate programming"}});
    const saveResp4 = httpMocks.createResponse();
    save(saveReq4, saveResp4);
    // Now we can actually (mock a) request to load the deck
    const loadReq4 = httpMocks.createRequest(
    {method: 'GET', url: '/load', query: {name: undefined}});
    const loadRes4 = httpMocks.createResponse();
    load(loadReq4, loadRes4);
    // Validate that the status code is as expected
    assert.strictEqual(loadRes4._getStatusCode(), 400);
    assert.deepStrictEqual(loadRes4._getData(),
      'required argument "name" was missing');

    //1st branch, failed by undefined name, 2nd test, 400 error code
    // First need to save something in order to load it
    const saveReq5 = httpMocks.createRequest({method: 'POST', url: '/save',
    body: {name: undefined, value: "jared we need your light"}});
    const saveResp5 = httpMocks.createResponse();
    save(saveReq5, saveResp5);
    // Now we can actually (mock a) request to load the deck
    const loadReq5 = httpMocks.createRequest(
    {method: 'GET', url: '/load', query: {name: undefined}});
    const loadRes5 = httpMocks.createResponse();
    load(loadReq5, loadRes5);
    // Validate that the status code is as expected
    assert.strictEqual(loadRes5._getStatusCode(), 400);
    assert.deepStrictEqual(loadRes4._getData(),
      'required argument "name" was missing');

    //2nd branch, failed by virtue of no previous deck under this name, 1st test, 404 error code
    // DO NOT want to save something AND SEND IT because this error is if there was nothing fully saved
    const loadReq6 = httpMocks.createRequest(
    {method: 'GET', url: '/load', query: {name: "KevinTheSecond"}});
    const loadRes6 = httpMocks.createResponse();
    load(loadReq6, loadRes6);
    // Validate that the status code is as expected
    assert.strictEqual(loadRes6._getStatusCode(), 404);

    //2nd branch, failed by virtue of no previous deck under this name, 2nd test, 404 error code
    // DO NOT want to save something AND SEND IT because this error is if there was nothing fully saved
    const loadReq7 = httpMocks.createRequest(
    {method: 'GET', url: '/load', query: {name: "LetsGoBackToProofsPlease"}});
    const loadRes7 = httpMocks.createResponse();
    load(loadReq7, loadRes7);
    // Validate that the status code is as expected
    assert.strictEqual(loadRes7._getStatusCode(), 404);


    // Called to clear all saved files created in this test
    //    to not effect future tests
    resetForTesting();

  });

  it('list', function(){

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
    const saveReq2 = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "James", value: "\"abstract art\""}});
    const saveResp2 = httpMocks.createResponse();
    save(saveReq2, saveResp2);
    // Now we can try our list function
    const loadReq2 = httpMocks.createRequest(
        {method: 'GET', url: '/list', query: {name: "James"}});
    const loadRes2 = httpMocks.createResponse();
    list(loadReq2, loadRes2);
    // Validate that both the status code and the output is as expected
    assert.strictEqual(loadRes2._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes2._getData(), {list: ["James"]});

    //Test 2, we should have the saved value from the previous response come in
    const saveReq3 = httpMocks.createRequest({method: 'POST', url: '/save',
    body: {name: "test", value: "this is our second test"}});
    const saveResp3 = httpMocks.createResponse();
    save(saveReq3, saveResp3);
    // Now we can try our list function
    const loadReq3 = httpMocks.createRequest(
    {method: 'GET', url: '/list', query: {name: "test"}});
    const loadRes3 = httpMocks.createResponse();
    list(loadReq3, loadRes3);
    // Validate that both the status code and the output is as expected
    assert.strictEqual(loadRes3._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes3._getData(), {list: ["James", "test"]});

    //Test 3, we should have both previous saved values in here
    // First need to save something in order to load it
    const saveReq4 = httpMocks.createRequest({method: 'POST', url: '/save',
    body: {name: "psychiatrist", value: "jared seems disillusioned with society"}});
    const saveResp4 = httpMocks.createResponse();
    save(saveReq4, saveResp4);
    // Now we can try our list function
    const loadReq4 = httpMocks.createRequest(
    {method: 'GET', url: '/list', query: {name: "psychiatrist"}});
    const loadRes4 = httpMocks.createResponse();
    list(loadReq4, loadRes4);
    // Validate that both the status code and the output is as expected
    assert.strictEqual(loadRes4._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes4._getData(), {list: ["James", "test", "psychiatrist"]});


    // Called to clear all saved files created in this test
    //    to not effect future tests
    resetForTesting();

  });


  it('listScores', function(){
    /*//1 test for the first branch, with error, 3 for second
    const loadReq = httpMocks.createRequest(
    {method: 'GET', url: '/loadScores', query: {}});
    const loadRes = httpMocks.createResponse();
    listScores(loadReq, loadRes);
    // Validate that the status code is as expected
    assert.strictEqual(loadRes._getStatusCode(), 404);*/


    //"Error" checking above broke it because empty list is not an error


    const saveReq2 = httpMocks.createRequest({method: 'POST', url: '/saveScore',
        body: {name: "James", deck: "331 is super hell", score: 70}});
    const saveResp2 = httpMocks.createResponse();
    saveScore(saveReq2, saveResp2);
    // Now we can try our list function
    const loadReq2 = httpMocks.createRequest(
        {method: 'GET', url: '/loadScores', query: {name: "James", deck: "331 is super hell", score: 70}});
    const loadRes2 = httpMocks.createResponse();
    listScores(loadReq2, loadRes2);
    // Validate that both the status code and the output is as expected
    assert.strictEqual(loadRes2._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes2._getData(), {list: [{name: "James", deck: "331 is super hell", score: 70}]});

    resetScoresForTesting();

    const saveReq3 = httpMocks.createRequest({method: 'POST', url: '/saveScore',
        body: {name: "me", deck: "mom come pick me up I'm scared", score: 45}});
    const saveResp3 = httpMocks.createResponse();
    saveScore(saveReq3, saveResp3);
    // Now we can try our list function
    const loadReq3 = httpMocks.createRequest(
        {method: 'GET', url: '/loadScores', query: {name: "me", deck: "mom come pick me up I'm scared", score: 45}});
    const loadRes3 = httpMocks.createResponse();
    listScores(loadReq3, loadRes3);
    // Validate that both the status code and the output is as expected
    assert.strictEqual(loadRes3._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes3._getData(), {list: [{name: "me", deck: "mom come pick me up I'm scared", score: 45}]});


    const saveReq4 = httpMocks.createRequest({method: 'POST', url: '/saveScore',
        body: {name: "help", deck: "they are making me right so many tests I am so scared", score: 100}});
    const saveResp4 = httpMocks.createResponse();
    saveScore(saveReq4, saveResp4);
    // Now we can try our list function
    const loadReq4 = httpMocks.createRequest(
        {method: 'GET', url: '/loadScores', query: {name: "help", deck: "they are making me right so many tests I am so scared", score: 100}});
    const loadRes4 = httpMocks.createResponse();
    listScores(loadReq4, loadRes4);
    // Validate that both the status code and the output is as expected (THIS INCLUDES VALUE FROM TEST 2)
    assert.strictEqual(loadRes4._getStatusCode(), 200);
    assert.deepStrictEqual(loadRes4._getData(), {list: [{name: "me", deck: "mom come pick me up I'm scared", score: 45} , {name: "help", deck: "they are making me right so many tests I am so scared", score: 100}]});



    // Called to clear all saved sccores created in this test
    //    to not effect future tests
    resetScoresForTesting();
  });

  
});
