import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientControler";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllDeliveriesAvailableController } from "./modules/deliveries/useCases/findAllDeliveriesAvailable/FindAllDeliveriesAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";
import { ensureAuthenticateClient } from "./modules/middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./modules/middlewares/ensureAuthenticateDeliveryman";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllDeliveriesAvailableController =
  new FindAllDeliveriesAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();

routes.post("/client", createClientController.handle);

routes.post("/client/authenticate", authenticateClientController.handle);

routes.post(
  "/delivery",
  ensureAuthenticateClient,
  createDeliveryController.handle
);

routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  findAllDeliveriesController.handle
);

routes.post("/deliveryman", createDeliverymanController.handle);

routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle
);

routes.post(
  "/deliveryman/authenticate",
  authenticateDeliverymanController.handle
);

routes.put(
  "/delivery/updateDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);

routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesAvailableController.handle
);

export { routes };
