import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { productService } from "../services/product.services";
import { createResponse } from "../utils/response.utils";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const productId = event.pathParameters?.productId;

        if (!productId) {
            return createResponse(400, { message: "Product ID is required" });
        }

        const product = productService.getProductById(productId);

        if (!product) {
            return createResponse(404, { message: "Product not found" });
        }

        return createResponse(200, product);
    } catch (error) {
        console.error("Error in getProductById:", error);
        return createResponse(500, { message: "Internal server error" });
    }
};
