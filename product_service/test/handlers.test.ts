import { APIGatewayProxyEvent } from "aws-lambda";
import { handler as getProductsList } from "../src/handlers/getProductsList";
import { handler as getProductById } from "../src/handlers/getProductById";
import { products as mockProducts } from "../src/mockData";

const createMockEvent = (pathParameters?: {
    [name: string]: string;
}): APIGatewayProxyEvent => ({
    body: null,
    headers: {},
    multiValueHeaders: {},
    httpMethod: "GET",
    isBase64Encoded: false,
    path: "/products",
    pathParameters: pathParameters || null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
        accountId: "test",
        apiId: "test",
        authorizer: {},
        protocol: "HTTP/1.1",
        httpMethod: "GET",
        identity: {
            accessKey: null,
            accountId: null,
            apiKey: null,
            apiKeyId: null,
            caller: null,
            clientCert: null,
            cognitoAuthenticationProvider: null,
            cognitoAuthenticationType: null,
            cognitoIdentityId: null,
            cognitoIdentityPoolId: null,
            principalOrgId: null,
            sourceIp: "127.0.0.1",
            user: null,
            userAgent: null,
            userArn: null,
        },
        path: "/products",
        stage: "test",
        requestId: "test",
        requestTimeEpoch: 1234567890,
        resourceId: "test",
        resourcePath: "/products",
    },
    resource: "/products",
});

describe("getProductsList", () => {
    it("should return all products", async () => {
        const mockEvent = createMockEvent();
        const result = await getProductsList(mockEvent);
        expect(result.statusCode).toBe(200);

        const responseBody = JSON.parse(result.body);
        expect(responseBody).toEqual(mockProducts);
    });
});

describe("getProductById", () => {
    it("should return a product when valid ID is provided", async () => {
        const mockEvent = createMockEvent({ productId: "1" });
        const result = await getProductById(mockEvent);
        expect(result.statusCode).toBe(200);

        const responseBody = JSON.parse(result.body);
        expect(responseBody).toEqual(mockProducts[0]);
    });

    it("should return 404 when product is not found", async () => {
        const mockEvent = createMockEvent({ productId: "invalid-id" });
        const result = await getProductById(mockEvent);
        expect(result.statusCode).toBe(404);
    });
});
