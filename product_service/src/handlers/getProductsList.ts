import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { productService } from "../services/product.services";
import { createResponse } from "../utils/response.utils";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const products = productService.getAllProducts();
        return createResponse(200, products);
    } catch (error) {
        console.error("Error in getProductsList:", error);
        return createResponse(500, { message: "Internal server error" });
    }
};
