import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";

export class ProductServiceStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const getProductsList = new lambda.Function(this, "getProductsList", {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: "handlers/getProductsList.handler",
            code: lambda.Code.fromAsset(path.join(__dirname, "../dist")),
        });

        const getProductById = new lambda.Function(this, "getProductById", {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: "handlers/getProductById.handler",
            code: lambda.Code.fromAsset(path.join(__dirname, "../dist")),
        });

        const api = new apigateway.RestApi(this, "ProductsApi", {
            restApiName: "Products Service",
            deployOptions: {
                stageName: "dev",
            },
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
                allowHeaders: [
                    "Content-Type",
                    "X-Amz-Date",
                    "Authorization",
                    "X-Api-Key",
                ],
            },
        });

        const products = api.root.addResource("product");
        products.addMethod(
            "GET",
            new apigateway.LambdaIntegration(getProductsList),
            {
                apiKeyRequired: false,
            }
        );

        const product = products.addResource("{productId}");
        product.addMethod(
            "GET",
            new apigateway.LambdaIntegration(getProductById),
            {
                apiKeyRequired: false,
            }
        );

        new cdk.CfnOutput(this, "ApiUrl", {
            value: api.url,
            description: "API Gateway URL",
        });
    }
}
