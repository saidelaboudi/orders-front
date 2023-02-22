export * from './orderController.service';
import { OrderControllerService } from './orderController.service';
export * from './stateController.service';
import { StateControllerService } from './stateController.service';
export const APIS = [OrderControllerService, StateControllerService];
