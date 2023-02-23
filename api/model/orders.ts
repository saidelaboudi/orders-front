/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Etats } from './etats';

export interface Orders { 
    id?: string;
    fullname?: string;
    email?: string;
    orderNumber?: string;
    arrivalDate?: Date;
    shippingDate?: Date;
    updatedAt?: Date;
    comment?: string;
    notify?: boolean;
    state?: Etats;
    emailBody?: string;
}